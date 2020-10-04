from django.core import exceptions
from rest_framework.test import APITestCase

from wave2.models import SmallInteger, Team, User


class TestTeamModel(APITestCase):
    def setUp(self):
        self.min = 3
        self.max = 5
        SmallInteger.objects.create(name='min_users_in_team', value=self.min)
        SmallInteger.objects.create(name='max_users_in_team', value=self.max)

    def test_is_confirmed_with_lt_minimum_returns_false(self):
        t = Team.objects.create()

        t.users.set(
            [User.objects.create(username=str(i)) for i in range(self.min - 1)]
        )

        self.assertFalse(t.is_confirmed, 'team should not be confirmed')

    def test_is_confirmed_with_minimum_returns_true(self):
        t = Team.objects.create()

        t.users.set(
            [User.objects.create(username=str(i)) for i in range(self.min)]
        )

        self.assertTrue(t.is_confirmed, 'team should be confirmed')

    def test_github_link_if_valid_doesnt_raise(self):
        t = Team.objects.create(
            name='name',
            github_link='github.com/dzhelek/hackutes'
        )
        t.users.set([User.objects.create()])

        t.full_clean()

    def test_github_link_if_invalid_raises(self):
        t = Team.objects.create(
            name='name',
            github_link='gituhb.com/dzhelek/hackutes'
        )
        t.users.set([User.objects.create()])

        with self.assertRaises(exceptions.ValidationError):
            t.full_clean()

    def test_github_link_if_two_valid_doesnt_raise(self):
        t = Team.objects.create(
            name='name',
            github_link='gituhb.com/dzhelek/hackutes, github.com/dzhelek/hack'
        )
        t.users.set([User.objects.create()])

        t.full_clean()


class TestUserModelUsernameValidator(APITestCase):
    def setUp(self):
        self.data = {
            'first_name': 'First', 'last_name': 'Last',
            'email': 'firstlast@abv.bg', 'password': 'hello',
            'is_active': True, 'tshirt_size': 'l', 'form': '11g',
            'is_superuser': True
        }

    def test_username_without_discriminator_raises(self):
        self.data['username'] = 'test'

        user = User.objects.create(**self.data)

        with self.assertRaises(exceptions.ValidationError):
            user.full_clean()

    def test_username_with_unvalid_discriminator_raises(self):
        self.data['username'] = 'test#32145'

        user = User.objects.create(**self.data)

        with self.assertRaises(exceptions.ValidationError):
            user.full_clean()

    def test_username_with_valid_discriminator_dont_raises(self):
        self.data['username'] = 'test#3214'

        user = User.objects.create(**self.data)

        user.full_clean()
