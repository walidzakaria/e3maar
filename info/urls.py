
from django.contrib import admin
from django.contrib.staticfiles.storage import staticfiles_storage
from django.urls import path, include

from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import RedirectView

from .views import home, portfolio

urlpatterns = [
    path('', home, name='home'),
    path('portfolio/', portfolio, name='portfolio'),
]
