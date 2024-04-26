from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Genre(models.Model):
  name = models.CharField(max_length=20, null=True, blank=True)
  def __str__(self):
    return (self.name)


class Movie(models.Model): 
  user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
  genre = models.ManyToManyField(Genre)
  name = models.CharField(max_length=200, null=True, blank=True)
  image = models.ImageField(null=True, blank=True)
  country = models.CharField(max_length=200, null=True, blank=True)
  releaseAt = models.DateField(null=True, blank=True)
  description = models.TextField(null=True, blank=True)
  rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
  duration = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
  numReviews = models.IntegerField(null=True, blank=True)
  boxOfficeCollection = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
  _id = models.AutoField(primary_key=True, editable=False)
  
  def __str__(self):
    return (self.name)

