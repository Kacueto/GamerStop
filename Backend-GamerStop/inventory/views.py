from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Products, Category
from .serializer import ProductsSerializer, CategorySerializer
from rest_framework import status
from  django.shortcuts import get_object_or_404

@api_view(['POST'])
def add_category(request):
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET'])
def show_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)
@api_view(['PUT'])
def update_category(request, pk):
    category = get_object_or_404(Category, pk=pk)
    serializer = CategorySerializer(category, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['DELETE'])
def delete_category(request, pk):
    category = get_object_or_404(Category, pk=pk)
    category.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)




@api_view(['POST'])
def add_product(request):
    serializer = ProductsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET'])
def show_products(request):
    products = Products.objects.all()
    serializer = ProductsSerializer(products, many=True)
    return Response(serializer.data)
@api_view(['PUT'])
def update_product(request, pk):
    product = get_object_or_404(Products, pk=pk)
    serializer = ProductsSerializer(product, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['DELETE'])
def delete_product(request, pk):
    product = get_object_or_404(Products, pk=pk)
    product.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
@api_view(['GET'])
def show_products_by_category(request, pk):
    products = Products.objects.filter(category=pk)
    serializer = ProductsSerializer(products, many=True)
    return Response(serializer.data)
@api_view(['GET'])
def random_products(request):
    products = Products.objects.order_by('?')[:6]
    serializer = ProductsSerializer(products, many=True)
    return Response(serializer.data)
@api_view(['GET'])
def show_product(request, pk):
    product = get_object_or_404(Products, pk=pk)
    serializer = ProductsSerializer(product)
    return Response(serializer.data)