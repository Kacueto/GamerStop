from django.db import models

# Create your models here.
class Category (models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    
    
class Products (models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.FloatField()
    stock = models.IntegerField()
    image = models.URLField()
    category = models.ForeignKey('category', on_delete=models.CASCADE)

