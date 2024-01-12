from django.urls import path
from .views import index, review_detail, review_create

app_name = 'review'
urlpatterns = [
    path('', index, name='index'),
    path('<int:pk>/', review_detail, name="review_detail"),
    path('create', review_create, name='review_create')
]