from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from .models import Channel,MessageChannels
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from .serializers import ChannelSerializer,MessageSerializer


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def channels(request):
    if request.method == 'GET':
        channels=Channel.objects.all()
        serializer=ChannelSerializer(channels,many=True)
        return Response(serializer.data)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def check_channel(request):
    if request.method == 'POST':
        data={}
        channelName=request.data.get('channelName',None)
        try:
            Channel.objects.get(name=channelName)
            data['unique']=False

        except:
            data['unique']=True

        return Response(data)



@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_channel(request):
    if request.method == 'POST':
        data={}
        channelName=request.data.get('channelName',None)
        username=request.data.get('created_by',None)
        user=User.objects.get(username=username)
        channel=Channel(name=channelName,created_by=user)
        channel.save()
        data['name']=channel.name
        data['created_by']=username
        return Response(data)


@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_channel(request,id):
    if request.method == 'DELETE':
        channel=Channel.objects.get(id=id)
        channel.delete()
        return Response('deleted')



@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def fetch_messages(request,channelId):
    if request.method == 'GET':
        data=[]
        channel=Channel.objects.get(id=channelId)
        messages=MessageChannels.objects.filter(sent_to=channel)
        for message in messages:
            username=User.objects.get(id=message.sender.id).username
            
            message_data={
                'text':message.text,
                'id':message.id,
                'time':message.time,
                'sender':username,
            }
            data.append(message_data)
        return Response({'messages':data})


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def save_message(request):
    if request.method == 'POST':
        messageText=request.data.get('text',None)
        channelId=request.data.get('channelId',None)
        channel=Channel.objects.get(id=channelId)
        time=request.data.get('time',None)
        sender=request.data.get('sender',None)
        user=User.objects.get(username=sender)
        message=MessageChannels(text=messageText,sent_to=channel,time=time,sender=user)
        print(message)
        message.save()
        return Response('success')

