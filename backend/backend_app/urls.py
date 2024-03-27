from django.urls import path
from . import views

urlpatterns = [
    # MyUser URLs
    path('users/', views.MyUserListCreate.as_view(), name='myuser-list-create'),
    path('users/<int:pk>/', views.MyUserListRetrieveUpdateDestroy.as_view(), name='myuser-list-retrieve-update-destroy'),
    # Tweet URLs
    path('tweets/', views.TweetListCreate.as_view(), name='tweet-list-create-'),
    path('tweets/<int:pk>/', views.TweetRetrieveUpdateDestroy.as_view(), name='tweet-list-retrieve-update-destroy'),
    #commnets
    path('comments/', views.CommentListCreate.as_view(), name='commentslistview'),
    path('comments/<int:pk>/', views.CommentRetrieveUpdateDestroy.as_view(), name='comment-list-retrieve,update,destory'),
]
