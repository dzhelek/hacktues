from django.urls import path

from . import views


urlpatterns = [
    path('u', views.UserListCreate.as_view()),
]

