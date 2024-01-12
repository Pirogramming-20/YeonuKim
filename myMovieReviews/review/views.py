from django.shortcuts import render, redirect, get_object_or_404
from .models import Review
from .forms import ReviewForm

# Create your views here.
def index(request):
    reviews = Review.objects.all()
    return render(request, 'review/index.html', {'reviews': reviews})

def review_detail(request, pk):
    review = get_object_or_404(Review, pk=pk)
    return render(request, 'review/review_detail.html', {'review': review})

def review_create(request):
    if(request.method == 'POST'):
        form = ReviewForm(request.POST)
        if form.is_valid():
            review = form.save(commit=False)
            review.save()
            return redirect('review:index')
    else:
        form = ReviewForm()
    return render(request, 'review/review_create.html', {'form': form})