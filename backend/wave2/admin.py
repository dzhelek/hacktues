from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User

'''
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'tshirt_size',
                    'alergies', 'food_preferences')
                    '''

admin.site.register(User, UserAdmin)
