from datetime import date

from django.utils import timezone
from django_email_verification import sendConfirm
from rest_framework import serializers

from .models import FieldValidationDate, SmallInteger, Team, Technology, User


class UserField(serializers.StringRelatedField):
    def to_internal_value(self, data):
        return User.objects.get(id=int(data))


class TechnologyField(serializers.StringRelatedField):
    def to_internal_value(self, data):
        return Technology.objects.get(id=int(data))


class TeamSerializer(serializers.HyperlinkedModelSerializer):
    users = UserField(many=True)
    technologies = TechnologyField(many=True)

    class Meta:
        model = Team
        fields = ('id', 'name', 'github_link', 'is_full', 'confirmed',
                  'project_name', 'project_description', 'users',
                  'technologies')
        read_only_fields = 'confirmed',

    def create(self, validated_data):
        max_teams = SmallInteger.objects.get(name='max_teams').value

        self.check_users_count(validated_data.get('users'))

        instance = super().create(validated_data)

        if instance.is_confirmed is False:
            instance.is_full = False
        elif Team.objects.count() > max_teams:
            instance.ready = timezone.now()
        else:
            instance.confirmed = instance.is_confirmed

        instance.save()
        return instance

    def update(self, instance, validated_data):
        if users := validated_data.get('users'):
            if users != [user for user in instance.users.all()]:
                self.check_editable()
                self.check_users_count(users)

        was_confirmed = instance.confirmed

        instance = super().update(instance, validated_data)

        if instance.is_confirmed is False:
            instance.is_full = False
            instance.confirmed = False
            instance.save()
            if was_confirmed:
                team = Team.objects.filter(ready__lte=timezone.now()).first()
                if team:
                    team.ready = None
                    team.confirmed = True
                    team.save()

        return instance

    @staticmethod
    def check_users_count(users):
        max_users = SmallInteger.objects.get(name='max_users_in_team').value
        if len(users) > max_users:
            err = 'reached maximum users in team limit'
            raise serializers.ValidationError(err)

    @staticmethod
    def check_editable():
        editable = FieldValidationDate.objects.get(field='team_editable').date
        if editable < date.today():
            err = f'team is not editable after {editable}'
            raise serializers.ValidationError(err)


class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = '__all__'


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'is_active', 'first_name', 'last_name', 'email',
                  'technologies', 'form', 'food_preferences', 'tshirt_size',
                  'alergies', 'is_online', 'password', 'phone',
                  'team_set', 'discord_id', 'avatar')
        read_only_fields = 'team_set', 'is_active'
        extra_kwargs = {'password': {'write_only': True}}

    @staticmethod
    def confirm_user(user):
        try:
            sendConfirm(user)
        except Exception as e:
            with open('email_log.txt', 'a') as f:
                f.write(str(e) + '\n')


    def create(self, validated_data):
        instance = super().create(validated_data)
        instance.set_password(instance.password)
        instance.save()
        self.confirm_user(instance)
        return instance

    def update(self, instance, validated_data):
        initial_email = instance.email
        initial_password = instance.password
        if not validated_data.get('password'):
            validated_data['password'] = initial_password

        super().update(instance, validated_data)

        new_email = instance.email
        if initial_email != new_email:
            self.confirm_user(instance)
        new_password = instance.password
        if initial_password != new_password:
            instance.set_password(new_password)
            instance.save()
        return instance

    def is_valid(self, *args, **kwargs):
        """
        some fields should not be editable after specific date
        """
        for field_object in FieldValidationDate.objects.all():
            field = field_object.field
            # new_value = validaed_data.get(field) if field in validated_data
            if new_value := self.initial_data.get(field):
                try:
                    initial_value = getattr(self.instance, field)
                except AttributeError:
                    if field_object.date < date.today():
                        err = f'users not creatable after {field_object.date}'
                        raise serializers.ValidationError(err)
                    else:
                        continue

                if initial_value != new_value:
                    if field_object.date < date.today():
                        er = f'{field} was editable untill {field_object.date}'
                        raise serializers.ValidationError(er)

        return super().is_valid(*args, **kwargs)
