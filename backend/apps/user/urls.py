from django.urls import path
from .views import *

urlpatterns = [
    path('home/', Home.as_view(), name='home'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('register/', UserRegisterView.as_view(), name='register'),

]