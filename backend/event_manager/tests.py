from django.test import TestCase, RequestFactory
from rest_framework.response import Response
from django.http import JsonResponse
from django.contrib.auth import get_user_model
import datetime
import json
from parameterized import parameterized

from .constants import DATETIME_FORMAT
from .models import MyEvent

User = get_user_model()


class EventManagerTest(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        username = "mockuser"
        password = "mockpassword"
        self.user = User.objects.create_user(
            username=username,
            password=password,
            social_media={"fb" :"mockFB", "ig" : "mockIG"}
        )
        response = self.client.post('/auth/token/', {
            'username': username,
            'password': password,
        })
        self.user2 = User.objects.create_user(
            username=username + "2",
            password=password + "2",
            social_media={"wa" :"mockWA2"}
        )
        self.assertEqual(response.status_code, 200)
        self.tokens = response.data
        event_name = "mock_event"
        start_date = datetime.datetime.now().replace(second=0, microsecond=0)
        end_date = (datetime.datetime.now() + datetime.timedelta(days=10)).replace(second=0, microsecond=0)
        description = "mock description"
        faq = "mock faq"
        private = False
        self.event = MyEvent.objects.create(
            name=event_name,
            start_date=start_date,
            end_date=end_date,
            description=description,
            faq=faq,
            private=private
        )
        self.event.organizers.add(self.user)
        self.event_2 = MyEvent.objects.create(
            name=event_name + "2",
            start_date=start_date,
            end_date=end_date,
            description=description + "2",
            faq=faq + "2",
            private=private
        )
        self.event_2.organizers.add(self.user2)
        self.event_2.participants.add(self.user)
        self.event_3 = MyEvent.objects.create(
            name=event_name + "3",
            start_date=start_date,
            end_date=end_date,
            description=description + "3",
            faq=faq + "3",
            private=private
        )
        self.event_2.organizers.add(self.user2)

    def send_request(self, endpoint, request_type, data=None):
        response = None
        if request_type == "GET":
            response = self.client.get(endpoint, HTTP_AUTHORIZATION=f'Bearer {self.tokens["access"]}')
        elif request_type == "PATCH":
            response = self.client.patch(endpoint, data=data, content_type='application/json', HTTP_AUTHORIZATION=f'Bearer {self.tokens["access"]}')
        elif request_type == "POST":
            response = self.client.post(endpoint, data=data, content_type='application/json', HTTP_AUTHORIZATION=f'Bearer {self.tokens["access"]}')
        return response
    
    def get_content(self, response):
        content = response.content.decode('utf-8')
        return json.loads(content)
        

    def test_index_protected(self):
        response = self.send_request("/protected/", "GET")
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response, JsonResponse)

    def test_profile_get(self):
        response = self.send_request("/my_profile/", "GET")
        content = self.get_content(response)
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response, JsonResponse)
        self.assertIn("social_media", content)
        social_media = content["social_media"]
        self.assertIn("fb", social_media)
        self.assertIn("ig", social_media)
        self.assertEqual(social_media["fb"], "mockFB")
        self.assertEqual(social_media["ig"], "mockIG")

    @parameterized.expand([
        ({},),
        ({"wa" : "mockWA"},),
        ({"snapchat" : "mockSC"},),
        ({"fb" : "mockFB2", "snapchat" : "mockSC"},),
        ({"mockSocialMedia" : "mockSocialMediaUser", }),
        ({"mockSocialMedia" : "mockSocialMediaUser", "snapchat" : "mockSC"},),
    ])
    def test_profile_patch(self, social_media):
        data = {"social_media" : social_media}
        response = self.send_request("/my_profile/", "PATCH", data)
        content = self.get_content(response)
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response, JsonResponse)
        self.assertIn("message", content)
        self.assertEqual(content["message"], "Profile updated successfully.")
        self.user.refresh_from_db()
        self.assertEqual(self.user.social_media, social_media)

    def test_users(self):
        response = self.send_request("/users/", "GET")
        content = self.get_content(response)
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response, JsonResponse)
        self.assertIn("users", content)
        users = content["users"]
        self.assertGreater(len(users), 0)
        user_1 = users[0]
        self.assertIn("username", user_1)
        self.assertIn("id", user_1)

    def test_event_get(self):
        response = self.send_request(f"/event/?id={self.event.id}", "GET")
        content = self.get_content(response)
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response, JsonResponse)
        self.assertIn("organizers", content)
        users = content["organizers"]
        self.assertGreater(len(users), 0)

    def test_event_post(self):
        events_before = list(MyEvent.objects.all())
        new_name = "mock_event_post"
        new_start_date = "01.01.2024 15:00"
        new_end_date = "02.01.2024 16:00"
        new_description = "mock description_post"
        new_faq = "mock faq post"
        new_private = False
        data = {
            "name": new_name,
            "start_date": new_start_date,
            "end_date": new_end_date,
            "description": new_description,
            "faq": new_faq,
            "private": False,
            "organizers": [],
            "participants": [],
          }
        response = self.send_request("/event/", "POST", data)
        content = self.get_content(response)
        self.assertEqual(response.status_code, 201)
        self.assertIsInstance(response, Response)
        events_after = MyEvent.objects.all()
        self.assertGreater(len(events_after), len(events_before))
        new_event = list(filter(lambda e: not e in events_before, events_after))[0]
        self.assertEqual(new_event.name, new_name)
        self.assertEqual(new_event.description, new_description)
        self.assertEqual(new_event.start_date.strftime(DATETIME_FORMAT), new_start_date)
        self.assertEqual(new_event.end_date.strftime(DATETIME_FORMAT), new_end_date)
        self.assertEqual(new_event.faq, new_faq)
        self.assertEqual(new_event.private, new_private)
        self.assertGreater(len(new_event.organizers.all()), 0)


    def test_event_patch(self):
        new_name = self.event.name
        new_start_date = self.event.start_date.strftime(DATETIME_FORMAT)
        new_end_date = self.event.end_date.strftime(DATETIME_FORMAT)
        new_description = "mock description modified"
        new_faq = "mock faq modified"
        new_private = self.event.private
        new_organizers = [o.username for o in self.event.organizers.all()]
        new_participants = [p.username for p in self.event.participants.all()]
        data = {
            "name": new_name,
            "start_date": new_start_date,
            "end_date": new_end_date,
            "description": new_description,
            "faq": new_faq,
            "private": False,
            "organizers": new_organizers,
            "participants": new_participants,
            "id" : self.event.pk,
          }
        response = self.send_request("/event/", "PATCH", data)
        content = self.get_content(response)
        self.event.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response, Response)
        self.assertEqual(self.event.name, new_name)
        self.assertEqual(self.event.description, new_description)
        self.assertEqual(self.event.start_date.strftime(DATETIME_FORMAT), new_start_date)
        self.assertEqual(self.event.end_date.strftime(DATETIME_FORMAT), new_end_date)
        self.assertEqual(self.event.faq, new_faq)
        self.assertEqual(self.event.private, new_private)
        self.assertGreater(len(self.event.organizers.all()), 0)
        self.assertIn(self.user, self.event.organizers.all())

    def test_events(self):
        response = self.send_request("/events/", "GET")
        content = self.get_content(response)
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response, JsonResponse)
        self.assertIn("events", content)
        events = content["events"]
        self.assertGreater(len(events), 0)
        event_1 = events[0]
        self.assertIn("name", event_1)
        self.assertIn("id", event_1)
        self.assertIn("am_organizer", event_1)
        self.assertIn("am_participant", event_1)

    def test_event_leave_organizer(self):
        data = {"id" : self.event.id}
        response = self.send_request("/event/leave/", "POST", data)
        content = self.get_content(response)
        print(content)
        self.event.refresh_from_db()
        self.assertEqual(response.status_code, 400)
        self.assertIsInstance(response, Response)
        self.assertIn("error", content)
        self.assertEqual(content["error"], "the user is already an organizer of the event")

    def test_event_leave_no_participant(self):
        data = {"id" : self.event_3.id}
        response = self.send_request("/event/leave/", "POST", data)
        content = self.get_content(response)
        self.event.refresh_from_db()
        self.assertEqual(response.status_code, 400)
        self.assertIsInstance(response, Response)
        self.assertIn("error", content)
        self.assertEqual(content["error"], "the user is not a participant of the event")

    def test_event_leave_successful(self):
        data = {"id" : self.event_2.id}
        self.assertIn(self.user, self.event_2.participants.all())
        response = self.send_request("/event/leave/", "POST", data)
        content = self.get_content(response)
        self.event.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response, JsonResponse)
        self.assertIn("message", content)
        self.assertEqual(content["message"], "Event left successfully.")
        self.event_2.refresh_from_db()
        self.assertNotIn(self.user, self.event_2.participants.all())

    def test_event_join_already_participant(self):
        data = {"id" : self.event_2.id}
        response = self.send_request("/event/join/", "POST", data)
        content = self.get_content(response)
        self.event.refresh_from_db()
        self.assertEqual(response.status_code, 400)
        self.assertIsInstance(response, Response)
        self.assertIn("error", content)
        self.assertEqual(content["error"], "the user is not a participant of the event")