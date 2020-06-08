from rest_framework import serializers
from .models import Channel,MessageChannels


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = '__all__'


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = MessageChannels
        fields = '__all__'