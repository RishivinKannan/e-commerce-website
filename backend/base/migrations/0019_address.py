# Generated by Django 5.0.3 on 2024-04-10 14:23

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0018_alter_coupon_code'),
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=100, null=True, unique=True)),
                ('line_1', models.CharField(blank=True, max_length=100, null=True, unique=True)),
                ('line_2', models.CharField(blank=True, max_length=100, null=True, unique=True)),
                ('city', models.CharField(blank=True, max_length=100, null=True, unique=True)),
                ('state', models.CharField(blank=True, max_length=100, null=True, unique=True)),
                ('pincode', models.CharField(blank=True, max_length=100, null=True, unique=True)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
