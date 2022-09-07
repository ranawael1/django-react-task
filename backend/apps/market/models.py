from django.db import models
from apps.user.models import User


class Product(models.Model):
    name = models.CharField(max_length=250)
    price = models.FloatField()
    remainder = models.IntegerField()
    
    def __str__(self):
        return self.name


class Order(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='order')

    def __str__(self):
        return f'{self.id}'

    def total_price(self):
        products = self.product_order.all()
        total = 0
        for product in products:
            total += product.product_price()
        return total

class ProductOrder(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_order')
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='product_order')
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f'{self.id}'
    
    def product_price(self):
        return self.product.price * self.quantity


    

    
