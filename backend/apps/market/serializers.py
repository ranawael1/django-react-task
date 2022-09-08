from rest_framework import serializers
from .models import Order, Product, ProductOrder

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = [ 'id', 'name', 'price', 'remainder', ]



class ProductOrderSerializer(serializers.ModelSerializer): 
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), source='product')
    product_price= serializers.SerializerMethodField(read_only=True)
    def get_product_price(self, order):
        return order.product_price()  
    class Meta:
        model = ProductOrder
        fields = [ 'id', 'product', 'quantity', 'product_id', 'product_price']

class OrderSerializer(serializers.ModelSerializer):
    total_price= serializers.SerializerMethodField(read_only=True)
    def get_total_price(self, order):
        return order.total_price()  
    class Meta:
        model = Order
        fields = [ 'id','total_price' ]