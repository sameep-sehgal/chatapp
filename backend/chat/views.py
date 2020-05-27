from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from .models import Channel
from rest_framework.permissions import IsAuthenticated
from .serializers import ChannelSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def channels(request):
    if request.method == 'GET':
        channels=Channel.objects.all()
        serializer=ChannelSerializer(channels,many=True)
        return Response(serializer.data)



