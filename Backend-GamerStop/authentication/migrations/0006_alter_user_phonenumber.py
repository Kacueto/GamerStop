# Generated by Django 5.0.6 on 2024-05-27 10:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0005_alter_user_phonenumber'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='phonenumber',
            field=models.BigIntegerField(),
        ),
    ]
