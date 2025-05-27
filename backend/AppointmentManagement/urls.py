from django.urls import path
from . import views
urlpatterns = [
    path("view_appointments/",views.view_appointments,name="viewAppointments"),
    path("appointment_booking/",views.appointment_booking,name="appointment_booking"),
    path('appointment_history/',views.appointment_history,name='appointment_history')
]