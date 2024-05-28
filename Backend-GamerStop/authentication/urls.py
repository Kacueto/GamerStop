from django.urls import path, include, re_path
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'user', views.usersViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', views.register),
    path('login/', views.login),
    path('user/', views.show_users),
    path('edit_user/<int:pk>/', views.edit_user),
    path('delete_user/<int:pk>/', views.delete_user)
    
]


