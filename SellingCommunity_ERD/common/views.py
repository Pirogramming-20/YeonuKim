from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from django.contrib.auth import views as auth_views
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