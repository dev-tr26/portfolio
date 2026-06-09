from django.urls import path
from . import views
from .views import send_message

urlpatterns = [
    path("", views.home_page, name='home'),
    path("blog/", views.blog_list, name="blog_list"),
    path("blog/<slug:slug>/", views.blog_detail, name='blog_detail'),
    path("resources/", views.resources_page, name='resources'),
    path("send-message/", send_message, name="send_message"),
]
