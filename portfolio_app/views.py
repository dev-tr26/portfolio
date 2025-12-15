from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, redirect, get_object_or_404
from django.shortcuts import HttpResponse
from .models import BlogPost 
from django.http import JsonResponse
from django.core.mail import send_mail
from django.conf import settings

def home_page(request):
    # Get first 4 blogs for preview section
    blogs = BlogPost.objects.filter(is_published=True).order_by('-created_at')[:4]
    
    # Resources data for preview
    resource_collections = [
        {
            "id": "ml-papers",
            "title": "ML Papers",
            "summary": "Curated readings covering transformers, routing, diffusion, and systems papers that translate well into implementation work.",
            "links": [
                {"label": "Transformer Circuits", "url": "https://transformer-circuits.pub"},
                {"label": "RouteNet Lite", "url": "https://arxiv.org/abs/1910.01508"},
                {"label": "Diffusion Cookbook", "url": "https://huggingface.co/learn/diffusion-course"}
            ],
            "tags": ["Research", "Deep Learning", "Notes"],
            "tone": "amber"
        },
        {
            "id": "systems-books",
            "title": "Systems Books",
            "summary": "Handbooks that anchor thinking in operating systems, networks, and performance engineering for ML infra.",
            "links": [
                {"label": "Designing Data Intensive Apps", "url": "https://dataintensive.net"},
                {"label": "Computer Systems: A Programmer's Perspective", "url": "https://csapp.cs.cmu.edu"},
                {"label": "Site Reliability Workbook", "url": "https://sre.google/workbook"}
            ],
            "tags": ["Systems", "Performance", "Infra"],
            "tone": "teal"
        },
        {
            "id": "cuda-tutorials",
            "title": "CUDA Tutorials",
            "summary": "Practical CUDA labs, kernels, and profiling recipes to reason about GPU utilization.",
            "links": [
                {"label": "NVIDIA CUDA Samples", "url": "https://developer.nvidia.com/cuda-code-samples"},
                {"label": "CUDA Crash Course", "url": "https://cuda-education.github.io"},
                {"label": "Triton Language", "url": "https://github.com/openai/triton"}
            ],
            "tags": ["GPU", "Parallelism", "Kernels"],
            "tone": "violet"
        },
        {
            "id": "tech-blogs",
            "title": "Tech Blogs",
            "summary": "Writers that turn low-level work into accessible narratives — ideal for weekly inspiration.",
            "links": [
                {"label": "Andrej Karpathy", "url": "https://karpathy.github.io"},
                {"label": "Bits and Bytes", "url": "https://bitsandbytes.dev"},
                {"label": "Latency Numbers", "url": "https://colin-scott.github.io/personal_website/research/interactive_latency.html"}
            ],
            "tags": ["Storytelling", "Leadership", "Culture"],
            "tone": "rose"
        }
    ]

    starter_tracks = [
        {
            "title": "Production ML Starter Kit",
            "description": "Dashboards, service templates, and review checklists that help launch small models in prod quickly.",
            "items": ["Edge deployment template", "Prompt review rubric", "Postmortem checklist"]
        },
        {
            "title": "Systems Deep Dive",
            "description": "A self-guided 30 day tour through perf tracing, kernel tuning, and debugging GPU utilization.",
            "items": ["Perf tracing lab", "NVTX profiling workbook", "Latency budgeting map"]
        }
    ]

    quick_links = [
        {"label": "Notion knowledge base", "url": "https://www.notion.so"},
        {"label": "Figma board", "url": "https://www.figma.com"},
        {"label": "Community discord", "url": "https://discord.com"}
    ]

    total_links = sum(len(collection["links"]) for collection in resource_collections)
    
    context = {
        "blogs": blogs,
        "resource_collections": resource_collections,
    }
    return render(request, "portfolio.html", context)

def blog_list(request):
    posts = BlogPost.objects.filter(is_published=True).order_by('created_at')
    
    context = {"posts": posts}
    return render(request, "blog.html", context)


def blog_detail(request, slug):
    post = get_object_or_404(BlogPost, slug=slug, is_published=True)
    # If AJAX request, return JSON
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        from django.http import JsonResponse
        return JsonResponse({
            'title': post.title,
            'content': post.content,
            'created_at': post.created_at.strftime('%B %d, %Y'),
            'featured_image': post.featured_image.url if post.featured_image else None,
            'jupyter_link': post.jupyter_link if post.jupyter_link else None,
            'external_link': post.external_link if post.external_link else None,
            'external_link_text': post.external_link_text or 'Article',
        })
    return render(request, 'blog_detail.html', {'post':post})


def resources_page(request):
    resource_collections = [
        {
            "id": "ml-papers",
            "title": "ML Papers",
            "summary": "Curated readings covering transformers, routing, diffusion, and systems papers that translate well into implementation work.",
            "links": [
                {"label": "Transformer Circuits", "url": "https://transformer-circuits.pub"},
                {"label": "RouteNet Lite", "url": "https://arxiv.org/abs/1910.01508"},
                {"label": "Diffusion Cookbook", "url": "https://huggingface.co/learn/diffusion-course"}
            ],
            "tags": ["Research", "Deep Learning", "Notes"],
            "tone": "amber"
        },
        {
            "id": "systems-books",
            "title": "Systems Books",
            "summary": "Handbooks that anchor thinking in operating systems, networks, and performance engineering for ML infra.",
            "links": [
                {"label": "Designing Data Intensive Apps", "url": "https://dataintensive.net"},
                {"label": "Computer Systems: A Programmer's Perspective", "url": "https://csapp.cs.cmu.edu"},
                {"label": "Site Reliability Workbook", "url": "https://sre.google/workbook"}
            ],
            "tags": ["Systems", "Performance", "Infra"],
            "tone": "teal"
        },
        {
            "id": "cuda-tutorials",
            "title": "CUDA Tutorials",
            "summary": "Practical CUDA labs, kernels, and profiling recipes to reason about GPU utilization.",
            "links": [
                {"label": "NVIDIA CUDA Samples", "url": "https://developer.nvidia.com/cuda-code-samples"},
                {"label": "CUDA Crash Course", "url": "https://cuda-education.github.io"},
                {"label": "Triton Language", "url": "https://github.com/openai/triton"}
            ],
            "tags": ["GPU", "Parallelism", "Kernels"],
            "tone": "violet"
        },
        {
            "id": "tech-blogs",
            "title": "Tech Blogs",
            "summary": "Writers that turn low-level work into accessible narratives — ideal for weekly inspiration.",
            "links": [
                {"label": "Andrej Karpathy", "url": "https://karpathy.github.io"},
                {"label": "Bits and Bytes", "url": "https://bitsandbytes.dev"},
                {"label": "Latency Numbers", "url": "https://colin-scott.github.io/personal_website/research/interactive_latency.html"}
            ],
            "tags": ["Storytelling", "Leadership", "Culture"],
            "tone": "rose"
        }
    ]

    starter_tracks = [
        {
            "title": "Production ML Starter Kit",
            "description": "Dashboards, service templates, and review checklists that help launch small models in prod quickly.",
            "items": ["Edge deployment template", "Prompt review rubric", "Postmortem checklist"]
        },
        {
            "title": "Systems Deep Dive",
            "description": "A self-guided 30 day tour through perf tracing, kernel tuning, and debugging GPU utilization.",
            "items": ["Perf tracing lab", "NVTX profiling workbook", "Latency budgeting map"]
        }
    ]

    quick_links = [
        {"label": "Notion knowledge base", "url": "https://www.notion.so"},
        {"label": "Figma board", "url": "https://www.figma.com"},
        {"label": "Community discord", "url": "https://discord.com"}
    ]

    total_links = sum(len(collection["links"]) for collection in resource_collections)

    context = {
        "resource_collections": resource_collections,
        "starter_tracks": starter_tracks,
        "quick_links": quick_links,
        "total_links": total_links,
    }
    return render(request, "resources.html", context)


def send_message(request):
    if request.method == "POST":
        message = request.POST.get("message")

        if not message:
            return JsonResponse({"error": "Message cannot be empty"}, status=400)

        send_mail(
            subject="New Portfolio Message",
            message=message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[settings.EMAIL_HOST_USER],
        )

        return JsonResponse({"success": "Message sent successfully!"})

    return JsonResponse({"error": "Invalid request"}, status=400)