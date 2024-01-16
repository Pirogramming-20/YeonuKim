from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from .models import Idea
from .forms import IdeaForm

# Create your views here.
def index(request):
    idea_list = Idea.objects.all()
    sort_order = request.GET.get('sort-order')
    if sort_order == 'name':
        idea_list = idea_list.order_by('title')
    elif sort_order == 'interest':
        idea_list = idea_list.order_by('-interest')
    elif sort_order == 'pick':
        idea_list = idea_list.order_by('-pick')
    elif sort_order == 'id':
        idea_list = idea_list.order_by('pk')
    elif sort_order == 'time':
        idea_list = idea_list.order_by('-created_date')
    return render(request, 'idea/index.html', {'idea_list': idea_list})

def create(request):
    if request.method == 'POST':
        form = IdeaForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('idea:index')
    else:
        form = IdeaForm()
    return render(request, 'idea/idea_create.html', {'form': form})

def detail(request, pk):
    idea = get_object_or_404(Idea, pk=pk)
    return render(request, 'idea/idea_detail.html', {'idea': idea})

def modify(request, pk):
    idea = get_object_or_404(Idea, pk=pk)
    if request.method == 'POST':
        form = IdeaForm(request.POST, request.FILES, instance=idea)
        if form.is_valid():
            form.save()
            return redirect('idea:detail', pk=pk)
    else:
        form=IdeaForm(instance=idea)
    return render(request, 'idea/idea_modify.html', {'form': form, 'pk': pk})

def delete(request, pk):
    if request.method == 'POST':
        idea = get_object_or_404(Idea, pk=pk)
        idea.delete()
    return redirect('idea:index')

def makePick(request, pk):
    idea = get_object_or_404(Idea, pk=pk)
    idea.pick = not idea.pick
    idea.save()
    return JsonResponse({'pick_status': idea.pick})

def addInterest(request, pk):
    idea = get_object_or_404(Idea, pk=pk)
    idea.interest += 1
    idea.save()
    return JsonResponse({'interest_status': idea.interest})

def minusInterest(request, pk):
    idea = get_object_or_404(Idea, pk=pk)
    idea.interest -= 1
    idea.save()
    return JsonResponse({'interest_status': idea.interest})