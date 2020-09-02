from datetime import date

from rest_framework import serializers

from .models import Date, User


def check_editable(update):

    def new_update(self, instance, validated_data):
        for field_object in Date.objects.all():
            field = field_object.field
            # new_value = validaed_data.get(field) if field in validated_data else None
            if new_value := validated_data.get(field):
                initial_value = getattr(instance, field)

                if initial_value != new_value:
                    if field_object.date < date.today():
                        raise serializers.ValidationError

        return update(self, instance, validated_data)

    return new_update


class UserSerializer(serializers.ModelSerializer):
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

    @check_editable
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

