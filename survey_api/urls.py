from django.contrib import admin
from django.urls import path, include
#from survey_app import myurls


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('survey_app.myurls')),
]