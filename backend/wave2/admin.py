from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Date, SmallInteger, Team, Technology, User


@admin.register(Date)
class DateAdmin(admin.ModelAdmin):
    list_display = ['field', 'date']


@admin.register(SmallInteger)
class SmallIntegerAdmin(admin.ModelAdmin):
    list_display = ['name', 'value']


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ['name', 'github_link', 'is_full', 'confirmed']

    def confirmed(self, obj):
        return obj.is_confirmed
    
    confirmed.boolean = True
    confirmed.short_description = 'confirmed'


admin.site.register(Technology)


@admin.register(User)
class UserAdmin(UserAdmin):
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email')}),
        ('Additional info', {
            'fields': ('form', 'tshirt_size', 'food_preferences', 'alergies', 'technologies'),
        }),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    list_display = ('username', 'email', 'name', 'form', 'tshirt_size',
                    'food_preferences', 'alergies', 'is_staff', 'is_active')
    list_filter = ('is_active', 'is_staff', 'groups',
                   'food_preferences', 'tshirt_size', 'alergies',
                   'form', 'technologies')
    ordering = ('date_joined', 'username')

    def name(self, obj):
        return obj.get_full_name()

    name.short_description = 'name'

