from django.urls import path
from movieapp.views import movie_views as views

urlpatterns = [
  path('', views.getMovies, name='get_movies'),
  path('<str:pk>/', views.getMovie, name='get_movie')
]