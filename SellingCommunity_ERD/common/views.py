from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, logout
from django.contrib.auth import views as auth_views
from django.contrib.auth.decorators import login_required
from market.models import User
from .forms import UserForm, AddressForm

# Create your views here.
def signup(request):
    if (request.method == 'POST'):
        user_form = UserForm(request.POST)
        address_form = AddressForm(request.POST)
        if user_form.is_valid() and address_form.is_valid():
            user = user_form.save(commit=False)
            address = address_form.save()
            user.address = address
            user.save()
            login(request, user)
            return redirect('market:index')
    else:
        user_form = UserForm()
        address_form = AddressForm()
    return render(request, 'common/signup.html', {'user_form': user_form, 'address_form': address_form})

def logout_page(request):
    logout(request)
    return redirect('market:index')

def mypage(request):
    me = request.user
    users = User.objects.all()
    return render(request, 'common/user_info.html', {'me': me, 'users': users})

@login_required(login_url='common:login')
def follow(request, pk):
    target = get_object_or_404(User, pk=pk)
    if request.method == 'POST':
        if target != request.user:
            if request.user.following.filter(pk=pk).exists():
                request.user.following.remove(target)
            else:
                request.user.following.add(target)
        request.user.save()
    return redirect('common:user_info')

