from rest_framework.test import APITestCase

from wave2.models import SmallInteger, Team, User


class TestTeamModelMethodIsConfirmed(APITestCase):
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

