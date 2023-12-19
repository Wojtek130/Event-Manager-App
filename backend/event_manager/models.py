from django.db import models
from django.contrib.auth.models import AbstractUser
from jsonfield import JSONField
# Create your models here.
class MyUser(AbstractUser):
    
    social_media = JSONField(default={})
    def __str__(self):
        return self.username