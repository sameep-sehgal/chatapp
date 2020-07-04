from django.urls import path
from .views import Login,Test

from rest_framework.authtoken import views as login_view


urlpatterns = [
    path('login',Login.as_view(),name='login'),
    path('test',Test.as_view(),name='test'),
]