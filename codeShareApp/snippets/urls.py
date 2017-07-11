from django.conf.urls import url
from snippets import views

urlpatterns = [
    url(r'^list/$', views.SnippetList.as_view(), name='snippet-list'),
    url(r'^$', views.snippet_list),
    url(r'^(?P<pk>[0-9]+)/$', views.snippet_detail),
]