# yourappname/urls.py

from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import index, index_protected, register_user, MyTokenObtainPairView, my_profile, users, event, events, event_join, event_leave, event_delete, profile, new_announcements, old_announcements, last_fetch, message


urlpatterns = [
    path('', index, name='index'),
    path('protected/', index_protected, name='index_protected'),
    path('auth/register/', register_user, name='register'),
    path('auth/token/',  MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('my_profile/', my_profile, name='my_profile'),
    path('users/', users, name='users'),
    path('event/', event, name='event'),
    path('events/', events, name='events'),
    path('event/join/', event_join, name='event join'),
    path('event/leave/', event_leave, name='event leave'),
    path('event/delete/<int:instance_id>/', event_delete, name='event delete'),
    path('profile/<str:username>/', profile, name='profile'),
    path('messages/new/<str:timestamp>/', new_announcements, name='new_messages'),
    path('messages/old/<str:timestamp>/', old_announcements, name='old_messages'),
    path('last_fetch/', last_fetch, name='last_fetch'),
    path('message/', message, name='message'),



]