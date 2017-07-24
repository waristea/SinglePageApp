from django.conf.urls import url
from snippets import views

urlpatterns = [
    url(r'^$', views.snippet_new, name='snippet-new'), # Making new snippet
    url(r'^list/$', views.SnippetList.as_view(), name='snippet-list'), # Listing all snippets
    url(r'^(?P<pk>[0-9]+)/$', views.snippet_detail, name='snippet-access'), # Accessing certain snippet
    url(r'^api/(?P<pk>[0-9]+)/$', views.snippet_api, name='snippet-access-json'), # Accessing certain snippet using JSON
]