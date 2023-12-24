# Generated by Django 4.2.7 on 2023-12-24 12:48

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event_manager', '0006_alter_myevent_description_alter_myevent_faq'),
    ]

    operations = [
        migrations.AlterField(
            model_name='myevent',
            name='organizers',
            field=models.ManyToManyField(blank=True, related_name='events_organizers', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='myevent',
            name='participants',
            field=models.ManyToManyField(blank=True, related_name='events_participants', to=settings.AUTH_USER_MODEL),
        ),
    ]
