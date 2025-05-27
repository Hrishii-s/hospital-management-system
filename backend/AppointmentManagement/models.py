from django.db import models
from django.conf import settings
from DoctorManagement.models import Doctor
# Create your models here.
class Appointment(models.Model):
    user=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    doctor=models.ForeignKey(Doctor,on_delete=models.CASCADE)
    appointment_date=models.DateTimeField()
    patient_visit=models.IntegerField(default=0)