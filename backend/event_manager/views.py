from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
import datetime

from .models import MyUser, MyEvent
from .serializers import MyUserSerializer, MyEventSerializer
from .utils import format_datatime_from_db


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
def my_profile(request):
    user = get_object_or_404(MyUser, username=request.user)
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

@api_view(["POST", "GET", "PATCH"])
@permission_classes([IsAuthenticated])
def event(request):
    serializer = None
    if request.method == "GET":
        event_id = request.GET.get("id")
        event = get_object_or_404(MyEvent, id=event_id)
        serializer = MyEventSerializer(event)
        event_data = serializer.data
        event_data["organizers"] = list(MyUser.objects.filter(id__in=event_data["organizers"]).values_list('username', flat=True))
        event_data["participants"] = list(MyUser.objects.filter(id__in=event_data["participants"]).values_list('username', flat=True))
        event_data["start_date"] = format_datatime_from_db(event_data["start_date"])
        event_data["end_date"] = format_datatime_from_db(event_data["end_date"])
        return JsonResponse(data=event_data)
    if request.method == "POST":
        print(request.data)
        serializer = MyEventSerializer(data=request.data, context={'request': request})
    if request.method == "PATCH":
        print("paaaaaaaaatch", request.data.get("id"))
        event = get_object_or_404(MyEvent, pk=request.data.get('id'))
        serializer = MyEventSerializer(event, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    try:
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(f"An error occurred: {e}")
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def events(request):
    print(request.user.id, "user ID")
    user_id = request.user.id
    events = [{"name" : event.name, "id" : event.id, "am_organizer" : event.organizers.filter(id=user_id).exists(), "am_participant" : event.participants.filter(id=user_id).exists()} for event in MyEvent.objects.all()]
    return JsonResponse(data={"events": events})

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def event_leave(request):
    user_id = request.user.id
    print(request)
    print(request.data)
    event_id = request.data.get("id")
    event = get_object_or_404(MyEvent, id=event_id)
    if event.organizers.filter(pk=user_id).exists():
            return Response({'error': "the user is already an organizer of the event"}, status=status.HTTP_400_BAD_REQUEST)
    if not event.participants.filter(pk=user_id).exists():
        return Response({'error': "the user is not a participant of the event"}, status=status.HTTP_400_BAD_REQUEST)
    event.participants.remove(request.user)
    return JsonResponse(data={"message": "Event joined successfully."})

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def event_join(request):
    user_id = request.user.id
    event_id = request.data.get("id")
    event = get_object_or_404(MyEvent, id=event_id)
    if event.organizers.filter(pk=user_id).exists():
            return Response({'error': "the user is already an organizer of the event"}, status=status.HTTP_400_BAD_REQUEST)
    if event.participants.filter(pk=user_id).exists():
        return Response({'error': "the user is already a participant of the event"}, status=status.HTTP_400_BAD_REQUEST)
    event.participants.add(request.user)
    return JsonResponse(data={"message": "Event joined successfully."})

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def event_delete(request, instance_id):
    user_id = request.user.id
    event = get_object_or_404(MyEvent, id=instance_id)
    if not event.organizers.filter(pk=user_id).exists():
        return Response({'error': "the user is not an organizer of the event"}, status=status.HTTP_400_BAD_REQUEST)
    event.delete()
    return JsonResponse({'message': 'Model instance deleted successfully.'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request, username):
    print("right endpoint", username)
    user = get_object_or_404(MyUser, username=username)
    user_data = {"social_media" : user.social_media}
    return JsonResponse(data=user_data)

