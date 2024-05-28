from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class User(models.Model): 
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)
    address = models.CharField(max_length=99)
    phonenumber = models.BigIntegerField()
    admin = models.BooleanField(default=False) 
    
    def set_password(self, raw_password):
        self.password = make_password(raw_password)
        self.save()
    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

class Token(models.Model): 
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=100)