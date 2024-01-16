from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import MyUser, MyEvent, Announcement

class MyUserAdmin(UserAdmin):
    list_display = ('id', 'username')

    fieldsets = (
        UserAdmin.fieldsets[0],  
        (                     
            "Custom fields", 
            {
                'fields': (
                    'social_media',
                ),
            },
        ),
    )

class MyEventAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ('id', 'body', 'formatted_timestamp', 'author', 'event')
    def formatted_timestamp(self, obj):
        return obj.timestamp.timestamp()



admin.site.register(MyUser, MyUserAdmin)
admin.site.register(MyEvent, MyEventAdmin)
admin.site.register(Announcement, AnnouncementAdmin)



