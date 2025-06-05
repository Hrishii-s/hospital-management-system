from django.shortcuts import render,get_object_or_404
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from django.http import JsonResponse
from datetime import date,datetime
from django.utils.timezone import now
from UserManagement.models import User
from DoctorManagement.models import Doctor
from rest_framework.status import HTTP_200_OK,HTTP_400_BAD_REQUEST,HTTP_404_NOT_FOUND
from rest_framework.authtoken.models import Token
from .models import Appointment
from .serializers import AppointmentSerializer
from django.core.paginator import Paginator
from django.contrib.auth.decorators import login_required


@login_required(login_url='/admin_login/')
def view_appointments(request):
        appointments=Appointment.objects.all()

        today=date.today()
        time_now = now()

        filter_by=request.GET.get('filter_by')

        if filter_by == 'today':
             appointments = Appointment.objects.filter(appointment_date=today).order_by('-appointment_date')
             no_appointments_today = not appointments.exists()
        elif filter_by== 'upcoming':
             appointments = Appointment.objects.filter(appointment_date__gt=today).order_by('-appointment_date')
             no_appointments_today = False
        elif filter_by == 'past':
            appointments = Appointment.objects.filter(appointment_date__lt=today).order_by('-appointment_date')
            no_appointments_today = False
        else:
          appointments = Appointment.objects.all().order_by('-appointment_date')
          no_appointments_today = False

        paginator=Paginator(appointments,5)
        page_number=request.GET.get('page')
        page_obj=paginator.get_page(page_number)
        elided_range = paginator.get_elided_page_range(page_obj.number)

        return render (request,"viewAppointments.html",{"appointments":page_obj,"today":today,"filter_by":filter_by,"page_obj":page_obj,
                                                        "time_now":time_now,"no_appointments_today": no_appointments_today,"page_range":elided_range })

@api_view(['POST'])
@permission_classes([IsAuthenticated,])
def appointment_booking(request):
    user_id=request.data.get('user_id')
    doctor_id=request.data.get('doctor_id')
    appointment_date=request.data.get('appointment_date')

    if not user_id or not doctor_id or not appointment_date:
        return JsonResponse ({'message':'all fields are required'},status=HTTP_404_NOT_FOUND)

    user=User.objects.get(id=user_id)
    if not user:
        return JsonResponse({'message':'User not found'},status=HTTP_404_NOT_FOUND)
    doctor=Doctor.objects.get(id=doctor_id)
    if not doctor:
        return JsonResponse({'message':'Doctor not found'},status=HTTP_404_NOT_FOUND)
    previous_appointments = Appointment.objects.filter(user=user, doctor=doctor).count()
    patient_visit = previous_appointments + 1 
    
    appointment={
        'user': user.id,
        'doctor': doctor.id,
        'appointment_date': appointment_date,
        'patient_visit':patient_visit
        }

    serializer=AppointmentSerializer(data=appointment)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated,])
def appointment_history(request):
    user=request.user
    appointment_history=Appointment.objects.filter(user=user)
    serializer=AppointmentSerializer(appointment_history,many=True)
    return Response(serializer.data)


