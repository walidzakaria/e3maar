# Generated by Django 3.2.3 on 2021-07-13 19:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('info', '0004_alter_maininfo_tax_charges'),
    ]

    operations = [
        migrations.AlterField(
            model_name='maininfo',
            name='child_charges',
            field=models.CharField(blank=True, choices=[(None, None), ('Inclusive', 'Inclusive'), ('Additional Charge', 'Additional Charge')], max_length=17, null=True),
        ),
        migrations.AlterField(
            model_name='maininfo',
            name='pets_charges',
            field=models.CharField(blank=True, choices=[(None, None), ('Inclusive', 'Inclusive'), ('Additional Charge', 'Additional Charge')], max_length=17, null=True),
        ),
        migrations.AlterField(
            model_name='maininfo',
            name='resort_charges',
            field=models.CharField(blank=True, choices=[(None, None), ('Inclusive', 'Inclusive'), ('Additional Charge', 'Additional Charge')], max_length=17, null=True),
        ),
        migrations.AlterField(
            model_name='maininfo',
            name='tax_charges',
            field=models.CharField(blank=True, choices=[(None, None), ('Inclusive', 'Inclusive'), ('Additional Charge', 'Additional Charge')], max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='maininfo',
            name='tourist_charges',
            field=models.CharField(blank=True, choices=[(None, None), ('Inclusive', 'Inclusive'), ('Additional Charge', 'Additional Charge')], max_length=17, null=True),
        ),
    ]