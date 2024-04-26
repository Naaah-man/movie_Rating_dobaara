from django.urls import path
from movieapp.views import user_views as views

urlpatterns = [
  
  path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('register/', views.registerUser, name='register'),
  
  path('delete/<str:pk>/', views.deleteUser, name="delete_user"),
  
  path('profile/', views.getUserProfile, name="user_profile"),
  path('profile/update/', views.updateUser, name="update_user"),
  
  path('all/', views.getUsers, name="users_all"),
  
]