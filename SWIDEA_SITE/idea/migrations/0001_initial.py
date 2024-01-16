# Generated by Django 4.1 on 2024-01-16 09:33

import django.core.validators
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Idea',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255, verbose_name='제목')),
                ('content', models.TextField(max_length=5000, verbose_name='내용')),
                ('image', models.ImageField(blank=True, upload_to='idea/', verbose_name='이미지')),
                ('interest', models.IntegerField(default=0, validators=[django.core.validators.MaxValueValidator(5), django.core.validators.MinValueValidator(0)])),
                ('pick', models.BooleanField(default=False)),
                ('created_date', models.DateTimeField(default=django.utils.timezone.now, verbose_name='작성일')),
            ],
        ),
    ]