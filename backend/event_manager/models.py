from django.db import models
from django.contrib.auth.models import AbstractUser
from jsonfield import JSONField
# Create your models here.
class MyUser(AbstractUser):
    
    social_media = JSONField(default={})

    def __str__(self):
        return self.username
    
class MyEvent(models.Model):
    name = models.CharField(max_length=255, unique=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    description = models.TextField()
    faq = models.TextField()
    private = models.BooleanField(default=False)
    participants = models.ManyToManyField(MyUser, related_name='events_participated', blank=True)
    organizers = models.ManyToManyField(MyUser, related_name='events_organized', blank=True)

    def __str__(self):
        return self.name
