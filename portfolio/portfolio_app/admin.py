from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import BlogPost

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_at', 'is_published', 'is_featured']
    prepopulated_fields = {'slug': ('title',)}
    
    fieldsets = (
        ('Content', {
            'fields': ('title', 'slug', 'content', 'featured_image')
        }),
        ('Links', {
            'fields': ('jupyter_link', 'external_link', 'external_link_text')
        }),
        ('Settings', {
            'fields': ('is_published', 'is_featured')
        }),
    )