
from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import TemplateView

urlpatterns = [
    #url(r'^$', TemplateView.as_view(template_name='index.html')),
    #url(r'^login/', include('users.urls')),
    #url(r'^signup/', include('users.urls')),
    url(r'^snippet/', include('snippets.urls')),
]
