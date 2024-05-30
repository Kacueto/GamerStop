from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Order, OrderDetail
from .serializer import OrderSerializer, OrderDetailSerializer
from rest_framework import status
from  django.shortcuts import get_object_or_404



@api_view(['POST'])
def create_order(request, *args, **kwargs):  # Elimina 'self'
    order_data = request.data.get('order')
    order_details_data = request.data.get('orderdetails')

    order_serializer = OrderSerializer(data=order_data)
    if order_serializer.is_valid():
        order = order_serializer.save()
            
        for detail_data in order_details_data:
            detail_data['order'] = order.id  # Assign the created order id to the orderdetail
            order_detail_serializer = OrderDetailSerializer(data=detail_data)
            if order_detail_serializer.is_valid():
                order_detail_serializer.save()
            else:
                return Response(order_detail_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        return Response(order_serializer.data, status=status.HTTP_201_CREATED)
    return Response(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_order(request, order_id):
    order = get_object_or_404(Order, id=order_id)
    order_serializer = OrderSerializer(order)
    return Response(order_serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT'])
def update_order(request, order_id):
    order = get_object_or_404(Order, id=order_id)
    order_serializer = OrderSerializer(order)
    if order_serializer.is_valid():
        order_serializer.save()
        return Response(order_serializer.data, status=status.HTTP_200_OK)
    return Response(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_order(request, order_id):
    order = get_object_or_404(Order, id=order_id)
    order.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)