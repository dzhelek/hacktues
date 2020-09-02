from unittest.mock import patch

from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from .models import Date, User
from .serializers import date


class TestPasswordManagement(APITestCase):
    def setUp(self):
        self.data = {
            'first_name': 'First', 'last_name': 'Last',
            'email': 'firstlast@abv.bg', 'password': 'hello',
            'username': 'josen', 'is_active': True,
            'tshirt_size': 'l', 'form': '11g',
        }
        self.user = User.objects.create_user(**self.data)
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_get_password_not_visible(self):
        response = self.client.get(f'/users/{self.user.id}/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotIn('password', response.data)

    def test_post_password_is_hashed_correctly_on_creation(self):
        self.data['username'] = 'pass'

        response = self.client.post(f'/users/', self.data)
        user = User.objects.get(id=self.user.id)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(user.check_password('hello'), "Passsword created incorectly")

    def test_patch_password_is_hashed_correctly_on_update(self):
        user_id = self.user.id

        response = self.client.patch(f'/users/{user_id}/', {'password': 'pass'})
        user = User.objects.get(id=user_id)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(user.check_password('pass'), "Passsword updated incorectly")

    def test_put_password_is_not_changed_on_other_fields_update(self):
        user_id = self.user.id
        del self.data['password']

        response = self.client.put(f'/users/{user_id}/', self.data)
        user = User.objects.get(id=user_id)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(user.check_password('hello'), "Passsword should not be changed")

    def test_put_password_is_not_changed_if_blank(self):
        """
        When making PUT request from drf generated html,
        blank password is sent as the password is in the
        serializer fields
        """
        user_id = self.user.id
        self.data['password'] = ''

        response = self.client.put(f'/users/{user_id}/', self.data)
        user = User.objects.get(id=user_id)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(user.check_password('hello'), "Passsword should not be changed")


@patch('wave2.serializers.date', autospec=True)
class TestFieldValidationOnSpecificDates(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(first_name='First', last_name='Last',
                                             email='firstlast@abv.bg', password='hello',
                                             username='josen', is_active=True,
                                             tshirt_size='l', form='11g')
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_get_200(self, *args):
        response = self.client.get(f'/users/{self.user.id}/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_patch_field_uneditable_on_this_date_400(self, date_mock):
        date_mock.today.return_value = date(2019, 1, 2)  # today is 2.1.2019
        validation_date = date(2019, 1, 1)  # 1.1.2019 - befote today
        Date.objects.create(field='tshirt_size', date=validation_date)
        user_id = self.user.id

        response = self.client.patch(f'/users/{user_id}/', {'tshirt_size': 'm'})
        user = User.objects.get(id=user_id)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(user.tshirt_size, 'l')

    def test_patch_field_editable_on_this_date_200(self, date_mock):
        date_mock.today.return_value = date(2019, 1, 2)  # today is 2.1.2019
        validation_date = date(2019, 1, 2)
        Date.objects.create(field='tshirt_size', date=validation_date)
        user_id = self.user.id

        response = self.client.patch(f'/users/{user_id}/', {'tshirt_size': 'm'})
        user = User.objects.get(id=user_id)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(user.tshirt_size, 'm')

    def test_patch_field_uneditable_but_not_edited_200(self, date_mock):
        date_mock.today.return_value = date(2019, 1, 2)  # today is 2.1.2019
        validation_date = date(2019, 1, 1)  # 1.1.2019 - befote today
        Date.objects.create(field='tshirt_size', date=validation_date)
        user_id = self.user.id

        response = self.client.patch(f'/users/{user_id}/', {'tshirt_size': 'l'})
        user = User.objects.get(id=user_id)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(user.tshirt_size, 'l')

    def test_patch_editable_field_200(self, date_mock):
        user_id = self.user.id

        response = self.client.patch(f'/users/{user_id}/', {'first_name': 'First name'})
        user = User.objects.get(id=user_id)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(user.first_name, 'First name')

    def test_patch_one_editable_one_uneditable_field_on_this_date_400(self, date_mock):
        date_mock.today.return_value = date(2019, 1, 2)  # today is 2.1.2019
        validation_date1 = date(2019, 1, 1)  # 1.1.2019 - befote today
        validation_date2 = date(2019, 1, 2)  # today
        Date.objects.create(field='alergies', date=validation_date1)
        Date.objects.create(field='tshirt_size', date=validation_date2)
        user_id = self.user.id

        response = self.client.patch(f'/users/{user_id}/', {'tshirt_size': 'm', 'alergies': 'no'})
        user = User.objects.get(id=user_id)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(user.tshirt_size, 'l')
        self.assertFalse(user.alergies, 'alergies changed after validation date')

