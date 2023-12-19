from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'social_media']

    def validate(self, data):
        # Perform custom validation here
        print(dict(data))
        return data

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user