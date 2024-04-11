from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.contrib.auth.base_user import BaseUserManager
from backend.settings import DATE_INPUT_FORMATS
from django.utils.translation import gettext_lazy as _


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given email and password.
        """
        if not email:
            raise ValueError(_("The Email must be set"))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = None
    email = models.EmailField(_("email address"), unique=True)
    fullname = models.CharField(max_length=255, blank=True,default="")
    is_vendor = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    dob = models.DateField(null=True,blank=True)
    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(blank=True, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email




#Product model

class Category(models.Model):
    name = models.CharField(max_length=100,unique=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    vendor = models.ForeignKey(CustomUser, on_delete=models.SET_NULL , null=True)
    ImageURL = models.ImageField(null=True, blank=True)
    ProductTitle = models.CharField(max_length=200,null=True,blank=True)
    Brand = models.CharField(max_length=200,null=True,blank=True)
    SubCategoryID = models.ForeignKey(Category,null=True,on_delete=models.SET_NULL,blank=True, db_column='name')
    about_product = models.TextField(null=True, blank=True)
    actual_price = models.DecimalField(max_digits=7, decimal_places=0) 
    discounted_price = models.DecimalField(max_digits=7, decimal_places=0) 
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)+" | "+self.ProductTitle


class Images(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE , related_name='images')
    ImageURL = models.ImageField(null=True, blank=True)

    def __str__(self):
        name = str(self.product.id)
        return name

class Spec(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE , related_name='specs')
    specName = models.CharField(max_length=200,null=True, blank=True)
    specDetail = models.CharField(max_length=200,null=True, blank=True)

    def __str__(self):
        name = str(self.product.id) + "  |  " + self.specName + "  |  " + self.product.ProductTitle
        return name


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE , related_name='review')
    review = models.TextField(null=True, blank=True)
    rating = models.IntegerField(default=0,null=True, blank=True)
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL ,null=True, related_name='review')
    createdAt= models.DateTimeField(auto_now_add=True)

    def __str__(self):
        name = str(self.product.id)+ "  |  " + self.user.fullname
        return name


class Question(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE , related_name='question')
    question = models.TextField(null=True, blank=True)
    is_answered = models.BooleanField(default=False)
    vendor = models.ForeignKey(CustomUser, on_delete=models.SET_NULL ,null=True, related_name='vendor')
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL ,null=True, related_name='question')
    createdAt= models.DateTimeField(auto_now_add=True)

    def __str__(self):
        name = str(self.product.id)+ "  |  " + self.user.fullname
        return name

class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE , related_name='answers')
    answer = models.TextField(null=True, blank=True)
    createdAt= models.DateTimeField(auto_now_add=True)

    def __str__(self):
        name = str(self.question.id)+ "  |  " + str(self.id)
        return name

class CartItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE ,null=True, related_name='cartItem')
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL ,null=True, related_name='cart')
    pid = models.CharField(max_length=100,null=True, blank=True)
    qty = models.IntegerField(default=1,null=True, blank=True)
    createdAt= models.DateTimeField(auto_now_add=True)

    def __str__(self):
        name = str(self.user.id)+ "  |  " + str(self.id)
        return name

class Coupon(models.Model):
    code = models.CharField(max_length=100,null=True, blank=True,unique=True)
    discount = models.IntegerField(default=0,null=True, blank=True)
    createdAt= models.DateTimeField(auto_now_add=True)

    def __str__(self):
        name = self.code
        return name

class Address(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL ,null=True, related_name='user')
    title = models.CharField(max_length=100,null=True, blank=True)
    line_1 = models.CharField(max_length=100,null=True, blank=True)
    line_2 = models.CharField(max_length=100,null=True, blank=True)
    city = models.CharField(max_length=100,null=True, blank=True)
    state = models.CharField(max_length=100,null=True, blank=True)
    pincode = models.CharField(max_length=100,null=True, blank=True)


    def __str__(self):
        name = self.title+" "+self.user.email
        return name






