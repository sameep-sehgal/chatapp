from rest_framework import serializers
from django.contrib.auth.models import User


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['username','password']
        write_only_fields = ('password',)

    def save(self):
        password = self.validated_data['password']
        username = self.validated_data['username']
        user = User.objects.create_user(username=username,password=password)
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']
        
