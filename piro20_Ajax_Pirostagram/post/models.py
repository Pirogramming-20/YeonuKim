from django.db import models
from django.utils import timezone

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=255)
    created_date = models.DateTimeField(default=timezone.now)
    content = models.TextField(max_length=8191)
    like = models.PositiveIntegerField(default=0)

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.TextField(max_length=1023)
    created_date = models.DateTimeField(default=timezone.now)