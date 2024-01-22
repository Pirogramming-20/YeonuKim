from django.urls import path
from .views import *

app_name = 'post'

urlpatterns = [
    path('', index, name='index'),
    path('create/', create, name='create'),
    path('detail/<int:pk>/', detail, name='detail'),
    path('modify/<int:pk>/', modify, name='modify'),
    path('delete/<int:pk>/', delete, name='delete'),
    path('like/', like, name='like'),
    path('create/comment/', create_comment, name='create_comment'),
    path('delete/comment/', delete_comment, name='delete_comment')
]
