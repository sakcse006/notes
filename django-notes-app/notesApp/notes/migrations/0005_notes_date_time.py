# Generated by Django 3.2 on 2023-02-22 19:02

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0004_medianotes_format_medianotes_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='notes',
            name='date_time',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
