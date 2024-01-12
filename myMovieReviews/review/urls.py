from django.urls import path
from .views import index, review_detail, review_create, review_modify, review_delete

app_name = 'review'
urlpatterns = [
    path('', index, name='index'),
    path('<int:pk>/', review_detail, name="review_detail"),
    path('create', review_create, name='review_create'),
    path('modify/<int:pk>', review_modify, name='review_modify'),
    path('delete/<int:pk>', review_delete, name='review_delete')
]