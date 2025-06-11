from django.contrib import admin
from .models import Survey

@admin.register(Survey)
class SurveyAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'email', 'zip', 'date_of_survey')
    search_fields = ('first_name', 'last_name', 'email', 'zip')
    list_filter = ('recommend', 'source_of_interest', 'date_of_survey')