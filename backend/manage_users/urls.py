from django.urls import path
from . import views
from rest_framework.authtoken import views as login_view

app_name='user'


urlpatterns = [
    path('signup',views.signup_view,name='signup'),
    path('login',login_view.obtain_auth_token,name='login'),
    path('checkUsername',views.verify_username,name='verifyUsername'),
    path('fetchUsername',views.fetch_username,name='fetchUsername'),
    path('changeUsername',views.change_username,name='changeUsername'),
    path('changePassword',views.change_password,name='changePassword'),
    path('',views.users,name='users'),
]