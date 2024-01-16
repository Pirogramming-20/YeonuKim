from django.shortcuts import render, redirect
from .models import Idea
from .forms import IdeaForm

# Create your views here.
def index(request):
    idea_list = Idea.objects.all()
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