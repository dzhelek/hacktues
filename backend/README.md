# Backend installation notes

## Requirements

1. [python 3.8.5](https://www.python.org/downloads/)
1. [pip](https://pypi.org/project/pip/) (it comes with python unless you uncheck it from the 'optional' stuff)
1. [PostgreSQL](https://www.postgresql.org/download/)

## Installing python packages
`pip install -r requirements.txt`

## Setting up the database
`psql -U postgres -f setup.sql`
`python manage.py migrate`

# Backend use notes

`python manage.py runserver 127.0.0.1:8000`

