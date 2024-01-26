from django.db import models
from django.contrib.auth.models import AbstractUser
from jsonfield import JSONField

class MyUser(AbstractUser):
    """
    A class representing a user

    Additional Attributes:
    social_media 
        - json containg information about social media 
        as pairs of a particular social media and username,
        e.g {"fb" : "usernamefb"}
    last_fetch
        - datetime object contating information about the time 
        when last time user fetched announcements from the server
    """
    social_media = JSONField(default={})
    last_fetch = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.username
    
class MyEvent(models.Model):
    """
    A class representing an event

    Additional Attributes:
    name - the event's name
    start_date - datetime object informing about the start time of the event
    end_date - datetime object informing about the end time of the event
    description - description of the event
    faq - Frequently Asked Questions section
    private - should event be private, not shown to other users than organizers
    organizers - users that are organizers of the event
    participants - users that are participants of the event
    """
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
    """
    A class representing an organizer's announcement (message) to their event's participants

    Attibutes:
    body - the annnouncement's body
    timestamp - time of creating the announcement
    author - the author of the announcement
    event - the event which the announcement belongs to
    """
    body = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    event = models.ForeignKey(MyEvent, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"Announcement({self.body})"
