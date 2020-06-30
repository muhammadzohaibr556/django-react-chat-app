from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from .models import Message
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

User = get_user_model()
# Create your views here.


def last_10_messages():
    return Message.objects.order_by('-timestamp').all()  # [:10]


def get_user(userId):
    return get_object_or_404(User, id=userId)
