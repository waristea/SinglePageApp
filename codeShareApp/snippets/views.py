from django.shortcuts import render

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework import generics
from .models import Snippet
from .serializers import SnippetSerializer
from rest_framework.renderers import JSONRenderer

# Snippet list with add option (for debugging)
class SnippetList(generics.ListCreateAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer

# Snippet list (for debugging)
@csrf_exempt
def snippet_list(request):
    if request.method == 'GET':
        snippets = Snippet.objects.all()
        serializer = SnippetSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)

# /snippet/ - New or default snippet
@csrf_exempt
def snippet_new(request):
    snippet = Snippet()
    snippet.save()
    serializer = SnippetSerializer(snippet)
    json_data = JSONRenderer().render(serializer.data)
    context = {
        'json_data' : json_data
    }
    return render(request, 'index.html', context)

# /snippet/api/{pk} - For JSON API
@csrf_exempt
def snippet_api(request, pk):
    try:
        snippet = Snippet.objects.get(pk=pk)
    except Snippet.DoesNotExist:
        response = JsonResponse(
            {'status' : "failed"},
            {'message': "Requested snippet doesn't exist"})
        response.status_code = 500
        return response

    if request.method == 'GET':
        serializer = SnippetSerializer(snippet)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = SnippetSerializer(snippet, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=200)
        return JsonResponse(serializer.errors, status=400)

# /snippet/{pk} - For HTML
@csrf_exempt
def snippet_detail(request, pk):
    try:
        snippet = Snippet.objects.get(pk=pk)
    except Snippet.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = SnippetSerializer(snippet)
        json_data = JSONRenderer().render(serializer.data)
        context = {
            'json_data': json_data
        }
        return render(request, 'index.html', context)