from rest_framework import serializers
from .models import CustomUser,Product,Images,Category,Spec,Review,Question,Answer,CartItem,Coupon,Address
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

class SpecsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spec
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Review
        fields = '__all__'

    def get_username(self,obj):
        username = obj.user.fullname 
        return username

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField(read_only=True)
    answers = AnswerSerializer(many=True)
    class Meta:
        model = Question
        fields = '__all__'

    def get_username(self,obj):
        username = obj.user.fullname 
        return username




class ProductSerializer(serializers.ModelSerializer):
    ProductId = serializers.SerializerMethodField(read_only=True)
    SubCategory = serializers.CharField(source='SubCategoryID.name',read_only=True)
    images = ImagesSerializer(many=True)
    specs = SpecsSerializer(many=True)
    review = ReviewSerializer(many=True)

    class Meta:
        model = Product
        fields = '__all__'

    def get_ProductId(self,obj):
        ProductId = obj.id 
        return ProductId



# class ImageSerializer(serializers.Serializer):
#     images = serializers.ListField(child=serializers.ImageField())


# class ProductDetailsSerializer(serializers.Serializer):
#     product = ProductSerializer(many=True)
#     images = ImagesSerializer(many=True)

class CartItemsSerializer(serializers.Serializer):
    productId = serializers.SerializerMethodField(read_only=True)
    price = serializers.SerializerMethodField(read_only=True)
    qty = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CartItem
        fields = '__all__'

    def get_productId(self,obj):
        if obj.product == None:
            productId = obj.pid
        else:
            productId = obj.product.id
        
        return productId
    
    def get_price(self,obj):
        if obj.product == None:
            price = 200
        else:
            price = obj.product.discounted_price
        
        return price
    
    def get_qty(self,obj):
        
        return obj.qty



class CouponSerializer(serializers.ModelSerializer):

    class Meta:
        model = Coupon
        fields = '__all__'


class AddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = '__all__'