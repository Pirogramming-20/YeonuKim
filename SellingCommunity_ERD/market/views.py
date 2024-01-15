from django.shortcuts import render
from .models import Market

# Create your views here.
def index(request):
    markets = Market.objects.all()
    return render(request, 'market/index.html', {'markets': markets})