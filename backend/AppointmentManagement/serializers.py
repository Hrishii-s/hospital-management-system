from .models import Appointment
from rest_framework import serializers
from django.contrib.auth import get_user_model
from DoctorManagement.models import Doctor
from DoctorManagement.serializers import DoctorSerializer
from UserManagement.serializers import UserSerializer

User=get_user_model()
class AppointmentSerializer(serializers.ModelSerializer):
    doctor = serializers.PrimaryKeyRelatedField(queryset=Doctor.objects.all())  
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())  
    doctor_details = DoctorSerializer(source='doctor', read_only=True)
    user_details = UserSerializer(source='user', read_only=True)

    class Meta :
        model=Appointment
        fields='__all__'

