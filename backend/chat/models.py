from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Channel(models.Model):
    name = models.CharField(max_length=50,unique=True)
    created_by = models.ForeignKey(User,on_delete=models.SET_NULL,null=True,related_name='channels_created')
    participants = models.ManyToManyField(User,related_name='channels')

    def __str__(self):
        return self.name


class Message(models.Model):
    text=models.CharField(max_length=250)