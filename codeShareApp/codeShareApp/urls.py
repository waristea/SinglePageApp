
from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import TemplateView

urlpatterns = [
    url(r'^snippet/', include('snippets.urls')), # Accessing individial snippets
    url(r'^/', include('snippets.urls')),  # Make new snippet
]
