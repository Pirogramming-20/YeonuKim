from django.urls import path
from .views import index, review_detail

app_name = 'review'
urlpatterns = [
    path('', index, name='index'),
    path('<int:pk>/', review_detail, name="review_detail")
]