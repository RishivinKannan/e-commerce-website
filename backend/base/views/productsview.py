from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from ..models import CustomUser,Product,Images
from ..products import products
from ..serializers import UserSerializer,ProductSerializer,ImagesSerializer,ImageSerializer,ProductDetailsSerializer
# Create your views here.


@api_view(['GET'])
def getRoutes(request):
    return Response('Hello')


@api_view(['GET'])
def getProducts(request):
    return Response(products)

@api_view(['GET'])
def getNewArrivalsProducts(request):
    dataProducts = Product.objects.all()
    serializer = ProductSerializer(dataProducts,many=True).data
    Products_List = serializer
    products_reversed = products[::-1]
    for i in range(0,12):
        Products_List.append(products_reversed[i])
    return Response(Products_List)

@api_view(['GET'])
def getProduct(request,pk):
    product = None
    if len(pk) < 3:
        product = Product.objects.get(id=pk)
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)
    else:
        for i in products:
            if str(i['ProductId']) == pk:
                product = i
                break
        return Response(product)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getVendorProducts(request):
    user = request.user
    product = Product.objects.filter(vendor=user)
    serializer = ProductSerializer(product, many=True)

    return Response(serializer.data)

@api_view(['GET','PUT'])
@permission_classes([IsAuthenticated])
def getVendorProduct(request,pk):
    if request.method == 'GET':

        try:
            user = request.user
            product = Product.objects.get(vendor=user,id=pk)
            serializer = ProductSerializer(product, many=False)

            return Response(serializer.data)
        except:
            return Response({"message": "No Product"},status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        try:
            user = request.user
            data =request.data
            cover_image =request.FILES.get('cover_image')
            images = request.FILES.getlist('images')
            if user.is_vendor:
                product = Product.objects.get(id=pk)

                for k,v in data.items():
                    if k == 'images':
                        continue
                    else:
                        setattr(product,k,v)
                        product.save()
                    
                if images:
                    product = Product.objects.get(id=pk,vendor=user)
                    image_list = Images.objects.filter(product=product)
                    for image in image_list:
                        image.delete()
                    
                    for image in images:
                        image = Images.objects.create(
                            product = product,
                            ImageURL = image
                        )
                    

                product_serializer = ProductSerializer(product, many=False).data
                
                return Response(product_serializer)
            else:
                return Response({"message": "User is not an vendor"},status=status.HTTP_400_BAD_REQUEST)

        except Exception as err:

            message=str(err)
            return Response({"message": message},status=status.HTTP_400_BAD_REQUEST)


# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def updateVendorProduct(request,pk):
#     try:
#         user = request.user
#         data =request.data
#         cover_image =request.FILES.get('cover_image')
#         images = request.FILES.getlist('images')
#         if user.is_vendor:
#             product = Product.objects.get(id=pk)

#             for k,v in data:
#                 if k == 'images':
                
#                     for image in images:
#                         image = Images.objects.create(
#                             product = product,
#                             ImageURL = image
#                         )
#                 else:
#                     product[k]=v
                

#             product_serializer = ProductSerializer(product, many=False).data
            
#             return Response(product_serializer)
#         else:
#             return Response({"message": "User is not an vendor"},status=status.HTTP_400_BAD_REQUEST)

#     except Exception as err:

#         message=str(err)
#         return Response({"message": message},status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def postProduct(request):
    try:
        user = request.user
        data =request.data
        cover_image =request.FILES.get('cover_image')
        images = request.FILES.getlist('images')
        if user.is_vendor:
            product = Product.objects.create(
                vendor=user,
                ProductTitle=data["ProductTitle"],
                Brand=data["Brand"],
                SubCategory = data["SubCategory"],
                about_product = data["about_product"],
                actual_price = data["actual_price"] ,
                discounted_price = data["discounted_price"] ,
                countInStock = data["countInStock"],
                ImageURL = cover_image
            )
            if images:
                for image in images:
                    image = Images.objects.create(
                        product = product,
                        ImageURL = image
                    )

            product_serializer = ProductSerializer(product, many=False).data
            
            return Response(product_serializer)
        else:
            return Response({"message": "User is not an vendor"},status=status.HTTP_400_BAD_REQUEST)
            
    except Exception as err:

        message=str(err)
        return Response({"message": message},status=status.HTTP_400_BAD_REQUEST)

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

