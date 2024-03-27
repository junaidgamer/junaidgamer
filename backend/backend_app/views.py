from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import MyUser, Tweet,Comment
from .serializers import MyUserSerializer, TweetSerializer,CommentSerilaizer

class MyUserListCreate(generics.ListCreateAPIView):
    queryset = MyUser.objects.all()
    serializer_class = MyUserSerializer
    permission_classes = (AllowAny,)

class MyUserListRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = MyUser.objects.all()
    serializer_class = MyUserSerializer
    # lookup_field = 'username'

class TweetListCreate(generics.ListCreateAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = (AllowAny,)

class TweetRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer

class CommentListCreate(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerilaizer
    permission_classes = (AllowAny,)

class CommentRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerilaizer


