# Generated by Django 3.2.3 on 2021-07-05 00:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('info', '0003_alter_maininfo_late_check_out_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='maininfo',
            name='tax_charges',
            field=models.CharField(blank=True, choices=[(None, None), ('Inclusive', 'Inclusive'), ('Additional Charges', 'Additional Charges')], max_length=20, null=True),
        ),
    ]