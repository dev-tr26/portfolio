from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, redirect, get_object_or_404
from django.shortcuts import HttpResponse
from .models import BlogPost 


def home_page(request):
    blogs = BlogPost.objects.filter(is_published=True).order_by('created_at')[:4]
    return render(request, "portfolio.html", {"blogs":blogs})

def blog_list(request):
    posts = BlogPost.objects.filter(is_published=True).order_by('created_at')
    
    context = {"posts": posts}
    return render(request, "blog.html", context)


def blog_detail(request, slug):
    post = get_object_or_404(BlogPost, slug=slug, is_published=True)
    return render(request, 'blog_detail.html', {'post':post})