from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from movieapp.serializers import MovieSerializer
from movieapp.models import *
# Create your views here.

@api_view(['GET'])
def getMovies(request):
  movies = Movie.objects.all()
  serializer = MovieSerializer(movies, many=True)
  return Response(serializer.data)

@api_view(['GET'])
def getMovie(request):
  movie = Movie.objects.get(_id=pk)
  serializer = MovieSerializer(movie, many=False) 
  return Response(serializer.data)
