# tasks.py
from celery import shared_task
from .models import Product, Price

import time 

@shared_task
def update_prices():
    products = Product.objects.all()

    for product in products:
        # Fetch current price from the e-commerce website
        current_price = product.discounted_price

        # Get the last recorded price for the product
        last_price = Price.objects.filter(product=product).order_by('-timestamp').first()
        # Compare prices
        if last_price == None:
            print(last_price)
            Price.objects.create(product=product, price=current_price)
            Price.objects.create(product=product, price=current_price)

        elif current_price != last_price.price:
            # Price has changed, update the records
            print(last_price)
            Price.objects.create(product=product, price=current_price)
            

while True:
    update_prices()
    time.sleep(15)
