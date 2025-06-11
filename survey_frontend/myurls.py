from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('survey/', views.survey_form_view, name='survey_form'),
    path('survey/<int:id>/', views.survey_form_view, name='edit_survey'),
    path('surveys/', views.survey_list_view, name='survey_list'),
    path('survey/delete/<int:id>/', views.delete_survey_view, name='delete_survey'),
]