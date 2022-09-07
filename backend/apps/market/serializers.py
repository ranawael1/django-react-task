from rest_framework import serializers
from .models import Order, Product, ProductOrder

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = [ 'id', 'name', 'price', 'remainder', ]



class ProductOrderSerializer(serializers.ModelSerializer): 

    class Meta:
        model = ProductOrder
        fields = [ 'id', 'product', 'order', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    total_price1= serializers.SerializerMethodField(read_only=True)
    def get_total_price1(self, order):
        return order.total_price()  
    class Meta:
        model = Order
        fields = [ 'id','total_price1' ]