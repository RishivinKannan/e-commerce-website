from django.shortcuts import render
from django.http import JsonResponse
from ..models import CustomUser
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ..products import products
from ..serializers import UserSerializer,UserSerializerwithToken,MyTokenObtainPairSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCustomerProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateProfile(request):
    user = request.user
    data = request.data
    setattr(user,"fullname",data['fullname'])
    setattr(user,"dob",data['dob'])
    user.save()
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
        serializer = UserSerializerwithToken(user, many=False)
        return Response(serializer.data) 
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def registerVendor(request):
    try:
        data = request.data
        user = CustomUser.objects.create(
            fullname = data['username'],
            email = data['email'],
            password=make_password(data['password']),
            is_vendor = True
        )
        serializer = UserSerializerwithToken(user, many=False)
        return Response(serializer.data) 
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)


class VendorTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request,*args,**kwargs)
        serializer =self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['is_vendor']

        if user:
            return response
        else:
            message = {"detail":'This user is not a vendor'}
            return Response(message,status=status.HTTP_400_BAD_REQUEST)
    
    serializer_class = MyTokenObtainPairSerializer