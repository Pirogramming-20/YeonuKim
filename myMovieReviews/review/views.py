from django.shortcuts import render, redirect, get_object_or_404
from .models import Review
from .forms import ReviewForm

# Create your views here.
def index(request):
    if request.GET.get('order') == 'title_order':
        reviews = Review.objects.all().order_by('title')
    elif request.GET.get('order') == 'star_order':
        reviews = Review.objects.all().order_by('-starRate')
    elif request.GET.get('order') == 'time_order':
        reviews = Review.objects.all().order_by('runningTime')
    else:
        reviews = Review.objects.all()
    return render(request, 'review/index.html', {'reviews': reviews})

def review_detail(request, pk):
    review = get_object_or_404(Review, pk=pk)
    runningTimeModified = f"{review.runningTime//60}시간 {review.runningTime%60}분"
    return render(request, 'review/review_detail.html', {'review': review, 'runningTimeModified': runningTimeModified})

def review_create(request):
    if(request.method == 'POST'):
        form = ReviewForm(request.POST)
        if form.is_valid():
            review = form.save(commit=False)
            review.save()
            return redirect('review:index')
    else:
        form = ReviewForm()
    return render(request, 'review/review_form.html', {'form': form})

def review_modify(request, pk):
    review = get_object_or_404(Review, pk=pk)
    if(request.method == 'POST'):
        form = ReviewForm(request.POST, instance=review)
        if form.is_valid():
            review = form.save(commit=False)
            review.save()
            return redirect('review:review_detail', pk=pk)
    else:
        form = ReviewForm(instance=review)
    return render(request, 'review/review_form.html', {'form': form})

def review_delete(request, pk):
    if(request.method == 'POST'):
        review = get_object_or_404(Review, pk=pk)
        review.delete()
    return redirect('review:index')