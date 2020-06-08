from django.urls import path
from . import views

urlpatterns=[
    path('channels/',views.channels,name='channels'),
    path('checkChannel/',views.check_channel,name='check_channel'),
    path('createChannel/',views.create_channel,name='create_channel'),
    path('saveMessage/',views.save_message,name='save_message'),
    path('deleteChannel/<int:id>',views.delete_channel,name='delete_channel'),
    path('fetchMessages/<int:channelId>',views.fetch_messages,name='fetch_messages'),
]