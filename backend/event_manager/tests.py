from django.test import TestCase, RequestFactory
from rest_framework.response import Response
from django.http import JsonResponse
from django.contrib.auth import get_user_model
import datetime
import json
from parameterized import parameterized

from .models import MyEvent

User = get_user_model()

USERNAME = "mockuser"
PASSWORD = "mockpassword"
INITIAL_SOCIAL_MEDIA = {"fb" :"mockFB", "ig" : "mockIG"}

class IndexProtectedViewTest(TestCase):
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
        self.event = event_instance = MyEvent.objects.create(
            name='mock_event',
            start_date=datetime.datetime.now(),
            end_date=datetime.datetime.now() + datetime.timedelta(days=10),
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
        print(self.event.id)
        response = self.send_request(f"/event?id={self.event.id}", "GET")
        content = self.get_content(response)
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response, JsonResponse)
        print(content)
        # self.assertIn("users", content)
        # users = content["users"]
        # self.assertGreater(len(users), 0)
        # user_1 = users[0]
        # self.assertIn("username", user_1)
        # self.assertIn("id", user_1)


