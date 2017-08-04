from django.conf.urls import include, url
from snippets.views import snippet_new

urlpatterns = [
    url(r'^snippet/', include('snippets.urls')), # Accessing individial snippets
    url(r'^$', snippet_new),  # Make new snippet
]
