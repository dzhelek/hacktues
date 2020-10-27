from rest_framework import status, test

from wave2 import models


class TestTeamView(test.APITestCase):
    def setUp(self):
        self.data = {
            'first_name': 'First', 'last_name': 'Last',
            'email': 'firstlast@abv.bg', 'password': 'hello',
            'username': 'josen#3212', 'is_active': True, 'tshirt_size': 'l',
            'form': '11g', 'is_superuser': True
        }
        self.user = models.User.objects.create_user(**self.data)
        self.client = test.APIClient()
        self.client.force_authenticate(self.user)

        models.SmallInteger.objects.create(name='min_users_in_team', value=3)
        models.SmallInteger.objects.create(name='max_users_in_team', value=5)
        models.SmallInteger.objects.create(name='max_teams', value=150)

    def test_post_201_creator_of_team_becomes_captain(self):
        data = {
            'name': 'hello',
            'github_link': 'https://github.com/././',
            'users': [f'http://testserver/users/{self.user.id}/']
        }

        response = self.client.post('/teams/', data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(self.user.is_captain, 'User should be captain')

    def test_patch_200_logs_are_created_on_team_edit(self):
        self.team = models.Team.objects.create()
        data = {'name': 'hello'}

        response = self.client.patch(f'/teams/{self.team.id}/', data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(models.Log.objects.first().action, data)

    def test_patch_201_logs_are_created_on_team_creation(self):
        data = {
            'name': 'hello',
            'github_link': 'https://github.com/././',
            'users': [f'http://testserver/users/{self.user.id}/']
        }

        response = self.client.post('/teams/', data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(models.Log.objects.first().action, data)
