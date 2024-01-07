from django.test import TestCase, RequestFactory
from rest_framework.test import force_authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from .views import index_protected
from django.contrib.auth import get_user_model
import json

User = get_user_model()


class IndexProtectedViewTest(TestCase):
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
        self.assertEqual(response.status_code, 200)
        self.tokens = response.data

    def send_request(self, endpoint, request_type, data=None):
        response = None
        if request_type == "GET":
            response = self.client.get(endpoint, HTTP_AUTHORIZATION=f'Bearer {self.tokens["access"]}')
        elif request_type == "PATH":
            response = self.client.patch(endpoint, data=data, content_type='application/json')
        elif request_type == "POST":
            response = self.client.post(endpoint, data=data, content_type='application/json')
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


