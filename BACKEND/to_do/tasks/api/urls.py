from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, UserViewSet

router = DefaultRouter()
router.register('tasks', TaskViewSet, basename='task')
router.register('users', UserViewSet, basename='user')
urlpatterns = router.urls