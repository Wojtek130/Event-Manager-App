from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views import View
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
import datetime

from .serializers import MyUserSerializer, MyEventSerializer
from .models import MyUser, MyEvent


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    user = MyUserSerializer(data=request.data)
    if user.is_valid():
        user.save()
        return Response(user.data, status=status.HTTP_201_CREATED)
    return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)

def index(request):
    dt = datetime.datetime.now()
    return JsonResponse(data={"hello" : dt})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def index_protected(request):
    print(request.user, "ssss")
    dt = datetime.datetime.now()
    return JsonResponse(data={"protected" : dt})
    
@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
def profile(request):
    user = MyUser.objects.get(username=request.user)
    if request.method == "GET":
        print(request.user, request, "ssss")
        user_data = {"social_media" : user.social_media}
        return JsonResponse(data=user_data)
    if request.method == "PATCH":
        user_fields = [field.name for field in user._meta.get_fields()]
        print(user_fields)
        for k, v in request.data.items():
            if k in user_fields:
                setattr(user, k, v)
        user.save()
        return JsonResponse(data={"message": "Profile updated successfully."})
    return JsonResponse(data={"error": "Method not allowed"}, status=405)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def users(request):
    users = [{"username" : user.username, "id" : user.id} for user in MyUser.objects.all() if not user.is_superuser]
    return JsonResponse(data={"users": users})

@api_view(["POST", "GET"])
@permission_classes([IsAuthenticated])
def event(request):
    if request.method == "GET":
        event_id = request.GET.get("id")
        event = get_object_or_404(MyEvent, id=event_id)
        serializer = MyEventSerializer(event)
        event_data = serializer.data
        event_data["organizers"] = list(MyUser.objects.filter(id__in=event_data["organizers"]).values_list('username', flat=True))
        event_data["participants"] = list(MyUser.objects.filter(id__in=event_data["participants"]).values_list('username', flat=True))
        return JsonResponse(data=event_data)
    if request.method == "POST":
        print(request.data)
        event = MyEventSerializer(data=request.data, context={'request': request})
        if event.is_valid():
            event.save()
            return Response(event.data, status=status.HTTP_201_CREATED)
        try:
            return Response(event.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def events(request):
    print(request.user.id, "user ID")
    user_id = request.user.id
    events = [{"name" : event.name, "id" : event.id, "am_organizer" : event.organizers.filter(id=user_id).exists(), "am_participant" : event.participants.filter(id=user_id).exists()} for event in MyEvent.objects.all()]
    return JsonResponse(data={"events": events})
