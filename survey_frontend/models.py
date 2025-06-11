from django.db import models

LIKED_MOST_CHOICES = [
    ('students', 'Students'),
    ('location', 'Location'),
    ('campus', 'Campus'),
    ('atmosphere', 'Atmosphere'),
    ('dorms', 'Dorm Rooms'),
    ('sports', 'Sports'),
]

INTEREST_CHOICES = [
    ('friends', 'Friends'),
    ('tv', 'Television'),
    ('internet', 'Internet'),
    ('other', 'Other'),
]

RECOMMEND_CHOICES = [
    ('very_likely', 'Very Likely'),
    ('likely', 'Likely'),
    ('unlikely', 'Unlikely'),
]

class Survey(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    address = models.CharField(max_length=255)
    zip = models.CharField(max_length=10)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    date_of_survey = models.DateField()

    liked_most = models.JSONField(default=list)  # Store list of liked items
    source_of_interest = models.CharField(max_length=20, choices=INTEREST_CHOICES)
    comments = models.TextField(blank=True)
    recommend = models.CharField(max_length=20, choices=RECOMMEND_CHOICES)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
