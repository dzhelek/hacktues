# coding=windows-1251
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.serializers import ValidationError
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet

from .models import Log, Team, Technology, User
from .permissions import UserPermissions, TeamPermissions
from .serializers import TeamSerializer, TechnologySerializer, UserSerializer


def create_log(serializer):
    Log.objects.create(user=serializer._kwargs['context']['request'].user,
                       action=serializer._kwargs['data'])


class TeamViewSet(ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [IsAuthenticated, TeamPermissions]

    def perform_create(self, serializer):
        user = serializer._kwargs['context']['request'].user
        user.is_captain = True
        user.save()

        create_log(serializer)

        return super().perform_create(serializer)

    def perform_update(self, serializer):
        create_log(serializer)
        return super().perform_update(serializer)

    @action(detail=True, methods=['post', 'get'],
            permission_classes=[IsAuthenticated, TeamPermissions])
    def change_captain(self, request, pk=None):
        self.check_object_permissions(request, Team.objects.get(id=pk))
        if request.method == 'POST':
            if len(users := request.data.getlist('users')) != 1:
                raise ValidationError('specify one user')
            # the format of users is 'http://host/users/5/'
            new_captain_id = int(users[0].split('/')[-2])
            new_captain = User.objects.get(id=new_captain_id)
            request.user.is_captain = False
            new_captain.is_captain = True
            request.user.save()
            new_captain.save()
            return Response({'status': 'done', 'details': 'captain changed'})
        else:
            return Response({'status': 'ready', 'details': 'pick a user'},
                            status=400)


class TechnologyViewSet(ReadOnlyModelViewSet):
    queryset = Technology.objects.all()
    serializer_class = TechnologySerializer


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, UserPermissions]

    @action(detail=False, methods=['post', 'get'],
            permission_classes=permission_classes)
    def forgotten_password(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'status': 'ready', 'details': 'pick mail'},
                            status=400)
            token = User.objects.get(email=email).password[21:]
        url = 'hacktues-git-wave2.zaharymomchilov.vercel.app/change_password'
        send_mail('Забравена парола',
                  f'https://{url}/{token}/',
                  'no-reply@hacktues.com',
                  [email],
                  fail_silently=False)
        return Response({'status': 'done', 'details': 'mail sent'})

    @action(detail=False, methods=['post', 'get'],
            permission_classes=permission_classes)
    def change_password(self, request):
        token_id = request.data.get('token_id')
        token = request.data.get('token')
        password = request.data.get('password')
        if not (password and token):
            return Response({'status': 'ready', 'details': 'pick password'},
                            status=400)
        token = 'pbkdf2_sha256$216000$' + token_id + '$' + token
        u = User.objects.get(password=token)
        u.set_password(password)
        u.save()
        return Response({'status': 'done', 'details': 'password changed'})

    @action(detail=True, methods=['post', 'get'],
            permission_classes=[IsAuthenticated, UserPermissions])
    def leave_team(self, request, pk=None):
        user = User.objects.get(id=pk)
        self.check_object_permissions(request, user)
        if request.method == 'POST':
            team = user.team_set.first()
            was_confirmed = team.confirmed
            user.team_set.clear()
            if team.confirmed and not team.is_confirmed:
                team.is_full = False
                team.confirmed = False
                team.save()
                ready_team = Team.objects.filter(ready__lte=timezone.now()).first()
                if ready_team:
                    ready_team.ready = None
                    ready_team.confirmed = True
                    ready_team.save()

            return Response({'status': 'done', 'details': 'team leaved'})
        else:
            return Response({'status': 'ready', 'details': 'leaving team'})
