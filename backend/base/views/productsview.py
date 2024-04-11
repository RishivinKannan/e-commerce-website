from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password
import json
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from ..models import CustomUser,Product,Images,Category,Spec
from ..products import products
from ..serializers import UserSerializer,ProductSerializer,ImagesSerializer,CategorySerializer
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
    Products_List = serializer[::-1]
    
    return Response(Products_List)

@api_view(['GET'])
def getProduct(request,pk):
    product = None
    if len(pk) < 4:
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
            data = request.data
            cover_image =request.FILES.get('cover_image')
            images = request.FILES.getlist('images')
            specs = request.data.getlist('specs[]')
            print(images)
            if user.is_vendor:
                product = Product.objects.get(id=pk)

                for k,v in data.items():
                    if k == 'images':
                        continue
                    elif k == 'specs[]':
                        continue
                    elif k == 'SubCategory':
                        category = Category.objects.get(id=int(v))
                        setattr(product,'SubCategoryID',category)
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
                if specs:
                    product = Product.objects.get(id=pk,vendor=user)
                    spec_list = Spec.objects.filter(product=product)
                    for spec in spec_list:
                        spec.delete()
                    
                    for val in specs:
                        spec = json.loads(val)
                        spec = Spec.objects.create(
                            product = product,
                            specName = spec["specName"],
                            specDetail = spec["specDetail"]
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
        SubCategoryID = data["SubCategory"]
        specs = data.getlist("specs[]")
        if user.is_vendor:
            category = Category.objects.get(id=int(SubCategoryID))
            product = Product.objects.create(
                vendor=user,
                ProductTitle=data["ProductTitle"],
                Brand=data["Brand"],
                SubCategoryID = category,
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
            if specs:
                for val in specs:
                    print(val)
                    spec = json.loads(val)
                    spec = Spec.objects.create(
                        product = product,
                        specName = spec["specName"],
                        specDetail = spec["specDetail"]
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


@api_view(['GET'])
def getCategories(request):

    categories = Category.objects.all()

    serializer = CategorySerializer(categories,many=True)

    return Response(serializer.data)
    



