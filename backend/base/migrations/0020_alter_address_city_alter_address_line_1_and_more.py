# Generated by Django 5.0.3 on 2024-04-10 16:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0019_address'),
    ]

    operations = [
        migrations.AlterField(
            model_name='address',
            name='city',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='address',
            name='line_1',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='address',
            name='line_2',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='address',
            name='pincode',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='address',
            name='state',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='address',
            name='title',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
