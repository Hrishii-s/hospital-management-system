from django.urls import path,include
from DoctorManagement import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns=[
    path('view_doctors/',views.view_doctors,name='viewDoctors'),
    path('view_doctor_profile/<int:pk>/',views.doctors_profile,name='doctorProfile'),
    path('add_doctor/',views.add_doctor,name='addDoctor') ,
    path('edit_doctor/<int:pk>/',views.edit_doctor,name='editDoctor') ,
    path('delete_doctor/<int:pk>/',views.delete_doctor,name='deleteDoctor') ,
    path('most_viewed_doctor/',views.most_viewed_doctor,name='mostViewed'),
    #// Api //
    path('doctor_list/',views.doctor_list,name="api_doctor_list"),
    path('doctor_profile/<int:pk>/',views.doctor_prof,name="api_doctor_profile")
]


