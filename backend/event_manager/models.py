from django.db import models
from django.contrib.auth.models import AbstractUser
from jsonfield import JSONField
# Create your models here.
class MyUser(AbstractUser):
    
    social_media = JSONField(default={})
    last_fetch = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.username
    
class MyEvent(models.Model):
    name = models.CharField(max_length=255, unique=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    description = models.TextField(blank=True, null=True)
    faq = models.TextField(blank=True, null=True)
    private = models.BooleanField(default=False)
    participants = models.ManyToManyField(MyUser, related_name='events_participants', blank=True)
    organizers = models.ManyToManyField(MyUser, related_name='events_organizers', blank=True)

    def __str__(self):
        return self.name

class Announcement(models.Model):
    body = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    event = models.ForeignKey(MyEvent, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"Announcement({self.body})"
