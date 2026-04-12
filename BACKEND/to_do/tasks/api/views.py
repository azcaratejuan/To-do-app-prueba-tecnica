from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from tasks.models import Task, User
from .serializers import TaskSerializer, UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    @action(detail=False, methods=['post'])
    def login(self, request):
        try:
            firebase_uid = request.data.get('firebase_uid')
            if not firebase_uid:
                return Response(
                    {'error': 'firebase_uid es requerido'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            user, created = User.objects.get_or_create(
                firebase_uid=firebase_uid,
                defaults={
                    'name': request.data.get('name', ''),
                    'email': request.data.get('email', ''),
                    'photo_url': request.data.get('photo_url', ''),
                }
            )

            serializer = UserSerializer(user)
            return Response(
                {'message': 'Usuario registrado' if created else 'Usuario existente', 'data': serializer.data},
                status=status.HTTP_201_CREATED if created else status.HTTP_200_OK
            )
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer

    def get_queryset(self):
        try:
            queryset = Task.objects.all()
            state = self.request.query_params.get('state')
            firebase_uid = self.request.query_params.get('firebase_uid')
            search_user = self.request.query_params.get('search_user')

            if firebase_uid:
                queryset = queryset.filter(created_by__firebase_uid=firebase_uid)
            if search_user:
                queryset = queryset.filter(created_by__name__icontains=search_user)
            if state:
                valid_states = ['pending', 'in_progress', 'completed']
                if state not in valid_states:
                    return None
                queryset = queryset.filter(state=state)
            return queryset
        except Exception as e:
            return None

    def list(self, request):
        try:
            state = request.query_params.get('state')
            valid_states = ['pending', 'in_progress', 'completed']

            if state and state not in valid_states:
                return Response(
                    {'error': f'Estado inválido. Los estados válidos son: {", ".join(valid_states)}'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            tasks = self.get_queryset()
            if tasks is None:
                return Response({'error': 'Error al obtener las tareas'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            if not tasks.exists():
                return Response({'message': 'No hay tareas registradas', 'data': []}, status=status.HTTP_200_OK)

            serializer = TaskSerializer(tasks, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': f'Error interno: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def create(self, request):
        try:
            if not request.data:
                return Response({'error': 'No se enviaron datos'}, status=status.HTTP_400_BAD_REQUEST)
            if not request.data.get('title', '').strip():
                return Response({'error': 'El campo "title" es requerido'}, status=status.HTTP_400_BAD_REQUEST)

            # obtiene el usuario por firebase_uid
            firebase_uid = request.data.get('firebase_uid')
            user = None
            if firebase_uid:
                user = User.objects.filter(firebase_uid=firebase_uid).first()

            serializer = TaskSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(created_by=user, updated_by=user)
                return Response({'message': 'Tarea creada exitosamente', 'data': serializer.data}, status=status.HTTP_201_CREATED)
            return Response({'error': 'Datos inválidos', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': f'Error interno: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def retrieve(self, request, pk=None):
        try:
            if not pk or not str(pk).isdigit():
                return Response({'error': 'ID inválido'}, status=status.HTTP_400_BAD_REQUEST)
            task = Task.objects.get(pk=pk)
            serializer = TaskSerializer(task)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Task.DoesNotExist:
            return Response({'error': f'No existe una tarea con el ID {pk}'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': f'Error interno: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update(self, request, pk=None):
        try:
            if not pk or not str(pk).isdigit():
                return Response({'error': 'ID inválido'}, status=status.HTTP_400_BAD_REQUEST)
            if not request.data:
                return Response({'error': 'No se enviaron datos'}, status=status.HTTP_400_BAD_REQUEST)

            # obtiene el usuario que está editando
            firebase_uid = request.data.get('firebase_uid')
            user = None
            if firebase_uid:
                user = User.objects.filter(firebase_uid=firebase_uid).first()

            task = Task.objects.get(pk=pk)
            serializer = TaskSerializer(task, data=request.data)
            if serializer.is_valid():
                serializer.save(updated_by=user)
                return Response({'message': 'Tarea actualizada', 'data': serializer.data}, status=status.HTTP_200_OK)
            return Response({'error': 'Datos inválidos', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Task.DoesNotExist:
            return Response({'error': f'No existe una tarea con el ID {pk}'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': f'Error interno: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def partial_update(self, request, pk=None):
        try:
            if not pk or not str(pk).isdigit():
                return Response({'error': 'ID inválido'}, status=status.HTTP_400_BAD_REQUEST)

            firebase_uid = request.data.get('firebase_uid')
            user = None
            if firebase_uid:
                user = User.objects.filter(firebase_uid=firebase_uid).first()

            task = Task.objects.get(pk=pk)
            serializer = TaskSerializer(task, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save(updated_by=user)
                return Response({'message': 'Tarea actualizada parcialmente', 'data': serializer.data}, status=status.HTTP_200_OK)
            return Response({'error': 'Datos inválidos', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Task.DoesNotExist:
            return Response({'error': f'No existe una tarea con el ID {pk}'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': f'Error interno: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def destroy(self, request, pk=None):
        try:
            if not pk or not str(pk).isdigit():
                return Response({'error': 'ID inválido'}, status=status.HTTP_400_BAD_REQUEST)
            task = Task.objects.get(pk=pk)
            task.delete()
            return Response({'message': f'Tarea {pk} eliminada'}, status=status.HTTP_204_NO_CONTENT)
        except Task.DoesNotExist:
            return Response({'error': f'No existe una tarea con el ID {pk}'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': f'Error interno: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)