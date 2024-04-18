from django.shortcuts import render
from django.http import JsonResponse
import json
from datetime import date
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..models import CustomUser,Product,CartItem,Address,Order,OrderItem
from ..products import products
from ..serializers import OrderSerializer,OrderItemSerializer
from ..validator import validate_coupon


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrders(request):
    user = request.user

    order = Order.objects.filter(
       user=user,
    )

    serializer = OrderSerializer(order, many=True)

    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def postOrder(request):
    user = request.user
    data = request.data

    address = Address.objects.get(id=data['addressID'])

    order =  Order.objects.create(
        user=user,
        total=data['total'],
        address=address,
    )

    cart = CartItem.objects.filter(
       user=user,
    )

    for item in cart:
  
        if item.product != None:
            orderItem = OrderItem.objects.create(
                product = item.product,
                order = order,
                qty = item.qty,
                pid = None,
                price=item.product.discounted_price
            )

        else:
            orderItem = OrderItem.objects.create(
                product = None,
                order = order,
                qty = item.qty,
                pid = item.pid,
                price=item.product.discounted_price
            )
    

    serializer = OrderSerializer(order, many=False)

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def postPaymentStatus(request):
    user = request.user
    data = request.data

    order =  Order.objects.get(
        user=user,
        id=data['orderID']
    )

    if data['payment_status']:
        setattr(order,'is_paid',True)
        setattr(order,'is_failed',False)
        setattr(order,'paymentId',data['paymentID'])
    
    else:
        setattr(order,'is_failed',True)
    
    order.save()

    serializer = OrderSerializer(order, many=False)

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def postOrderDispatch(request,pk):
    user = request.user
    data = request.data

    order =  OrderItem.objects.get(
        id=int(pk)
    )

    if order.product.vendor == user:
        setattr(order,'is_dispatch',True)
        
        order.save()

        serializer = OrderItemSerializer(order, many=False)

        return Response(serializer.data)
    
    else:
        return Response({"message":"You are not this product vendor"},status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getVendorOrders(request):
    user = request.user
    vendorOrder = []
    dispatched = []
    orders= OrderItem.objects.all()

    for order in orders:
        if order.product.vendor == user:
            if order.is_dispatch == True:
                dispatched.append(order)
            else:
                vendorOrder.append(order)

    ordersSerializer = OrderItemSerializer(vendorOrder, many=True)
    serializer = OrderItemSerializer(dispatched, many=True)

    data = {
        "orders": ordersSerializer.data,
        "dispatched": serializer.data
    }
    return Response(data)