from django import template

register = template.Library()


@register.filter
def clean_spaces(value):
    return value.replace(' ', '')
