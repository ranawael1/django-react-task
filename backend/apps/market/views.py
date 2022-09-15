from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from .models import Product, Order, ProductOrder
from .serializers import ProductSerializer, ProductOrderSerializer, OrderSerializer
from django.shortcuts import get_object_or_404
from influxdb_client import InfluxDBClient
from django.http import JsonResponse
from django.conf import settings

User = get_user_model()

def get_influx_client():
    client = InfluxDBClient(
        url= settings.INFLUXDB_URL, 
        token=settings.INFLUXDB_TOKEN, 
        org=settings.INFLUXDB_ORG)
    return client


class Home(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        context = {"message", "home"}
        return Response(context)

class OneData(APIView):
    def get(self, request):
        client = get_influx_client()
        query = 'from(bucket: "influx-test") |> range(start: -20d, stop: -15d) |> filter(fn:(r) => r._measurement == "preSensors")'
        tables = client.query_api().query(query, org="wai")
        results = []
        result = {}
        test= []
        count=0
        for table in tables:
            for record in table.records:
                measurement = record.get_measurement()
                from datetime import datetime
                d = record.get_time().strftime("%Y-%m-%d %H:%M:%S")
                result['time'] = d
                result['value'] = record.get_value()
                results.append(result.copy())
            count +=1
            test2 = {'id': measurement, f'data{count}': results}
            test.append(test2.copy())
        return Response(results)

class TwoData(APIView):
    def get(self, request):
        client = get_influx_client()
        query = 'from(bucket: "influx-test") |> range(start: -20d, stop: -15d)'
        tables = client.query_api().query(query, org="wai")
        results = []
        result = {}
        test= []
        for table in tables:
            for record in table.records:
                measurement = record.get_measurement()
                from datetime import datetime
                d = record.get_time().strftime("%Y-%m-%d %H:%M:%S")
                result['x'] = d
                # result['field'] = record.get_field()
                result['y'] = record.get_value()
                results.append(result.copy())
            test2 = {'id': measurement, 'data': results}
            results= []
            test.append(test2.copy())
        return Response(test)

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
