from django.db import models
from authentication.models import User
from inventory.models import Products
# Create your models here.
class Order (models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_price = models.FloatField()
    order_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=100)
    
    
class OrderDetail(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.FloatField()
    sub_total = models.FloatField()
    