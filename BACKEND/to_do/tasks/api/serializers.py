from rest_framework import serializers
from tasks.models import Task, User


class UserSerializer(serializers.ModelSerializer):
    # Serializa todos los campos del usuario.
    class Meta:
        model = User
        fields = '__all__'


class TaskSerializer(serializers.ModelSerializer):
    # Campos de solo lectura para mostrar nombres relacionados.
    # al ser foraneas, no se pueden modificar directamente
    # en su generacion en model.
    created_by_name = serializers.CharField(source='created_by.name', read_only=True)
    updated_by_name = serializers.CharField(source='updated_by.name', read_only=True)

    class Meta:
        model = Task
        fields = '__all__'