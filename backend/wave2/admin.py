from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from . import models


@admin.register(models.FieldValidationDate)
class DateAdmin(admin.ModelAdmin):
    list_display = 'field', 'date'


@admin.register(models.Log)
class LogAdmin(admin.ModelAdmin):
    list_display = 'user', 'action', 'date'
    list_filter = 'user', 'date'


@admin.register(models.SmallInteger)
class SmallIntegerAdmin(admin.ModelAdmin):
    list_display = 'name', 'value'


@admin.register(models.Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = 'name', 'github_link', 'is_full', 'confirmed'
    '''
    fieldsets = (
        (None, {'fields': ('id', 'name', 'github_link', 'users'
                           'is_full', 'confirmed')}),
        ('Project info', {'fields': ('project_name', 'project_description',
                                     'technologies')}),
        ('Additional info', {'fields': ('ready', 'is_confirmed')}),
    )
    '''
    readonly_fields = 'is_confirmed', 'confirmed', 'id'
    list_filter = 'is_full',


admin.site.register(models.Technology)


@admin.register(models.User)
class UserAdmin(UserAdmin):
    fieldsets = (
        (None, {'fields': ('id', 'email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'avatar'
                                      'form', 'phone', 'discord_id')}),
        ('Additional info', {
            'fields': ('tshirt_size', 'food_preferences', 'is_online',
                       'alergies', 'technologies', 'is_captain'),
        }),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser',
                       'groups', 'user_permissions'),
        }),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    list_display = ('email', 'name', 'form', 'phone', 'tshirt_size',
                    'food_preferences', 'alergies', 'is_staff', 'is_active',
                    'is_online')
    list_filter = ('is_active', 'is_staff', 'is_online', 'groups',
                   'food_preferences', 'tshirt_size', 'alergies',
                   'form', 'technologies')
    ordering = 'date_joined', 'first_name', 'last_name'
    readonly_fields = 'id',

    def name(self, obj):
        return obj.get_full_name()

    name.short_description = 'name'
