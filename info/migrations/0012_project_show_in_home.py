# Generated by Django 3.2.3 on 2021-07-27 19:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('info', '0011_alter_category_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='show_in_home',
            field=models.BooleanField(default=False),
        ),
    ]
