# Generated by Django 4.2 on 2023-04-24 06:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0002_alter_book_price'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='profile',
            options={'ordering': ['id'], 'verbose_name': 'Profile', 'verbose_name_plural': 'Profiles'},
        ),
    ]
