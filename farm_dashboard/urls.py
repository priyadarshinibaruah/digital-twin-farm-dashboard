from django.contrib import admin
from django.urls import path
from dashboard.views import home, predict

urlpatterns = [
    path('', home, name='home'),
    path("predict/", predict),
    # path('history/', history),
]
