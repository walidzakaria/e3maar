from django.shortcuts import render
from random import shuffle
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime

from .models import Project, Category, MainCategory


def post_survey(request):
    print(request.data)


def home(request):
    main_categories = MainCategory.objects.all()
    categories = Category.objects.all()
    projects = list(Project.objects.filter(show_in_home=True))
    shuffle(projects)
    context = {
        'main_categories': main_categories,
        'categories': categories,
        'projects': projects,
    }
    return render(request, 'index.html', context)


def portfolio(request):
    main_categories = MainCategory.objects.all()
    categories = Category.objects.all()
    projects = list(Project.objects.all())
    shuffle(projects)

    context = {
        'main_categories': main_categories,
        'categories': categories,
        'projects': projects,
    }
    return render(request, 'portfolio.html', context)
