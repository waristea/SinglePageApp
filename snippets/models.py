from django.db import models

# Language choices for editor
LANGUAGE_CHOICES = {
    ('javascript','javascript'),
    ('java', 'java'),
    ('python', 'python'),
    ('xml', 'xml'),
    ('ruby', 'ruby'),
    ('sass', 'sass'),
    ('markdown', 'markdown'),
    ('mysql', 'mysql'),
    ('json', 'json'),
    ('html', 'html'),
    ('handlebars', 'handlebars'),
    ('golang', 'golang'),
    ('csharp', 'csharp'),
    ('elixir', 'elixir'),
    ('typescript', 'typescript'),
    ('css', 'css'),
}

# Theme choices for code editor
THEME_CHOICES = [
    ('monokai', 'monokai'),
    ('github', 'github'),
    ('tomorrow', 'tomorrow'),
    ('kuroir', 'kuroir'),
    ('twilight', 'twilight'),
    ('xcode','xcode'),
    ('textmate', 'textmate'),
    ('solarized_dark', 'solarized_dark'),
    ('solarized_light', 'solarized_light'),
    ('terminal','terminal'),
]

class Snippet(models.Model):
    date_created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='Untitled')
    is_private = models.BooleanField(default=False)
    # snippet_password = models.CharField(min_length=5, max_length=10, blank=True)

    # For code editor
    # Fields on editor in accordance to fields below:
    # value, fontSize, mode, theme, highlightActiveLine, showPrintMargin,
    # showGutter, setOptions {{enableBasicAutocompletion,
    # enableLiveAutocompletion, showLineNumbers, tabSize}}
    code = models.TextField(default="var foo = bar;\n")
    font_size = models.IntegerField(default=12)
    language = models.CharField(choices=LANGUAGE_CHOICES, default='java', max_length=100)
    theme = models.CharField(choices=THEME_CHOICES, default='github', max_length=100)
    highlight_active_line = models.BooleanField(default=True)
    show_print_margin = models.BooleanField(default=True)
    show_gutter = models.BooleanField(default=True)
    tab_size = models.IntegerField(default=2)
    show_line_numbers = models.BooleanField(default=True)
    enable_basic_autocomplete = models.BooleanField(default=False)
    enable_live_autocomplete = models.BooleanField(default=False)

    def __str__(self):
        return "@{}".format(self.id)