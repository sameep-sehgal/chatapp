from django.contrib import admin
from .models import Channel,MessageChannels

# Register your models here.

admin.site.register(Channel)
admin.site.register(MessageChannels)