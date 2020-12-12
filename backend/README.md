# Backend installation notes

## Requirements

* [python 3.8.5](https://www.python.org/downloads/) and pip
* [MySQL](https://www.mysql.com/downloads/) and connector/python

## Installing python packages
`pip install -r requirements.txt`

## Setting up the database
* `mysql -u root -p < setup.sql`
* `python manage.py migrate`

## Runnig up the server
1. `export ENV=DEV`
1. `python manage.py runserver`
1. [127.0.0.1:8000](127.0.0.1:8000)

or

[https://hacktues.pythonanywhere.com](https://hacktues.pythonanywhere.com)

# content of `choices.bytes`:
```python
{
    "FORMS": [
        ('8À', '8 À'), ('8Á', '8 Á'), ('8Â', '8 Â'), ('8Ã', '8 Ã'),
        ('9À', '9 À'), ('9Á', '9 Á'), ('9Â', '9 Â'), ('9Ã', '9 Ã'),
        ('10À', '10 À'), ('10Á', '10 Á'), ('10Â', '10 Â'), ('10Ã', '10 Ã'),
        ('11À', '11 À'), ('11Á', '11 Á'), ('11Â', '11 Â'), ('11Ã', '11 Ã'),
        ('12À', '12 À'), ('12Á', '12 Á'), ('12Â', '12 Â'), ('12Ã', '12 Ã'),
    ],
    "FOOD_PREFERENCES": [
        ('0', 'None'),
        ('Vgtn', 'Vegeterian'),
        ('Vgn', 'Vegan'),
    ],
    "SIZES": [
        ('s', 'S'),
        ('m', 'M'),
        ('l', 'L'),
        ('xl', 'XL'),
    ]
}
```
