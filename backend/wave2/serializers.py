from rest_framework import serializers
from .models import User


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

    def update(self, instance, validated_data):
        instance_password = instance.password
        super().update(instance, validated_data)
        password = validated_data.get('password', instance.password)
        if not password:
            instance.password = instance_password
            instance.save()
        elif instance_password != password:
            instance.set_password(password)
            instance.save()
        return instance

