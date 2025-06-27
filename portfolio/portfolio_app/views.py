from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, redirect, get_object_or_404
from django.shortcuts import HttpResponse
from .models import BlogPost 


def home_page(request):
    return render(request, "portfolio.html")

def blog_list(request):
    featured_posts = BlogPost.objects.filter(is_published=True, is_featured=True)[:2]
    other_posts = BlogPost.objects.filter(is_published = True, is_featured=False)
    context = {
        "featured_posts": featured_posts,
        "other_posts" : other_posts,
    }
    return render(request, "blog.html", context)



def blog_detail(request, slug):
    post = get_object_or_404(BlogPost, slug=slug, is_published=True)
    return render(request, ' blog_detail.html', {'post':post})