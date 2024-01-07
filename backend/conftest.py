import pytest
from rest_framework.test import APIClient
# from backend.event_manager.factories import UserFactory
# from rest_framework_simplejwt.tokens import RefreshToken

# @pytest.fixture(scope='session')
# def test_user():
#     # Create a test user using the UserFactory
#     user = UserFactory()
#     return user

# @pytest.fixture(scope='session')
# def test_user_tokens(test_user):
#     # Generate tokens for the test user
#     refresh = RefreshToken.for_user(test_user)
#     return {
#         'access_token': str(refresh.access_token),
#         'refresh_token': str(refresh)
#     }

# @pytest.fixture(scope='session')
# def api_client(user_tokens):
#     # Create a Django test client
#     client = APIClient()
#     client.credentials(HTTP_AUTHORIZATION=f'Bearer {user_tokens["access_token"]}')
#     return client
