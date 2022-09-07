from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from .models import Product, Order, ProductOrder
from .serializers import ProductSerializer, ProductOrderSerializer, OrderSerializer
from django.shortcuts import get_object_or_404
User = get_user_model()

class Home(APIView):
    def get(self, request):
        content = {'message': 'Hello from home :)'}
        return Response(content)

class Products(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many= True)
        return Response(serializer.data)

class ProductsOrder(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = User.objects.get(email=request.user)
        order = Order.objects.filter(user=user).first()
        products = ProductOrder.objects.filter(order=order)
        serializer = OrderSerializer(order)
        serializer2 = ProductOrderSerializer(products, many= True)

        return Response({'order':serializer.data,'products': serializer2.data})



class AddItem(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, id):
        product = get_object_or_404(Product, pk=id)
        print(request.user)
        user = User.objects.get(email=request.user)
        order, created = Order.objects.get_or_create(user=user)
        if order.product_order.filter(product=product).exists():
            product_order = ProductOrder.objects.get(product= product, order=order)
            product_order.quantity += 1
            product_order.save()
            content = {'message': 'adde'}
            return Response(content)
        else:
            product_order = ProductOrder.objects.create(product= product, order=order)
            order.product_order.add(product_order)
            content = {'message': 'new add'}
            return Response(content)

class RemoveItem(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, id):
        product = get_object_or_404(Product, pk=id)
        user = User.objects.get(email=request.user)
        order = Order.objects.filter(user=user)
        if order.exists():
            order = order[0]
            if order.product_order.filter(product=product).exists():
                product_order  = ProductOrder.objects.filter(order=order, product=product)[0]
                print(order.product_order.all())
                if product_order.quantity > 1:
                    product_order.quantity -= 1
                    product_order.save()
                    content = {'message': 'removeitem'}
                    return Response(content)
                else:
                    order.product_order.filter(product=product).delete()
                    content = {'message': 'reomve last one'}
                    return Response(content)                    
            else:
                    content = {'message': 'no item already!'}
                    return Response(content)          
        else:
            content = {'message': 'no order exists!'}
            return Response(content)       




class RemoveProduct(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, id):
        product = get_object_or_404(Product, pk=id)
        user = User.objects.get(email="admin@admin.com")
        order = Order.objects.filter(user=user)
        if order.exists():
            order = order[0]
            if order.product_order.filter(product=product).exists():
                order.product_order.filter(product=product).delete()
                content = {'message': 'reomved'}
                return Response(content)                    
            else:
                    content = {'message': 'no item already!'}
                    return Response(content)          
        else:
            content = {'message': 'no order exists!'}
            return Response(content)       
