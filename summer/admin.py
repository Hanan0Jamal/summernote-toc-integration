from django.contrib import admin
from django_summernote.widgets import SummernoteWidget, SummernoteInplaceWidget
from django_summernote.fields import SummernoteTextField
from django import forms
from django.contrib.admin import register, ModelAdmin
from summer.models import *

from django_summernote.admin import SummernoteModelAdmin

# Register your models here.

class ModelAdminForm(forms.ModelForm):
    description = SummernoteTextField()

    def save(self, commit=True):
        model = super(ModelAdminForm, self).save(commit)
        return model

@register(Model)
class ModelAdmin(SummernoteModelAdmin):
    form = ModelAdminForm
    fields = ('description',)
    summernote_fields = ('description',)
    class Media: js = ('/static/js/summernote_toc_plugin.js',)
