from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token


from .serializers import SignupSerializer,UserSerializer


@api_view(['POST',])
def signup_view(request):

    if request.method == 'POST':
        serializer=SignupSerializer(data=request.data)
        data={}
        if serializer.is_valid():
            user = serializer.save()
            data['response']='Successful'
            data['username']=user.username
            token=Token.objects.get(user=user).key
            data['token']=token
        else:
            data=serializer.errors
        return Response(data)

@api_view(['POST',])
def verify_username(request):

    if request.method == 'POST':
        data={}
        username = request.data.get('username', None)
        try:
            User.objects.get(username=username)
            data['unique']=False

        except:
            data['unique']=True

        return Response(data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def fetch_username(request):
    if request.method == 'POST':
        token=request.data.get('token',None)
        user=Token.objects.get(key=token).user
        return Response({'username':user.username})


    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_username(request):
    if request.method == 'POST':
        newUsername = request.data.get('newUsername', None)
        username = request.data.get('username', None)
        user=User.objects.get(username=username)
        user.username=newUsername
        user.save()
        return Response({'username':user.username})



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    if request.method == 'POST':
        newPassword = request.data.get('newPassword', None)
        username = request.data.get('username', None)
        user=User.objects.get(username=username)
        user.set_password(newPassword)
        user.save()
        return Response({'username':user.username})



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def users(request):
    if request.method == 'GET':
        users=User.objects.all()
        serializer=UserSerializer(users,many=True)
        return Response(serializer.data)