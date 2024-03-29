from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
import json
from .models import Post, Comment
from .forms import PostForm, CommentForm

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
    comment_list = post.comment_set.all()
    form = CommentForm()
    return render(request, 'post/post_detail.html', {'post': post, 'comment_list': comment_list, 'form': form})

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
        post.like = not post.like
        post.save()
        return JsonResponse({'id':post_id, 'state':post.like})
    return redirect('post:index')

def create_comment(request):
    comment_list = Comment.objects.all()
    form = CommentForm()
    if request.method =='POST':
        req = json.loads(request.body)
        post_id = req['id']
        post = get_object_or_404(Post, pk=post_id)
        if req.get('content') != '':
            comment = Comment.objects.create(
                post = get_object_or_404(Post, pk=(req.get('id'))),
                content = req.get('content')
            )
            comment_data = {
                'id': comment.id,
                'content': comment.content
            }
            return JsonResponse({'id':post_id, 'new_comment':comment_data})
    return render(request, 'post/post_detail.html', {'post': post, 'comment_list': comment_list, 'form': form})

def delete_comment(request):
    req = json.loads(request.body)
    comment_id = req['id']
    comment_list = Comment.objects.all()
    form = CommentForm()
    comment = get_object_or_404(Comment, pk=comment_id)
    post = comment.post
    if request.method =='POST':
        comment.delete()
        return JsonResponse({'id': comment_id})
    return render(request, 'post/post_detail.html', {'post': post, 'comment_list': comment_list, 'form': form})
        