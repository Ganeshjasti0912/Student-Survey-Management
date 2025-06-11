from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from .forms import SurveyForm
from .models import Survey

def home_view(request):
    return render(request, 'survey_app/home.html')

def survey_form_view(request, id=None):
    if id:
        survey = get_object_or_404(Survey, pk=id)
        form = SurveyForm(request.POST or None, instance=survey)
    else:
        survey = None
        form = SurveyForm(request.POST or None)

    if request.method == 'POST':
        if form.is_valid():
            form.save()
            if survey:
                messages.success(request, "Survey updated successfully!")
            else:
                messages.success(request, "Survey submitted successfully!")
            return redirect('survey_list')  
    return render(request, 'survey_app/survey_form.html', {'form': form})

def survey_list_view(request):
    surveys = Survey.objects.all()
    return render(request, 'survey_app/survey_list.html', {'surveys': surveys})

def delete_survey_view(request, id):
    survey = get_object_or_404(Survey, pk=id)
    survey.delete()
    messages.success(request, "Deleted successfully!")
    return redirect('survey_list')
