from django.core.validators import RegexValidator
from django.db import models

class Day(models.Model):
    title = models.CharField(max_length=200)
    start = models.CharField(max_length=6,
            validators=[RegexValidator(regex=r'\d\d:\d\d')])
    end = models.CharField(max_length=6,
            validators=[RegexValidator(regex=r'\d\d:\d\d')])
    place = models.CharField(max_length=100)

    class Meta:
        abstract = True

    def __str__(self):
        return self.title

class Day1(Day):
    pass

class Day2(Day):
    pass
