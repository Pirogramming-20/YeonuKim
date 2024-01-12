from django.db import models

# Create your models here.
GENRES_CHOICES=(
    ('SF', 'SF'),
    ('Romance', 'Romance'),
    ('Comedy', 'Comedy'),
    ('Action', 'Action'),
    ('Music', 'Music'),
    ('Horror', 'Horror'),
)

YEAR_CHOICES_LIST=[]
for i in range(1950, 2025):
    YEAR_CHOICES_LIST.append((i, i))
YEAR_CHOICES = tuple(YEAR_CHOICES_LIST)

class Review(models.Model):
    title = models.CharField(max_length=200)
    createYear = models.IntegerField(choices = YEAR_CHOICES)
    genres = models.CharField(max_length=200, choices=GENRES_CHOICES)
    starRate = models.DecimalField(max_digits=2, decimal_places=1)
    runningTime = models.IntegerField()
    content = models.TextField(max_length=10000)
    directors = models.CharField(max_length=200)
    actors = models.CharField(max_length=500)

    def __str__(self):
        return self.title