from django.test import TestCase
from .models import Survey
from datetime import date

class SurveyModelTest(TestCase):
    def test_create_survey(self):
        survey = Survey.objects.create(
            first_name='Lakshmi',
            last_name='Vissapragada',
            address='123 Patriot Lane',
            city='Fairfax',
            state='VA',
            zip='22030',
            phone='123-456-7890',
            email='lakshmi@gmu.edu',
            date_of_survey=date.today(),
            liked_most='Campus, Students',
            source_of_interest='Internet',
            recommend='Very Likely',
            comments='Great experience!'
        )
        self.assertEqual(survey.email, 'lakshmi@gmu.edu')
        self.assertEqual(survey.liked_most, 'Campus, Students')