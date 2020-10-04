from rest_framework import status, test

from wave2 import models


class TestUserPermission(test.APITestCase):
    def setUp(self):
        self.client = test.APIClient()
        self.data = {
            'first_name': 'First', 'last_name': 'Last',
            'email': 'firstlast@abv.bg', 'password': 'hello',
            'username': 'josen#3212', 'is_active': True, 'tshirt_size': 'l',
            'form': '11g',
        }

    def test_post_403_with_non_staff_user(self):
        user = models.User.objects.create(is_staff=False)
        self.client.force_authenticate(user)

        response = self.client.post('/users/', self.data)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_post_201_with_staff_user(self):
        user = models.User.objects.create(is_staff=True)
        self.client.force_authenticate(user)

        response = self.client.post('/users/', self.data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_put_200_with_editing_self(self):
        user = models.User.objects.create(is_staff=False)
        self.client.force_authenticate(user)

        response = self.client.put(f'/users/{user.id}/', self.data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_200_with_editing_other_user(self):
        user = models.User.objects.create(is_staff=False)
        self.client.force_authenticate(user)
        other = models.User.objects.create(username='other#1234')

        response = self.client.put(f'/users/{other.id}/', self.data)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class TestTeamPermission(test.APITestCase):
    def setUp(self):
        self.client = test.APIClient()
        self.data = {
            'first_name': 'First', 'last_name': 'Last',
            'email': 'firstlast@abv.bg', 'password': 'hello',
            'username': 'josen#3212', 'is_active': True, 'tshirt_size': 'l',
            'form': '11g',
        }
        self.user = models.User.objects.create(**self.data)
        self.client.force_authenticate(self.user)

        models.SmallInteger.objects.create(name='min_users_in_team', value=3)
        models.SmallInteger.objects.create(name='max_users_in_team', value=5)
        models.SmallInteger.objects.create(name='max_teams', value=150)

    def test_post_403_with_staff_user(self):
        self.user.is_staff = True
        self.user.save()

        response = self.client.post('/teams/', {})

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_post_201_with_non_staff_user(self):
        # self.user.is_staff is False
        data = {
            'name': 'hello',
            'github_link': 'https://github.com/././',
            'users': [f'http://testserver/users/{self.user.id}/']
        }

        response = self.client.post('/teams/', data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_put_403_with_not_captain_editor(self):
        # self.user.is_captain is False
        data = {
            'name': 'hello',
            'github_link': 'https://github.com/././',
            'users': [f'http://testserver/users/{self.user.id}/']
        }
        team = models.Team.objects.create()

        response = self.client.put(f'/teams/{team.id}/', data)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_patch_200_with_captain_editor(self):
        team = models.Team.objects.create()
        team.users.set([self.user])
        self.user.is_captain = True
        self.user.save()
        data = {
            'name': 'hello',
            'github_link': 'https://github.com/././',
        }

        response = self.client.patch(f'/teams/{team.id}/', data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
