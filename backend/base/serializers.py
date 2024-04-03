from rest_framework import serializers
from .models import CustomUser,Product,Images
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerwithToken(self.user).data
        for k,v in serializer.items():
            data[k]= v
        return data


class UserSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id','email','dob','is_vendor','username']

    def get_username(self,obj):
        name = obj.fullname
        if name == '':
            name = obj.email
        
        return name



class UserSerializerwithToken(serializers.ModelSerializer):
    username = serializers.SerializerMethodField(read_only=True)
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id','email','dob','is_vendor','username','token']

    def get_username(self,obj):
        name = obj.fullname
        if name == '':
            name = obj.email
        
        return name

    def get_token(self,obj):
        token = RefreshToken.for_user(obj)
        
        return str(token.access_token)



#Product serializer
class ImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    ProductId = serializers.SerializerMethodField(read_only=True)
    images = ImagesSerializer(many=True)
    class Meta:
        model = Product
        fields = '__all__'

    def get_ProductId(self,obj):
        ProductId = obj.id 
        return ProductId



class ImageSerializer(serializers.Serializer):
    images = serializers.ListField(child=serializers.ImageField())


class ProductDetailsSerializer(serializers.Serializer):
    product = ProductSerializer(many=True)
    images = ImagesSerializer(many=True)
