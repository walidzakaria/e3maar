# Generated by Django 3.2.3 on 2021-08-04 17:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('info', '0014_category_main_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='main_category',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='info.maincategory'),
            preserve_default=False,
        ),
    ]
