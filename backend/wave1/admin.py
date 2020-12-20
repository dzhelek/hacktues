from django.contrib import admin

from . import models


@admin.register(models.Day1, models.Day2)
class DayAdmin(admin.ModelAdmin):
    list_display = 'title', 'start', 'end', 'place'
