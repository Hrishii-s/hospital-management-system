from rest_framework import serializers
from .models import Doctor

class DoctorSerializer(serializers.ModelSerializer):
    profile = serializers.ImageField(use_url=True)
    class Meta:
        model = Doctor
        fields = '__all__'