from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Date, Technology, User

@admin.register(Date)
class DateAdmin(admin.ModelAdmin):
    list_display = ['field', 'date']


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
    list_display = ('username', 'email', 'get_full_name', 'form', 'tshirt_size',
                    'food_preferences', 'alergies', 'is_staff', 'is_active')
    list_filter = ('is_active', 'is_staff', 'groups',
                   'food_preferences', 'tshirt_size', 'alergies',
                   'form', 'technologies')
    ordering = ('date_joined', 'username')


admin.site.register(Technology)

