# yourappname/urls.py

from django.urls import path
from .views import index, index_protected, register_user, login_user, logout_user

urlpatterns = [
    path('', index, name='index'),
    path('protected', index_protected, name='index_protected'),
    path('auth/register/', register_user, name='register'),
    path('auth/login/', login_user, name='login'),
    path('auth/logout/', logout_user, name='logout'),
]