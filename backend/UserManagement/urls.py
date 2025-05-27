from django.urls import path
from UserManagement import views
urlpatterns = [
    path('view_user/',views.view_user,name='viewUser'),
    path('profile/<int:pk>/',views.profile,name='userProfile'),
    # api
    path('signup/',views.api_signup,name='api_signup'),
    path('login/',views.api_login,name='api_login'), 
    path("user_profile/<int:pk>/",views.user_profile,name="user_profile"),
    path("user_profile_update/<int:pk>/",views.user_profile_update,name="user_profile_update")


]
