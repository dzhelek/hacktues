from datetime import date

from rest_framework import serializers

from .models import Date, SmallInteger, Team, Technology, User


def check_is_full(func):

    def create_update(*args):
        instance = func(*args)

        if instance.is_confirmed is False:
            instance.is_full = False
            instance.save()

        return instance

    return create_update


class TeamSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Team
        fields = ('url', 'name', 'github_link', 'is_full', 'is_confirmed',
                  'project_name', 'project_description', 'users',
                  'technologies')

    @check_is_full
    def create(self, validated_data):
        max_teams = SmallInteger.objects.get(name='max_teams').value
        if Team.objects.count() == max_teams:
            raise serializers.ValidationError('reached maximum teams limit')

        self.check_users_count(validated_data.get('users'))

        return super().create(validated_data)

    @check_is_full
    def update(self, instance, validated_data):
        if users := validated_data.get('users'):
            if users != instance.users:
                self.check_users_count(users)

        return super().update(instance, validated_data)

    @staticmethod
    def check_users_count(users):
        max_users = SmallInteger.objects.get(name='max_users_in_team').value
        if len(users) > max_users:
            raise ValidationError('reached maximum users in team limit')


class TechnologySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Technology
        fields = '__all__'


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'is_active', 'first_name', 'last_name', 'email',
                  'technologies', 'form', 'food_preferences', 'tshirt_size',
                  'alergies', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        instance = super().create(validated_data)
        instance.set_password(instance.password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        initial_password = instance.password
        if not validated_data.get('password'):
            validated_data['password'] = initial_password

        super().update(instance, validated_data)

        new_password = instance.password
        if initial_password != new_password:
            instance.set_password(new_password)
            instance.save()
        return instance

    def is_valid(self, *args, **kwargs):
        """
        some fields should not be editable after specific date
        """
        for field_object in Date.objects.all():
            field = field_object.field
            # new_value = validaed_data.get(field) if field in validated_data
            if new_value := self.initial_data.get(field):
                initial_value = getattr(self.instance, field)

                if initial_value != new_value:
                    if field_object.date < date.today():
                        err = 'not a github repository name'
                        raise serializers.ValidationError(err)

        return super().is_valid(*args, **kwargs)

