from django.shortcuts import render, redirect, get_object_or_404
from .models import DevTool
from .forms import DevToolForm

# Create your views here.
def index(request):
    tool_list = DevTool.objects.all()
    return render(request, 'tool/tool_index.html', {'tool_list': tool_list})

def create(request):
    if request.method == 'POST':
        form = DevToolForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('tool:index')
    else:
        form = DevToolForm()
    return render(request, 'tool/tool_create.html', {'form': form})

def detail(request, pk):
    tool = get_object_or_404(DevTool, pk=pk)
    return render(request, 'tool/tool_detail.html', {'tool': tool})

def modify(request, pk):
    tool = get_object_or_404(DevTool, pk=pk)
    if request.method == 'POST':
        form = DevToolForm(request.POST, instance=tool)
        if form.is_valid():
            form.save()
            return redirect('tool:detail', pk=pk)
    else:
        form=DevToolForm(instance=tool)
    return render(request, 'tool/tool_modify.html', {'form': form, 'pk': pk})

def delete(request, pk):
    if request.method == 'POST':
        tool = get_object_or_404(DevTool, pk=pk)
        tool.delete()
    return redirect('tool:index')