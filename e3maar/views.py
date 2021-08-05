from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
from django.core.mail import EmailMessage, send_mail
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.template import Context
from django.template.loader import get_template
from .serializers import SurveySerializer, ContactSerializer
from rest_framework.renderers import JSONRenderer
import json

from .settings import SURVEY_MAIL


def about(request):
    return render(request, 'about.html', {'current_link': 'about'})


def portfolio(request):
    return render(request, 'portfolio.html', {'current_link': 'portfolio'})


def survey(request):
    return render(request, 'survey.html', {'current_link': 'survey'})


def contact(request):
    return render(request, 'contact.html', {'current_link': 'contact'})


@api_view(['POST', ])
def post_survey(request):
    if request.method == 'POST':
        serializer = SurveySerializer(data=request.data)
        if serializer.is_valid():
            if send_survey(serializer.data):
                send_confirmation(serializer.data, 'Survey')
                return Response(data='OK', status=status.HTTP_200_OK)
            else:
                return Response(data='failed', status=status.HTTP_403_FORBIDDEN)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def send_confirmation(input_data, submission_type):
    print('data is', input_data.get('name'))
    msg = get_template('survey-confirmation.html')
    d = {'name': input_data.get('name'), 'submission_type': submission_type}
    message = msg.render(d)
    mail = EmailMessage(
        subject= f'{submission_type} Send Confirmation',
        from_email='info@e3maar-eg.com',
        to=[input_data.get('email')],
        body=message,
    )

    mail.content_subtype = 'html'
    return mail.send()


def test_template(request):
    # send_survey()
    return render(request,
                  'survey-template.html',
                  {
                      'chandeliers1': True,
                      'chandeliers2': False,
                      'chandeliers3': False,
                      'chandeliers4': False,
                      'colorMix': False,
                      'colorScheme': None,
                      'comments': None,
                      'designType': None,
                      'directLight': False,
                      'email': 'walidpiano@yahoo.com',
                      'glass': False,
                      'indirectLight': False,
                      'lightingLevel': None,
                      'marbleGranite': False,
                      'metal': False,
                      'name': 'WALEED ZAKARYA',
                      'pattern': None,
                      'patternMix': False,
                      'phone': '12222222',
                      'projectType': 'restaurantCafeteria',
                      'spotLight1': True,
                      'spotLight2': False,
                      'spotLight3': False,
                      'spotLight4': False,
                      'stone': False,
                      'textureMaterialMix': True,
                      'wood': True,
                      'woodenLight1': False,
                      'woodenLight2': True,
                      'restaurantType': 'arabic',
                      'designClass': None,
                      'light': False,
                      'waterFeatures': False,
                      'seats': False,
                  }
                  )


def send_survey(input_data):
    msg = get_template('survey-template.html')
    d = {
        'chandeliers1': input_data.get('chandeliers1'),
        'chandeliers2': input_data.get('chandeliers2'),
        'chandeliers3': input_data.get('chandeliers3'),
        'chandeliers4': input_data.get('chandeliers4'),
        'colorMix': input_data.get('colorMix'),
        'colorScheme': input_data.get('colorScheme'),
        'comments': input_data.get('comments'),
        'designType': input_data.get('designType'),
        'directLight': input_data.get('directLight'),
        'email': input_data.get('email'),
        'glass': input_data.get('glass'),
        'indirectLight': input_data.get('indirectLight'),
        'lightingLevel': input_data.get('lightingLevel'),
        'marbleGranite': input_data.get('marbleGranite'),
        'metal': input_data.get('metal'),
        'name': input_data.get('name'),
        'pattern': input_data.get('pattern'),
        'patternMix': input_data.get('patternMix'),
        'phone': input_data.get('phone'),
        'projectType': input_data.get('projectType'),
        'spotLight1': input_data.get('spotLight1'),
        'spotLight2': input_data.get('spotLight2'),
        'spotLight3': input_data.get('spotLight3'),
        'spotLight4': input_data.get('spotLight4'),
        'stone': input_data.get('stone'),
        'textureMaterialMix': input_data.get('textureMaterialMix'),
        'wood': input_data.get('wood'),
        'woodenLight1': input_data.get('woodenLight1'),
        'woodenLight2': input_data.get('woodenLight2'),
        'restaurantType': input_data.get('restaurantType'),
        'designClass': input_data.get('designClass'),
        'light': input_data.get('light'),
        'waterFeatures': input_data.get('waterFeatures'),
        'seats': input_data.get('seats'),
    }
    message = msg.render(d)
    mail = EmailMessage(
        subject='Survey Submission',
        from_email='info@e3maar-eg.com',
        to=[SURVEY_MAIL],
        body=message,
    )
    print('d is', d)
    mail.content_subtype = 'html'
    return mail.send()


@api_view(['POST', ])
def post_contact(request):
    if request.method == 'POST':
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            if send_contact(serializer.data):
                send_confirmation(serializer.data, 'Submission')
                return Response(data='OK', status=status.HTTP_200_OK)
            else:
                return Response(data='failed', status=status.HTTP_403_FORBIDDEN)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def send_contact(input_data):
    msg = get_template('contact-template.html')
    d = {
        'name': input_data.get('name'),
        'email': input_data.get('email'),
        'subject': input_data.get('subject'),
        'message': input_data.get('message'),
    }
    message = msg.render(d)
    mail = EmailMessage(
        subject=input_data.get('subject'),
        from_email='info@e3maar-eg.com',
        to=[SURVEY_MAIL],
        body=message,
    )
    print('d is', d)
    mail.content_subtype = 'html'
    return mail.send()