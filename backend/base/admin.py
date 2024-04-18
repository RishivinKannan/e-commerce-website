from django.contrib import admin
from . import models
# Register your models here.
admin.site.register(models.CustomUser)
admin.site.register(models.Product)
admin.site.register(models.Images)
admin.site.register(models.Category)
admin.site.register(models.Spec)
admin.site.register(models.Review)
admin.site.register(models.Question)
admin.site.register(models.Answer) 
admin.site.register(models.CartItem)
admin.site.register(models.Coupon)
admin.site.register(models.Address)
admin.site.register(models.Order)
admin.site.register(models.OrderItem)
admin.site.register(models.Price)
admin.site.register(models.PriceTracker)