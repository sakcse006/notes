from django.db import models

# Create your models here.
class CreateNotes(models.Model):
    text = models.TextField(null = True, blank = True)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(default=None, null=True)
    status = models.BooleanField(default=False)

class MediaNotes(models.Model):
    url = models.FileField(null = True, blank = True)
    name = models.CharField(max_length=45, null=True, blank=True)
    format = models.CharField(max_length=10, null=True, blank=True)

class Notes(models.Model):
    message = models.TextField(null = True, blank = True)
    date_time = models.DateTimeField(auto_now_add=True, editable=False)
    create_notes = models.ForeignKey(CreateNotes, related_name='create_notes', on_delete=models.CASCADE)
    list_of_media = models.ManyToManyField(MediaNotes, related_name="media_notes")