# Generated by Django 3.2.3 on 2021-06-27 13:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('info', '0002_auto_20210626_1911'),
    ]

    operations = [
        migrations.AlterField(
            model_name='maininfo',
            name='late_check_out_price',
            field=models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=14, null=True),
        ),
    ]
