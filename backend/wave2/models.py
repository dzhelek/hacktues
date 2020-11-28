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
    name = models.CharField(max_length=15)

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

    FORMS = [
        ('8a', '8 A'), ('8b', '8 B'), ('8v', '8 V'), ('8g', '8 G'),
        ('9a', '9 A'), ('9b', '9 B'), ('9v', '9 V'), ('9g', '9 G'),
        ('10a', '10 A'), ('10b', '10 B'), ('10v', '10 V'), ('10g', '10 G'),
        ('11a', '11 A'), ('11b', '11 B'), ('11v', '11 V'), ('11g', '11 G'),
        ('12a', '12 A'), ('12b', '12 B'), ('12v', '12 V'), ('12g', '12 G'),
    ]
    FOOD_PREFERENCES = [
        ('0', 'None'),
        ('Vgtn', 'Vegeterian'),
        ('Vgn', 'Vegan'),
    ]
    SIZES = [
        ('s', 'S'),
        ('m', 'M'),
        ('l', 'L'),
        ('xl', 'XL'),
    ]

    USERNAME_FIELD = 'email'

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
    github_link = models.CharField(
        max_length=400,
        validators=[RegexValidator(regex=r'github.com/.+/.+')]
    )
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
