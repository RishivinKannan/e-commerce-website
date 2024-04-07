from django.contrib import admin
from .models import CustomUser,Product,Images,Category,Spec
# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Product)
admin.site.register(Images)
admin.site.register(Category)
admin.site.register(Spec)