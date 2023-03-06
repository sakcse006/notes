from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.decorators import action
from django.db.models import F
from django.conf import settings
import os
import operator

from .models import CreateNotes, Notes, MediaNotes

# Create your views here.

class CreateNotesView(viewsets.ModelViewSet):

    def create(self, request):
        try:
            data = request.data
            notes_intance = CreateNotes()
            notes_intance.text = data['text']
            notes_intance.save()
            response = {"value": notes_intance.id, "text": notes_intance.text}
            return Response({"data": response, "status_code": 200, "message": "Notes Created Successfully"})
        except Exception as e:
            return Response({
                "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": str(e)
            })
    
    def list(self, request):
        try:
            notes_intance = CreateNotes.objects.annotate(value=F('id')).values('value', 'text')
            print(notes_intance)
            return Response({"data": notes_intance, "status_code": 200})
        except Exception as e:
            return Response({
                "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": str(e)
            })

class NotesView(viewsets.ModelViewSet):

    media_type = {
        "image": "media/image/",
        "video": "media/video/",
        "text": "media/text/"
    }

    def media(self, data):
        try:
            if operator.contains(data['file'].content_type, "image"):
                media_path = self.media_type.get('image')
                format = "image"
            elif operator.contains(data['file'].content_type, "video"):
                media_path = self.media_type.get('video')
                format = "video"
            elif operator.contains(data['file'].content_type, "text"):
                media_path = self.media_type.get('text')
                format = "text"
            else:
                return False, "Content Type Not Match"

            os.makedirs(str(settings.BASE_DIR) + '/' + media_path, exist_ok=True)
            media_file_path = media_path + data['file'].name
            path = str(settings.BASE_DIR) + '/' + media_file_path
            with open(path, 'wb') as media:
                media.write(data['file'].file.read())
            media_instance = MediaNotes.objects.create(url=media_file_path, name=data['file'].name, format=format)
            media_instance.save()
            return True, media_instance.id
        except Exception as e:
            raise Exception(e.args)

    def create(self, request):
        try:
            multi_media = request.FILES
            if bool(multi_media):
                status, content = self.media(multi_media)
                if status:
                    response_data = {"status_code": 200, "message": content}
                else:
                    response_data = {"status_code": 500, "message": content}
                return Response(response_data)
            data = request.data
            notes_intance = Notes()
            notes_intance.message = data['message']
            notes_intance.create_notes_id = data['create_notes']
            notes_intance.save()
            notes_intance.list_of_media.add(*data['media_instance'])
            response = {"create_notes": notes_intance.id, "visible": True, "message": notes_intance.message, "notes_id": notes_intance.id,
            "media": notes_intance.list_of_media.values(), 'media_instance': [], 'date_time': notes_intance.date_time }
            return Response({"data": response, "status_code": 200, "message": "Notes Created Successfully"})
        except Exception as e:
            return Response({
                "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": str(e)
            })
    
    def retrieve(self, request, pk, *args, **kwargs):
        try:
            notes_instance = Notes.objects.filter(create_notes=pk)
            data = []
            for note in notes_instance:
                note_obj = dict()
                note_obj['notes_id'] = note.id
                note_obj['message'] = note.message
                note_obj['create_notes'] = note.create_notes.id
                note_obj['visible'] = True
                note_obj['media'] = list(note.list_of_media.values())
                note_obj['media_instance'] = []
                note_obj['date_time'] = note.date_time
                data.append(note_obj)
            print(data)
            return Response({"data": data})
        except Exception as e:
            return Response({
                "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": str(e)
            })

    @action(methods=['post'], detail=False, url_path='delete-notes')
    def delete_notes(self, request):
        try:
            data = request.data
            if len(data['media']) > 0:
                for media in data['media']:
                    MediaNotes.objects.filter(id=media['id']).delete()
                    path = str(settings.BASE_DIR) + '/' + media['url']
                    os.remove(path)
            Notes.objects.filter(id=data['notes_id']).delete()
            return Response(True)
        except Exception as e:
            return Response({
                "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": str(e)
            })



    # def destroy(self, request, pk, *args, **kwargs):
        


