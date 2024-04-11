from django.shortcuts import render
from django.http import JsonResponse
import json
from datetime import date
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..models import CustomUser,Product,CartItem,Coupon,Address
from ..products import products
from ..serializers import CartItemsSerializer,CouponSerializer,AddressSerializer
from ..validator import validate_coupon


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCart(request):
    user = request.user

    cart = CartItem.objects.filter(
       user=user,
    )

    serializer = CartItemsSerializer(cart, many=True)

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCartItem(request,pk):
    user = request.user
    if len(pk) < 4:

        product = Product.objects.get(id=int(pk))
        cartItem = CartItem.objects.filter(
            user=user,
            product=product
        )
        if len(cartItem) == 0 :
            message = { "data":[], "is_cartItem" : False}
        else:
            serializer = CartItemsSerializer(cartItem, many=True)
            message = {
                "data": serializer.data,
                "is_cartItem" : True
            }
        
    
    else:
        cartItem = CartItem.objects.filter(
            user=user,
            pid=pk
        )
        if len(cartItem) == 0 :
            message = { "data":[], "is_cartItem" : False}
        else:
            serializer = CartItemsSerializer(cartItem, many=True)
            message = {
                "data": serializer.data,
                "is_cartItem" : True
            }

    return Response(message)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderSummary(request):
    user = request.user

    cart = CartItem.objects.filter(
       user=user,
    )
    subTotal = 0
    total = 0
    for item in cart:
        
        if item.product == None:
            total = item.qty * 200
        else:
            total = item.qty * item.product.discounted_price
            
        subTotal = subTotal + total

    data = {
        "subTotal": subTotal,
    }

    return Response(data)




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def postCartItem(request):
    user = request.user
    data =request.data
    
    if len(data['id']) < 4:
        product = Product.objects.get(id=int(data['id']))
        cartItem = CartItem.objects.create(
            product = product,
            user = user,
            qty = data['qty'],
            pid = None
        )

    else:
        cartItem = CartItem.objects.create(
            product = None,
            user = user,
            qty = data['qty'],
            pid = data['id']
        )

    serializer = CartItemsSerializer(cartItem, many=False)

    return Response(serializer.data)




@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def incrementItemQty(request,pk):
    user = request.user
    if len(pk) < 4:

        product = Product.objects.get(id=int(pk))
        cartItem = CartItem.objects.filter(
            user=user,
            product=product
        )
        if len(cartItem) == 0 :
            message = { 'message': "No Cart item"}

            
            
        else:
            for item in cartItem:
                setattr(item,'qty',item.qty+1)
                item.save()

            serializer = CartItemsSerializer(cartItem, many=True)
            message = {
                "data": serializer.data,
                "is_cartItem" : True
            }
        
    
    else:
        cartItem = CartItem.objects.filter(
            user=user,
            pid=pk
        )
        if len(cartItem) == 0 :
            message = { 'message': "No Cart item"}
        else:
            for item in cartItem:
                setattr(item,'qty',item.qty+1)
                item.save()
                
            serializer = CartItemsSerializer(cartItem, many=True)
            message = {
                "data": serializer.data,
                "is_cartItem" : True
            }

    return Response(message)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def decrementItemQty(request,pk):
    user = request.user
    if len(pk) < 4:

        product = Product.objects.get(id=int(pk))
        cartItem = CartItem.objects.filter(
            user=user,
            product=product
        )
        if len(cartItem) == 0 :
            message = { 'message': "No Cart item"}

                 
        else:
            for item in cartItem:
                if (item.qty == 1):
                    None
                else:
                    setattr(item,'qty',item.qty-1)
                    item.save()

            serializer = CartItemsSerializer(cartItem, many=True)
            message = {
                "data": serializer.data,
                "is_cartItem" : True
            }
        
    
    else:
        cartItem = CartItem.objects.filter(
            user=user,
            pid=pk
        )
        if len(cartItem) == 0 :
            message = { 'message': "No Cart item"}
        else:
            for item in cartItem:
                if (item.qty == 1):
                    None
                else:
                    setattr(item,'qty',item.qty-1)
                    item.save()
                    
            serializer = CartItemsSerializer(cartItem, many=True)
            message = {
                "data": serializer.data,
                "is_cartItem" : True
            }

    return Response(message)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteItem(request,pk):
    user = request.user
    if len(pk) < 4:

        product = Product.objects.get(id=int(pk))
        cartItem = CartItem.objects.filter(
            user=user,
            product=product
        )
        if len(cartItem) == 0 :
            message = { 'message': "No Cart item"}

                 
        else:
            for item in cartItem:
                    item.delete()

            serializer = CartItemsSerializer(cartItem, many=True)
            message = {
                "message":"Successfully Deleted"
            }
        
    
    else:
        cartItem = CartItem.objects.filter(
            user=user,
            pid=pk
        )
        if len(cartItem) == 0 :
            message = { 'message': "No Cart item"}
        else:
            for item in cartItem:
                item.delete()

            serializer = CartItemsSerializer(cartItem, many=True)
            message = {
                "message":"Successfully Deleted"
            }

    return Response(message)



#COUPON VIEW
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCoupons(request):
    user = request.user

    coupon = Coupon.objects.all()

    data = CouponSerializer(coupon,many=True).data
   

    return Response(data)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def applyCoupon(request,pk):
    user = request.user

    coupon = Coupon.objects.get(code=pk)
    
    value,success = validate_coupon(coupon.code,user)

    if success:
        data = CouponSerializer(coupon,many=False).data

        return Response(data)
    else:
        return Response({"message":value},status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def getAddress(request):
    user = request.user

    if request.method == 'GET':

        addresses = Address.objects.filter(user=user)
        
        serializer = AddressSerializer(addresses,many=True)
        
        return Response(serializer.data)
    
    elif request.method == "POST":
        data = request.data
        address = Address.objects.create(
            user=user,
            title = data['title'],
            line_1= data['line1'],
            line_2= data['line2'],
            city= data['city'],
            state=data['state'],
            pincode=str(data['pincode']),
        )
        
        serializer = AddressSerializer(address,many=False)

        return Response(serializer.data)

    


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateAddress(request,pk):
    user = request.user
    data = request.data
    address = Address.objects.get(id=int(pk))

    for k,v in data.items():
        setattr(address,k,v)
    
    address.save()
    
    serializer = AddressSerializer(address,many=False)

    return Response(serializer.data)

