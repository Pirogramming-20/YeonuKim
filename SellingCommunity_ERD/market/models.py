from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

# Create your models here.
class Address(models.Model):
    do = models.CharField(max_length = 40)
    si = models.CharField(max_length = 40)
    gu = models.CharField(max_length = 40)
    specific_address = models.CharField(max_length = 255)

class MarketHistory(models.Model):
    date = models.TimeField(default=timezone.now)

class User(AbstractUser):
    first_name = None
    last_name = None
    username = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=10)
    age = models.IntegerField()
    address = models.ForeignKey(Address, on_delete = models.CASCADE, null=True, blank=True)
    following = models.ManyToManyField('self', symmetrical=False, related_name='follower', null=True, blank=True)
    market_history = models.ForeignKey(MarketHistory, on_delete = models.CASCADE)

class Market(models.Model):
    title = models.CharField(max_length=255)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(max_length=5000)
    price = models.PositiveIntegerField(null=True)
    imageUrl = models.CharField(max_length=255, null=True, blank=True)
    market_history=models.ForeignKey(MarketHistory, on_delete = models.CASCADE, null=True, blank=True)



