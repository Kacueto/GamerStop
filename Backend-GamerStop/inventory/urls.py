from django.urls import path
from . import views

urlpatterns = [
    path('add_product', views.add_product, name='add_product'),
    path('show_products', views.show_products, name='show_products'),
    path('update_product/<int:pk>/', views.update_product, name='update_product'),
    path ('delete_product/<int:pk>/', views.delete_product, name='delete_product'),
    path('show_products_by_category/<int:pk>/', views.show_products_by_category, name='show_products_by_category'),
    path('add_category', views.add_category, name='add_category'),
    path('show_categories', views.show_categories, name='show_categories'),
    path('update_category/<int:pk>/', views.update_category, name='update_category'),
    path ('delete_category/<int:pk>/', views.delete_category, name='delete_category'),

] 