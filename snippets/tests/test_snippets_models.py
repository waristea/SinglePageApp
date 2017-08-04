from django.test import TestCase
from snippets.models import Snippet
import datetime

class SnippetTestCase(TestCase):
    def setUp(self):
        # Testing default value when Snippet is created
        snippet_default = Snippet(id=1)
        snippet_default.save()

        # Check value assignment
        snippet_assigned = Snippet(
            id=2,
            title = 'title_testing',
            is_private = True,
            code = 'code_testing',
            font_size = 15,
            language = 'python',
            theme = 'kuroir',
            highlight_active_line = False,
            show_print_margin = False,
            show_gutter = False,
            tab_size = 3,
            show_line_numbers = False,
            enable_basic_autocomplete = True,
            enable_live_autocomplete = True,
        )
        snippet_assigned.save()

    def test_snippet_value(self):
        snippet_default = Snippet.objects.get(id=1)
        self.assertEqual(snippet_default.title, "Untitled")
        self.assertEqual(snippet_default.is_private, False)
        self.assertEqual(snippet_default.code, 'var foo = bar;\n')
        self.assertEqual(snippet_default.font_size, 12)
        self.assertEqual(snippet_default.language, 'java')
        self.assertEqual(snippet_default.theme, 'github')
        self.assertEqual(snippet_default.highlight_active_line, True)
        self.assertEqual(snippet_default.show_print_margin, True)
        self.assertEqual(snippet_default.show_gutter, True)
        self.assertEqual(snippet_default.tab_size, 2)
        self.assertEqual(snippet_default.show_line_numbers, True)
        self.assertEqual(snippet_default.enable_basic_autocomplete, False)
        self.assertEqual(snippet_default.enable_live_autocomplete, False)

        snippet_assigned = Snippet.objects.get(id=2)
        self.assertEqual(snippet_assigned.title, 'title_testing')
        self.assertEqual(snippet_assigned.is_private, True)
        self.assertEqual(snippet_assigned.code, 'code_testing')
        self.assertEqual(snippet_assigned.font_size, 15)
        self.assertEqual(snippet_assigned.language, 'python')
        self.assertEqual(snippet_assigned.theme, 'kuroir')
        self.assertEqual(snippet_assigned.highlight_active_line, False)
        self.assertEqual(snippet_assigned.show_print_margin, False)
        self.assertEqual(snippet_assigned.show_gutter, False)
        self.assertEqual(snippet_assigned.tab_size, 3)
        self.assertEqual(snippet_assigned.show_line_numbers, False)
        self.assertEqual(snippet_assigned.enable_basic_autocomplete, True)
        self.assertEqual(snippet_assigned.enable_live_autocomplete, True)



