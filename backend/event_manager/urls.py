# yourappname/urls.py

from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import index, index_protected, register_user, MyTokenObtainPairView


urlpatterns = [
    path('', index, name='index'),
    path('protected/', index_protected, name='index_protected'),
    path('auth/register/', register_user, name='register'),
    path('auth/token/',  MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]