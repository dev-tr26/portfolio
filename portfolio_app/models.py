from django.db import models

# Create your models here.
from django.db import models
from django_ckeditor_5.fields import CKEditor5Field 


class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique =True)
    content = CKEditor5Field('Content', config_name='extends')
    featured_image = models.ImageField(upload_to="images/", blank=True, null=True)
    jupyter_link = models.URLField(blank=True, null=True)
    external_link = models.URLField(blank=True, null=True)
    external_link_text = models.CharField(max_length=100, default="Article")
    created_at = models.DateTimeField(auto_now_add=True)
    is_published = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    
    def __str__(self):
        return self.title
    
    class Meta:
        app_label = 'portfolio_app'
        ordering = ['-created_at']
        
