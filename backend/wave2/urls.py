from django.urls import include, path

from rest_framework import routers

from . import views


router = routers.DefaultRouter()
router.register('users', views.UserViewSet)
router.register('technologies', views.TechnologyViewSet)
router.register('teams', views.TeamViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

