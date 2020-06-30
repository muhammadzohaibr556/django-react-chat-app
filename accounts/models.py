from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import PermissionsMixin, UserManager
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _
from django.utils.safestring import mark_safe
import random


class UserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Please Enter Correct Email")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        user = self.create_user(email, password, **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)


class User(AbstractBaseUser, PermissionsMixin):
    profile = models.ImageField(upload_to='profile_image/', blank=True)
    username = models.CharField(_('username'), max_length=50, unique=True)
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)
    date_joined = models.DateTimeField(
        _('date joined'), auto_now_add=True, editable=False)
    is_active = models.BooleanField(_('active'), default=True)
    is_staff = models.BooleanField(_('staff'), default=False)

    object = UserManager()
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def admin_profile(self):
        try:
            if self.profile:
                return mark_safe('<img src="{}" style="border-radius:50px" alt=image width="100" />'.format(self.profile.url))
            else:
                return mark_safe('<div style="margin-left:25px;width:50px;height:50px; background-color:#{}00{}88;border-radius:50px;text-align:center;"><h1 style="text-transform: uppercase;color:#fff;padding-top:18px">{}</h1></div>'.format(random.randint(0, 9), random.randint(0, 5), self.username[0]))
        except:
            pass

    admin_profile.short_description = 'Profile Image'
    admin_profile.allow_tags = True

    def get_full_name(self):
        full_name = '%s %s' % (self.first_name, self.last_name)
        full_name.strip()
        return full_name

    get_full_name.short_description = 'Full Name'

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.username
