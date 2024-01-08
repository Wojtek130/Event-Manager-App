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

USERNAME = "mockuser"
PASSWORD = "mockpassword"
INITIAL_SOCIAL_MEDIA = {"fb" :"mockFB", "ig" : "mockIG"}

class EventManagerTest(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        username = USERNAME
        password = PASSWORD
        self.user = User.objects.create_user(
            username=username,
            password=password,
            social_media=INITIAL_SOCIAL_MEDIA
        )
        response = self.client.post('/auth/token/', {
            'username': username,
            'password': password,
        })
        self.assertEqual(response.status_code, 200)
        self.tokens = response.data
        self.event = MyEvent.objects.create(
            name='mock_event',
            start_date=datetime.datetime.now().replace(second=0, microsecond=0),
            end_date=(datetime.datetime.now() + datetime.timedelta(days=10)).replace(second=0, microsecond=0),
            description="mock description",
            faq='mock faq',
            private=False
        )
        self.event.organizers.add(self.user)
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
        new_name = "mock_event2"
        new_start_date = "01.01.2024 15:00"
        new_end_date = "02.01.2024 16:00"
        new_description = "mock description2"
        new_faq = "mock faq2"
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
        print(content)
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
        self.assertEqual(response.status_code, 201)
        self.assertIsInstance(response, Response)
        self.assertEqual(self.event.name, new_name)
        self.assertEqual(self.event.description, new_description)
        self.assertEqual(self.event.start_date.strftime(DATETIME_FORMAT), new_start_date)
        self.assertEqual(self.event.end_date.strftime(DATETIME_FORMAT), new_end_date)
        self.assertEqual(self.event.faq, new_faq)
        self.assertEqual(self.event.private, new_private)
        self.assertGreater(len(self.event.organizers.all()), 0)
        self.assertIn(self.user, self.event.organizers.all())
