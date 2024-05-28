
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Token 
from .serializer import UserSerializer
from rest_framework import status
from  django.shortcuts import get_object_or_404
import uuid


class usersViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        email = request.data['email']
        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        new_user = User.objects.get(email=request.data['email'])
        new_user.set_password(serializer.data['password'])
        new_user.save()
        token = Token(user=new_user, token=uuid.uuid4())
        token.save()
        return Response({'token':token.token ,'user': serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def login(request):
    user = get_object_or_404(User, email=request.data['email'])
    if not user.check_password(request.data['password']):
        return Response({'error': 'Invalid password'}, status=status.HTTP_400_BAD_REQUEST) 
    token = Token.objects.filter(user=user).first()
    serializer = UserSerializer(user)
    return Response({'token': token.token, 'user' : serializer.data}, status=status.HTTP_200_OK)
@api_view(['PUT'])
def edit_user(request, pk):
    user = get_object_or_404(User, pk=pk)
    serializer = UserSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET'])
def show_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
@api_view(['DELETE'])
def delete_user(request, pk):
    user = get_object_or_404(User, pk=pk)
    user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)