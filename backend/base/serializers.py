from rest_framework import serializers
from .models import CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializer(self.user).data
        for k,v in serializer.items():
            data[k]= v
        return data


class UserSerializer(serializers.ModelSerializer):
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