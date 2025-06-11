from django import forms
from .models import Survey, LIKED_MOST_CHOICES, INTEREST_CHOICES, RECOMMEND_CHOICES

class SurveyForm(forms.ModelForm):
    liked_most = forms.MultipleChoiceField(
        choices=LIKED_MOST_CHOICES,
        widget=forms.CheckboxSelectMultiple(attrs={'class': 'form-check-input'}),
        required=False
    )

    source_of_interest = forms.ChoiceField(
        choices=INTEREST_CHOICES,
        widget=forms.RadioSelect(attrs={'class': 'form-check-input'}),
        required=False
    )

    recommend = forms.ChoiceField(
        choices=[('', 'Select')] + RECOMMEND_CHOICES,
        widget=forms.Select(attrs={'class': 'form-select'}),
        required=False
    )

    class Meta:
        model = Survey
        fields = '__all__'
        widgets = {
            'first_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter your first name',
                'required': True
            }),
            'last_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter your last name',
                'required': True
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'xxxxx@gmu.edu',
                'required': True
            }),
            'address': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Street address',
                'required': True
            }),
            'zip': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter ZIP code',
                'maxlength': 5,
                'required': True,
                'id': 'id_zip'
            }),
            'city': forms.TextInput(attrs={
                'class': 'form-control',
                'readonly': True,
                'id': 'id_city'
            }),
            'state': forms.TextInput(attrs={
                'class': 'form-control',
                'readonly': True,
                'id': 'id_state'
            }),
            'phone': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': '123-456-7890',
                'required': True
            }),
            'date_of_survey': forms.DateInput(attrs={
                'type': 'date',
                'class': 'form-control',
                'required': True
            }),
            'comments': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 3,
                'placeholder': 'Enter your feedback'
            }),
        }
