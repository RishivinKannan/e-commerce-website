# Generated by Django 5.0.3 on 2024-04-04 11:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_category_alter_images_product_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='SubCategory',
            field=models.ForeignKey(blank=True, db_column='name', null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.category'),
        ),
    ]
