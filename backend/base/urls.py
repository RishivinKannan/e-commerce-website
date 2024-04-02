from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)


urlpatterns = [
    path('api/user/login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/user/profile', views.getCustomerProfile, name='Customer_Profile'),
    path('api/user/register', views.registerUser, name='user_Register'),
    path('api/', views.getRoutes, name="routes"),
    path('api/products/', views.getProducts, name="products"),
    path('api/addproduct/', views.postProduct, name="addproduct"),
    path('api/newarrivals/', views.getNewArrivalsProducts, name="newarrivals"),
    path('api/products/<str:pk>', views.getProduct, name="product"),
    path('api/category/<str:pk>', views.getCategoryProducts, name="category"),
    path('api/search/', views.getSearchProduct, name="search"),
]