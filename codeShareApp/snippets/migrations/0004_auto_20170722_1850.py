# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-22 11:50
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('snippets', '0003_auto_20170722_1716'),
    ]

    operations = [
        migrations.AlterField(
            model_name='snippet',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]