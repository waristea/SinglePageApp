from rest_framework import serializers
from snippets.models import Snippet

class SnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snippet
        fields = ('id', 'title', 'code', 'font_size', 'language', 'theme',
                  'tab_size','show_print_margin','show_gutter',
                  'show_line_numbers', 'highlight_active_line',
                  'enable_basic_autocomplete','enable_live_autocomplete')

