from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Market
from .forms import MarketForm

# Create your views here.
def index(request):
    markets = Market.objects.all()
    return render(request, 'market/index.html', {'markets': markets})

@login_required(login_url='common:login')
def market_create(request):
    if request.method == 'POST':
        form = MarketForm(request.POST)
        if form.is_valid():
            market= form.save(commit=False)
            market.author = request.user
            market.save()
            return redirect('market:index')
    else: 
        form = MarketForm()
    return render(request, 'market/market_form.html', {'form': form})
