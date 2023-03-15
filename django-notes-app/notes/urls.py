from rest_framework import routers
from django.urls import path, include
from notes.views import *

common_router = routers.DefaultRouter()
common_router.register('create-notes', CreateNotesView, 'create-notes')
common_router.register('notes', NotesView, 'notes')


urlpatterns = [
    path('',include(common_router.urls)),
]
