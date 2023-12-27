from rest_framework import serializers
from django.contrib.auth import get_user_model
import datetime
import json

from .constants import DATETIME_FORMAT
from .models import MyEvent
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
        model = MyEvent
        fields = ['name', 'start_date', 'end_date', 'description', 'faq', 'private', 'organizers', 'participants']

    def to_internal_value(self, data):
        # Adjust the date format before creating the model instance
        try:
            start_date = datetime.datetime.strptime(data["start_date"], DATETIME_FORMAT)
        except:
            raise serializers.ValidationError("Wrong start date/time ")
        try:
            end_date = datetime.datetime.strptime(data["end_date"], DATETIME_FORMAT)
        except:
            raise serializers.ValidationError("Wrong end date/time ")
        data["start_date"] = start_date
        data["end_date"] = end_date
        return super().to_internal_value(data)

    def validate(self, data):
        if data["start_date"] >= data["end_date"]:
            raise serializers.ValidationError("The End date must be after the start date")
        return data

    def validate_name(self, data):
        print(data, "validate name")
        if not data:
            raise serializers.ValidationError("Event name cannot be empty")
        return data
    
    def validate_private(self, data):
        if not isinstance(data, bool):
            raise serializers.ValidationError("Private must a boolean value")
        return data
    
    def create(self, validated_data):
        event = MyEvent.objects.create(**validated_data)
        request = self.context.get('request')
        print("request: ", request, "!!!!!!!!!!!!!!!!!!!!!!!!!!")
        organizers_ids = request.data["organizers"]
        if len(organizers_ids) > 0:
            organizers = list(User.objects.filter(id__in=organizers_ids))
            organizers.append(request.user)
            print(organizers, type(request.user))
            event.organizers.set(organizers)
        return event

