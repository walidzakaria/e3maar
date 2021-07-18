# from django.forms import ModelForm
#
# from .models import MainInfo
# from apps.authapp.models import User
#
#
# class MainInfoForm(ModelForm):
#     class Meta:
#         model = MainInfo
#         fields = '__all__'
#
#     def clean_user(self):
#         if not self.cleaned_data['user']:
#             return User()
#         else:
#             return self.cleaned_data['user']
