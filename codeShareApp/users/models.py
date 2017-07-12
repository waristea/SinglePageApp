from django.db import models
from django.utils import timezone

#yet to be used
class User(models.Model):
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateField(default=timezone.now)

    def __str__(self):
        return "@{}".format(self.username)

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
