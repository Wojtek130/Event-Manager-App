from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import MyUser, MyEvent

class MyUserAdmin(UserAdmin):
    fieldsets = (
        # *UserAdmin.fieldsets,  # original form fieldsets, expanded
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


admin.site.register(MyUser, MyUserAdmin)
admin.site.register(MyEvent)


