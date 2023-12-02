from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

from .serializers import MyUserSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    user = MyUserSerializer(data=request.data)
    if user.is_valid():
        user.save()
        return Response(user.data, status=status.HTTP_201_CREATED)
    return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    print(username, password)
    user = authenticate(request, username=username, password=password)
    if user:
        login(request, user)
        return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
    return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    logout(request)
    return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)

def index(request):
    return JsonResponse(data={"hello" : "world"})

@permission_classes([IsAuthenticated])
def index_protected(request):
    return JsonResponse(data={"hello" : "protected"})


