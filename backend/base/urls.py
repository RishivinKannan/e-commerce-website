from django.urls import path
from .views import productsview,userview
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)


urlpatterns = [
    path('api/user/login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/user/profile', userview.getCustomerProfile, name='Customer_Profile'),
    path('api/user/register', userview.registerUser, name='user_Register'),
    path('api/vendor/register', userview.registerVendor, name='Vendor_Register'),
    path('api/vendor/login', userview.VendorTokenObtainPairView.as_view(), name='vendor_token_obtain_pair'),
    path('api/vendor/products/', productsview.getVendorProducts, name='vendor_products'),
    path('api/vendor/products/<int:pk>', productsview.getVendorProduct, name='vendor_product'),
    path('api/vendor/addproduct/', productsview.postProduct, name="addproduct"),



    path('api/', productsview.getRoutes, name="routes"),
    path('api/products/', productsview.getProducts, name="products"),
    path('api/products/<str:pk>', productsview.getProduct, name="product"),
    path('api/newarrivals/', productsview.getNewArrivalsProducts, name="newarrivals"),
    path('api/category/<str:pk>', productsview.getCategoryProducts, name="category"),
    path('api/search/', productsview.getSearchProduct, name="search"),
]