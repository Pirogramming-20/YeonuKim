from django.urls import path
from .views import *

app_name = 'post'

urlpatterns = [
    path('', index, name='index'),
    path('create/', create, name='create'),
    path('detail/<int:pk>/', detail, name='detail'),
    path('modify/<int:pk>/', modify, name='modify'),
    path('delete/<int:pk>/', delete, name='delete')
]
