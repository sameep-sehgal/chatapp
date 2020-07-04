from django.shortcuts import render

# Create your views here.


import jwt,json
from rest_framework import views
from rest_framework.response import Response
from .models import Students,Test
from .authentication import TokenAuth

class Login(views.APIView):

    def post(self, request, *args, **kwargs):
        if not request.data:
            return Response({'Error': "Please provide username/password"}, status="400")
        
        username = request.data['username']
        password = request.data['password']
        try:
            user = Students.objects.get(username=username, password=password)
        except:
            return Response({'Error': "Invalid username/password"}, status="400")
        if user:
            
            payload = {
                'id': user.id
            }
            jwt_token = {'token': jwt.encode(payload, "SECRET_KEY")}

            return Response(
              jwt_token,
              status=200,
              content_type="application/json"
            )
        else:
            return Response(
              {'Error': "Invalid credentials"},
              status=400,
              content_type="application/json"
            )



class Test(views.APIView):

    authentication_classes = (TokenAuth,)

    def get(self,request):
        test=Students.objects.get(id=1)
        data={'test':123}
        return Response(data)