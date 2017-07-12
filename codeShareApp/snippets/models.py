from django.db import models
#from users.models import User
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles
import random

LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted((item, item) for item in get_all_styles())


class Snippet(models.Model):
    id = models.IntegerField(primary_key=True, default=random(5))
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='My Code')
    code = models.TextField()
    linenos = models.BooleanField(default=False)
    language = models.CharField(choices=LANGUAGE_CHOICES, default='python', max_length=100)
    style = models.CharField(choices=STYLE_CHOICES, default='friendly', max_length=100)
    is_private = models.BooleanField(default=False)
    snippet_password = models.CharField(min_length=5, max_length=10, blank=True)  #might be changed to django password handler

    #admin = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    #contributor = models.OneToManyField(User)

    class Meta:
        ordering = ('created',)

    def __str__(self):
        return "@{}".format(self.id)
