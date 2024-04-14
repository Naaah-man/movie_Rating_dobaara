from django.urls import path
from . import views

urlpatterns = [
  path('', views.getMovies, name='get_movies'),
  path('<str:pk>/', views.getMovie, name='get_movie')
]