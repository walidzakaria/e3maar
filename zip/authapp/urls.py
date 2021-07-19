from django.urls import path, include, re_path
from . import views
from .views import ActivateUser, PasswordReset

urlpatterns = [
    path('', include('djoser.urls')),
    path('', include('djoser.urls.authtoken')),
    path('', include('djoser.urls.jwt')),
    path('restricted/', views.restricted),
    path('activate/<str:uid>/<str:token>/', ActivateUser.as_view()),
    path('password/reset/confirm/<str:uid>/<str:token>/', PasswordReset.as_view()),
]