from django.contrib.auth.models import AbstractUser
from django.db import models


class Technology(models.Model):
    """
    The technologies users are able to choose when creating their account.
    """
    name = models.CharField(max_length=15)

    def __str__(self):
        return self.name


class User(AbstractUser):
    AbstractUser._meta.get_field('first_name').blank = False
    AbstractUser._meta.get_field('last_name').blank = False
    AbstractUser._meta.get_field('email').blank = False
    AbstractUser._meta.get_field('password').blank = True
    AbstractUser._meta.get_field('is_active').default = False

    FORMS = [
        ('11g', '11 G'),
        ('11a', '11 A'),
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

    technologies = models.ManyToManyField(Technology, blank=True)
    form = models.CharField(max_length=4, choices=FORMS)
    food_preferences = models.CharField(max_length=15, choices=FOOD_PREFERENCES, default='0')
    tshirt_size = models.CharField(max_length=5, choices=SIZES)
    alergies = models.TextField(blank=True, null=True)

    REQUIRED_FIELDS = [
        'first_name', 'last_name', 'email', 'form', 'tshirt_size',
    ]

