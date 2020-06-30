from django.db import models
from accounts.models import User

# Create your models here.


class Message(models.Model):
    author = models.ForeignKey(
        User, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.author.username
