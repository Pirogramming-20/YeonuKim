from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
import json
from .models import Post
from .forms import PostForm

# Create your views here.
def index(request):
    post_list = Post.objects.all()
    return render(request, 'post/index.html', {'post_list': post_list})

def create(request):
    if request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('post:index')
    else:
        form = PostForm()
    return render(request, 'post/post_form.html', {'form': form})

def detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    return render(request, 'post/post_detail.html', {'post': post})

def modify(request, pk):
    post = get_object_or_404(Post, pk=pk)
    if request.method == 'POST':
        form = PostForm(request.POST, instance=post)
        if form.is_valid():
            post = form.save(commit=False)
            post.save()
            return redirect('post:detail', pk=pk)
    else:
        form = PostForm(instance=post)
    return render(request, 'post/post_form.html', {'form': form})

def delete(request, pk):    
    if request.method == 'POST':
        post = get_object_or_404(Post, pk=pk)
        post.delete()
    return redirect('post:index')

def like(request):
    if request.method =='POST':
        request_json = json.loads(request.body)
        post_id = request_json['id']
        post = get_object_or_404(Post, pk=post_id)
        post.like += 1 
        post.save()
        return JsonResponse({'id':post_id, 'count':post.like})
    return redirect('post:index')