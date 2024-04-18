from django.urls import path
from .views import productsview,userview,reviewsview,cartview,orderview,pricetrackerview
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)


urlpatterns = [
    path('api/user/login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/user/profile', userview.getCustomerProfile, name='Customer_Profile'),
    path('api/user/register', userview.registerUser, name='user_Register'),

    path('api/user/update', userview.updateProfile, name='user_update'),

    path('api/vendor/register', userview.registerVendor, name='Vendor_Register'),
    path('api/vendor/login', userview.VendorTokenObtainPairView.as_view(), name='vendor_token_obtain_pair'),
    path('api/vendor/products/', productsview.getVendorProducts, name='vendor_products'),
    path('api/vendor/products/<int:pk>', productsview.getVendorProduct, name='vendor_product'),
    path('api/vendor/addproduct/', productsview.postProduct, name="addproduct"),
    path('api/vendor/questions/', reviewsview.getVendorQuestions, name="VendorQuestions"),
    path('api/vendor/questions/unanswered', reviewsview.getVendorUnansweredQuestions , name="VendorUnansweredQuestions"),
    path('api/vendor/answer/<str:pk>', reviewsview.postAnswer, name="postAnswer"),
    path('api/vendor/orders', orderview.getVendorOrders, name="getVendorOrders"),
    path('api/vendor/order/<str:pk>', orderview.postOrderDispatch, name="Post Order Dispatch"),



    path('api/', productsview.getRoutes, name="routes"),
    path('api/categories', productsview.getCategories, name="Categories"),
    path('api/products/', productsview.getProducts, name="products"),
    path('api/products/<str:pk>', productsview.getProduct, name="product"),
    path('api/newarrivals/', productsview.getNewArrivalsProducts, name="newarrivals"),
    path('api/category/<str:pk>', productsview.getCategoryProducts, name="category"),
    path('api/search/', productsview.getSearchProduct, name="search"),

    path('api/review/<str:pk>', reviewsview.postReview, name="postReview"),
    path('api/reviews/<str:pk>', reviewsview.getReviews, name="getReviews"),
    path('api/questions/<str:pk>', reviewsview.getQuestions, name="getQuestions"),
    path('api/question/<str:pk>', reviewsview.postQuestion, name="postQuestions"),

    path('api/cart', cartview.getCart, name="getCart"),
    path('api/cart/<str:pk>', cartview.getCartItem, name="getCartItem"),
    path('api/addcart', cartview.postCartItem, name="postCart"),
    path('api/incrementqty/<str:pk>', cartview.incrementItemQty, name="incrementItemQty"),
    path('api/decrementqty/<str:pk>', cartview.decrementItemQty, name="decrementItemQty"),
    path('api/deleteitem/<str:pk>', cartview.deleteItem, name="deleteItem"),
    path('api/ordersummary', cartview.getOrderSummary, name="getOrderSummary"),
    path('api/coupons', cartview.getCoupons, name="Coupons"),
    path('api/coupon/<str:pk>', cartview.applyCoupon, name="Apply coupon"),
    path('api/address', cartview.getAddress, name="get Addresses"),
    path('api/address/<str:pk>', cartview.updateAddress, name="Update Addresses"),



    path('api/orders', orderview.getOrders, name="getOrders"),
    path('api/checkout', orderview.postOrder, name="postOrders"),
    path('api/paymentupdate', orderview.postPaymentStatus, name="postPaymentStatus"),



    path('api/prices/<str:pk>', pricetrackerview.getPrices, name="get Prices"),
    path('api/trackers/', pricetrackerview.getTrackers, name="get Price Trackers"),
    path('api/tracker/<str:pk>', pricetrackerview.getTracker, name="get Price Tracker"),
    path('api/trackers/add', pricetrackerview.postTracker, name="post Price Trackers"),
    path('api/trackers/delete/<str:pk>', pricetrackerview.deleteTracker, name="delete Price Trackers"),
]