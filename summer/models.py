from django.db import models

class Model(models.Model):
    description = models.TextField(null=True)
