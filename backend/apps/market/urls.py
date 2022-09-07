from django.urls import path
from .views import *

urlpatterns = [
    path('home/', Home.as_view(), name='home'),
    path('products/', Products.as_view(), name='products'),
    path('products-order/', ProductsOrder.as_view(), name='pp'),
    path('add/<int:id>', AddItem.as_view(), name='pp'),
    path('remove/<int:id>', RemoveItem.as_view(), name='pp'),
    path('delete/<int:id>', RemoveProduct.as_view(), name='pp'),

]
