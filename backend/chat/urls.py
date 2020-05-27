from django.urls import path
from . import views

urlpatterns=[
    path('channels/',views.channels,name='channels')
]