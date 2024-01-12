from django.shortcuts import render, get_object_or_404
from .models import Review

# Create your views here.
def index(request):
    reviews = Review.objects.all()
    return render(request, 'review/index.html', {'reviews': reviews})

def review_detail(request, pk):
    review = get_object_or_404(Review, pk=pk)
    return render(request, 'review/review_detail.html', {'review': review})