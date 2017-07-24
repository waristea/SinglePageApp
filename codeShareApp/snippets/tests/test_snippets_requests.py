from snippets.models import Snippet
from django.test import TestCase, Client
from snippets.serializers import SnippetSerializer
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
from rest_framework.test import APIRequestFactory, APIClient
import json

class ViewTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.factory = APIRequestFactory()
        # id=1
        snippet = Snippet()
        snippet.save()
        # id=2
        snippet = Snippet()
        snippet.save()
        # id=3
        snippet = Snippet()
        snippet.save()

    def test_new(self):
        response = self.client.get(
            '/snippet/', HTTP_HOST='localhost:8000')
        json_response = response.context['json_data']

        snippet = Snippet.objects.get(id=1)
        serializer = SnippetSerializer(snippet)
        json_on_db = JSONRenderer().render(serializer.data)

        self.assertEqual(json_response, json_on_db)
        self.assertEqual(response.status_code, 200)


    # Test Detail
    def test_new(self):
        response = self.client.get(
            '/snippet/', HTTP_HOST='localhost:8000')
        print(response)
        json_response = response.context['json_data']

        snippet = Snippet.objects.get(id=4)
        serializer = SnippetSerializer(snippet)
        json_on_db = JSONRenderer().render(serializer.data)

        self.assertEqual(json_response, json_on_db)
        self.assertEqual(response.status_code, 200)

    # Test API
    def test_api(self):
        # PUT
        json_put = {'id': 3,
                    'title': 'Changed',
                    'code': 'Changed',
                    'font_size': 12,
                    'language': 'java',
                    'theme': 'github',
                    'tab_size': 2,
                    'show_print_margin': True,
                    'show_gutter': True,
                    'show_line_numbers': True,
                    'highlight_active_line': True,
                    'enable_basic_autocomplete': False,
                    'enable_live_autocomplete': False}

        response = self.client.put(
            '/snippet/api/3/',
            json.dumps(json_put))

        # GET
        response = self.client.get(
            '/snippet/api/3/')
        json_response = response.json()


        snippet = Snippet.objects.get(id=3)
        serializer = SnippetSerializer(snippet)

        # Test PUT
        self.assertEqual(snippet.code, 'Changed')
        # Test GET
        self.assertEqual(json_response, serializer.data)
        self.assertEqual(response.status_code, 200)