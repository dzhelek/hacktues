# Generated by Django 3.1 on 2020-11-11 18:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wave2', '0010_team_confirmed'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='online',
            field=models.BooleanField(default=False),
        ),
    ]