from django.shortcuts import render
from django.http import JsonResponse
from .models import CustomUser
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .products import products
from .serializers import UserSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
# Create your views here.




@api_view(['GET'])
def getRoutes(request):
    return Response('Hello')


@api_view(['GET'])
@permission_classes(['IsAuthenticated'])
def getCustomerProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def registerUser(request):
    try:
        data = request.data
        user = CustomUser.objects.create(
            fullname = data['username'],
            email = data['email'],
            password=make_password(data['password'])
        )
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data) 
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getProducts(request):
    return Response(products)

@api_view(['GET'])
def getNewArrivalsProducts(request):
    Products_List = []
    products_reversed = products[::-1]
    for i in range(0,12):
        Products_List.append(products_reversed[i])
    return Response(Products_List)

@api_view(['GET'])
def getProduct(request,pk):
    product = None
    for i in products:
        if str(i['ProductId']) == pk:
            product = i
            break
    return Response(product)

@api_view(['POST'])
def postProduct(request):
    product = request.data
    products.append(product)
    return Response(product,status=status.HTTP_201_CREATED)

@api_view(['GET'])
def getSearchProduct(request):
    query = request.query_params['query']
    product = []
    for i in products:
        if query in i['ProductTitle'].lower():
            product.append(i) 
    return Response(product)

@api_view(['GET'])
def getCategoryProducts(request,pk):
    product = []
    for i in products:
        if pk.replace('-', "").lower() in "footwear":
            if  i['SubCategory'].lower()  in ["shoes","sandals"]:
                product.append(i)
        else:
            if pk.replace('-', "").lower() in i['SubCategory'].lower():
                product.append(i) 
    return Response(product)

