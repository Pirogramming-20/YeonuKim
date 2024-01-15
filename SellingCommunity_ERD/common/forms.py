from django import forms
from django.contrib.auth.forms import UserCreationForm
from market.models import User, Address

class AddressForm(forms.ModelForm):
    class Meta:
        model = Address
        fields = ['do', 'si', 'gu', 'specific_address']

class UserForm(UserCreationForm):
    address = AddressForm()
    class Meta:
        model = User
        fields = ['username','password1', 'password2', 'name', 'age']