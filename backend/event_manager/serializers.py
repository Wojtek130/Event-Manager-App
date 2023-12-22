from rest_framework import serializers
from django.contrib.auth import get_user_model
import json

User = get_user_model()

class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'social_media']

    def validate(self, data):
        return data
    
    def validate_social_media(self, value):
        value_json = json.loads(value)
        return {key: value for key, value in value_json.items() if value != '' and key!=''}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class MyEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'start_date', 'end_date', 'description', 'faq', 'private']

