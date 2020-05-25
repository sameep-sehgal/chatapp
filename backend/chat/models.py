from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.


class Channel(models.Model):
    name = models.CharField(max_length=50,unique=True)
    created_by = models.ForeignKey(User,on_delete=models.SET_NULL,null=True,related_name='channels_created')
    participants = models.ManyToManyField(User,related_name='channels')

    def __str__(self):
        return self.name


class Message(models.Model):
    text=models.CharField(max_length=250)
    sender=models.ForeignKey(User,on_delete=models.SET_NULL,null=True,related_name='messages_sent')
    time=models.DateTimeField(auto_now_add=True)
    recieved_by_channel=models.ForeignKey(Channel,null=True,on_delete=models.CASCADE,blank=True)
    recieved_by_user=models.ForeignKey(User,null=True,on_delete=models.SET_NULL,blank=True)

    def __str__(self):
        return self.text