from django.contrib.auth.models import AbstractUser
from django.db import models

class Date(models.Model):
    """
    Key dates, used in validation of some fields -
    they cannot be changed after the corresponding date
    """
    field = models.CharField(max_length=80)
    date = models.DateField()

    def __str__(self):
        return self.field

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
    AbstractUser._meta.get_field('password').blank = True
    AbstractUser._meta.get_field('is_active').default = False

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

    technologies = models.ManyToManyField(Technology, blank=True)
    form = models.CharField(max_length=4, choices=FORMS)
    food_preferences = models.CharField(max_length=15, choices=FOOD_PREFERENCES, default='0')
    tshirt_size = models.CharField(max_length=5, choices=SIZES)
    alergies = models.TextField(blank=True, null=True)

    REQUIRED_FIELDS = [
        'first_name', 'last_name', 'email', 'form', 'tshirt_size',
    ]

