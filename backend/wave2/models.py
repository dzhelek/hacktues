import pickle
import uuid

from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.db import models


class BaseDate(models.Model):
    field = models.CharField(max_length=80)
    date = models.DateField()

    class Meta:
        abstract = True

    def __str__(self):
        return self.field


class FieldValidationDate(BaseDate):
    """
    Key dates, used in validation of some fields -
    they cannot be changed after the corresponding date.
    """
    pass


class SmallInteger(models.Model):
    """
    Key vales, used in validation of some fields -
    team limits,
    """
    name = models.CharField(max_length=80)
    value = models.SmallIntegerField()

    def __str__(self):
        return self.name


class Technology(models.Model):
    """
    The technologies users are able to choose when creating their account.
    """
    name = models.CharField(max_length=50)

    class Meta:
        verbose_name_plural = 'technologies'

    def __str__(self):
        return self.name


class User(AbstractUser):
    AbstractUser._meta.get_field('first_name').blank = False
    AbstractUser._meta.get_field('last_name').blank = False
    AbstractUser._meta.get_field('email').blank = False
    AbstractUser._meta.get_field('email')._unique = True
    AbstractUser._meta.get_field('email').null = True
    AbstractUser._meta.get_field('password').blank = True
    AbstractUser._meta.get_field('username')._unique = False

    with open('choices.bytes', 'rb') as f:
        choices = pickle.load(f)
    FORMS = choices['FORMS']
    FOOD_PREFERENCES = choices['FOOD_PREFERENCES']
    SIZES = choices['SIZES']

    USERNAME_FIELD = 'email'

    avatar = models.CharField(max_length=34, blank=True, null=True)

    phone = models.CharField(
      max_length=11, validators=[RegexValidator(regex=r'^0\d{9}$')], blank=True
    )
    technologies = models.ManyToManyField(Technology, blank=True)
    form = models.CharField(max_length=4, choices=FORMS)
    food_preferences = models.CharField(max_length=15,
                                        choices=FOOD_PREFERENCES, default='0')
    tshirt_size = models.CharField(max_length=5, choices=SIZES)
    alergies = models.TextField(blank=True, null=True)
    discord_id = models.BigIntegerField(unique=True, null=True)
    is_online = models.BooleanField(default=False)
    is_captain = models.BooleanField(default=False)

    REQUIRED_FIELDS = [
        'first_name', 'last_name', 'form', 'tshirt_size',
    ]

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.form}"


class Log(models.Model):
    """
    Team actions logger.
    """
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    action = models.JSONField()
    date = models.DateTimeField(auto_now_add=True)


class Team(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    users = models.ManyToManyField(User)

    name = models.CharField(max_length=100, unique=True)
    github_link = models.TextField(blank=True)
    is_full = models.BooleanField(default=False)

    project_name = models.CharField(max_length=100, blank=True)
    project_description = models.TextField(blank=True)
    technologies = models.ManyToManyField(Technology, blank=True)

    ready = models.DateTimeField(blank=True, null=True)
    confirmed = models.BooleanField(default=False)

    @property
    def is_confirmed(self):
        min_users = SmallInteger.objects.get(name='min_users_in_team').value
        return self.users.count() >= min_users

    def __str__(self):
        return self.name
