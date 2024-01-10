from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
import datetime
import json


from .constants import DATETIME_FORMAT
from .models import MyEvent, Announcement
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
        data["organizers"] = [user.id for user in User.objects.filter(username__in=data["organizers"])]
        data["participants"] = [user.id for user in User.objects.filter(username__in=data["participants"])]
        return super().to_internal_value(data)

    def validate(self, data):
        if data["start_date"] >= data["end_date"]:
            raise serializers.ValidationError("The End date must be after the start date")
        if any(element in data["organizers"] for element in data["participants"]):
            raise serializers.ValidationError("A user cannot be event's organizer and participant at the same time")
        return data

    def validate_name(self, data):
        if not data:
            raise serializers.ValidationError("Event name cannot be empty")
        return data
    
    def validate_private(self, data):
        if not isinstance(data, bool):
            raise serializers.ValidationError("Private must a boolean value")
        return data
    
    def create(self, validated_data):
        event_data = {
            "name" : validated_data["name"],
            "start_date" : validated_data["start_date"],
            "end_date" : validated_data["end_date"],
            "description" : validated_data["description"],
            "faq" : validated_data["faq"],
            "private" : validated_data["private"],
        }
        event = MyEvent.objects.create(**event_data)
        request = self.context.get('request')
        organizers = []
        organizers_ids = request.data["organizers"]
        if len(organizers_ids) > 0:
            organizers = list(User.objects.filter(id__in=organizers_ids))
        organizers.append(request.user)
        event.organizers.set(organizers)
        return event
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.start_date = validated_data.get('start_date', instance.start_date)
        instance.end_date = validated_data.get('end_date', instance.end_date)
        instance.description = validated_data.get('description', instance.description)
        instance.faq = validated_data.get('faq', instance.faq)
        instance.private = validated_data.get('private', instance.private)
        instance.organizers.set(validated_data.get('organizers', instance.organizers.all()))
        instance.participants.set(validated_data.get('participants', instance.participants.all()))
        instance.save()
        return instance
        

class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = ['body', 'timestamp', 'author', 'event']

    def to_internal_value(self, data):
        # data["author"] = get_object_or_404(User, username=data["author"])
        data["event"] = get_object_or_404(MyEvent, pk=data["event"]).pk
        return super().to_internal_value(data)

    def validate_body(self, data):
        if not isinstance(data, str) or not data:
            raise serializers.ValidationError("Body must be a non empty string")
        return data
    