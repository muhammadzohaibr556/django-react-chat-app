from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import User
from django.contrib.auth.models import Group


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = ['id', 'email', 'admin_profile',
                    'username', 'first_name', 'is_staff', 'is_superuser']
    list_display_links = [
        'email',
        'id'
    ]
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser')}),
        ('Personal Info', {'fields': ('admin_profile', 'profile',
                                      'username', 'first_name', 'last_name')}),
    )
    add_fieldsets = (
        (None, {'fields': ('username', 'email', 'password1', 'password2')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')})
    )

    readonly_fields = ('date_joined', 'admin_profile',)


admin.site.register(User, CustomUserAdmin)
admin.site.unregister(Group)
