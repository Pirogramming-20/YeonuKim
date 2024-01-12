from django.db import models

# Create your models here.
class Review(models.Model):
    title = models.CharField(max_length=200)
    createYear = models.IntegerField()
    genres = models.CharField(max_length=200)
    starRate = models.DecimalField(max_digits=2, decimal_places=1)
    runningTime = models.IntegerField()
    content = models.TextField(max_length=10000)
    directors = models.CharField(max_length=200)
    actors = models.CharField(max_length=500)

    def __str__(self):
        return self.title