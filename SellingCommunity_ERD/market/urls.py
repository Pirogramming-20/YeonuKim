from django.urls import path
from .views import index, market_create

app_name = 'market'
urlpatterns = [
    path('', index, name='index'),
    path('post/', market_create, name='market_create')
]