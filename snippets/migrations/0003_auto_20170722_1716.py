# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-22 10:16
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('snippets', '0002_auto_20170717_2247'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='snippet',
            options={},
        ),
        migrations.RenameField(
            model_name='snippet',
            old_name='created',
            new_name='date_created',
        ),
        migrations.RenameField(
            model_name='snippet',
            old_name='linenos',
            new_name='enable_basic_autocomplete',
        ),
        migrations.RemoveField(
            model_name='snippet',
            name='style',
        ),
        migrations.AddField(
            model_name='snippet',
            name='enable_live_autocomplete',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='snippet',
            name='font_size',
            field=models.IntegerField(default=12),
        ),
        migrations.AddField(
            model_name='snippet',
            name='highlight_active_line',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='snippet',
            name='show_gutter',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='snippet',
            name='show_line_numbers',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='snippet',
            name='show_print_margin',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='snippet',
            name='tab_size',
            field=models.IntegerField(default=2),
        ),
        migrations.AddField(
            model_name='snippet',
            name='theme',
            field=models.CharField(choices=[('MONOKAI', 'monokai'), ('GITHUB', 'github'), ('TOMORROW', 'tomorrow'), ('KUROIR', 'kuroir'), ('TWILIGHT', 'twilight'), ('XCODE', 'xcode'), ('TEXTMATE', 'textmate'), ('SOLARIZED_DARK', 'solarized_dark'), ('SOLARIZED_LIGHT', 'solarized_light'), ('TERMINAL', 'terminal')], default='MONOKAI', max_length=100),
        ),
        migrations.AlterField(
            model_name='snippet',
            name='code',
            field=models.TextField(default='var foo = bar;\n'),
        ),
        migrations.AlterField(
            model_name='snippet',
            name='language',
            field=models.CharField(choices=[('JAVASCRIPT', 'javascript'), ('JAVA', 'java'), ('PYTHON', 'python'), ('XML', 'xml'), ('RUBY', 'ruby'), ('SASS', 'sass'), ('MARKDOWN', 'markdown'), ('MYSQL', 'mysql'), ('JSON', 'json'), ('HTML', 'html'), ('HANDLEBARS', 'handlebars'), ('GOLANG', 'golang'), ('CSHARP', 'csharp'), ('ELIXIR', 'elixir'), ('TYPESCRIPT', 'typescript'), ('CSS', 'css')], default='JAVASCRIPT', max_length=100),
        ),
        migrations.AlterField(
            model_name='snippet',
            name='title',
            field=models.CharField(blank=True, default='Untitled', max_length=100),
        ),
    ]
