from django.shortcuts import render,get_object_or_404
from django.shortcuts import redirect
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from django.http import JsonResponse
from django.contrib import messages
from UserManagement.models import User
from django.contrib.auth import authenticate
from rest_framework.status import HTTP_200_OK,HTTP_400_BAD_REQUEST,HTTP_404_NOT_FOUND
from rest_framework.authtoken.models import Token
from .models import Doctor
from .forms import DoctorForm
from .serializers import DoctorSerializer
from AppointmentManagement.models import Appointment
from django.db.models import Count
from django.db.models import Sum
from datetime import datetime
from django.core.paginator import Paginator
from django.contrib.auth.decorators import login_required

@login_required(login_url='/admin_login/')
def view_doctors(request):
    doctors=Doctor.objects.all()
    paginator=Paginator(doctors,4)
    page_number=request.GET.get('page')
    page_obj=paginator.get_page(page_number)
    return render(request,'viewDoctors.html',{'doctors':page_obj})

@login_required(login_url='/admin_login/')
def doctors_profile(request,pk):
    doctor=Doctor.objects.get(pk=pk)
    return render(request,"doctorProfile.html",{'doctor':doctor})

@login_required(login_url='/admin_login/')
def add_doctor(request):
    if request.method=="POST":
        form=DoctorForm(request.POST,request.FILES) 
        if form.is_valid():
            doct=Doctor()
            doct.name=form.cleaned_data['name']
            doct.qualification=form.cleaned_data['qualification']
            doct.experience=form.cleaned_data['experience']
            doct.department=form.cleaned_data['department']
            doct.doc_num=form.cleaned_data['doc_num']
            doct.profile = form.cleaned_data['profile']
            doct.save()
            return redirect("viewDoctors")
        else:
             messages.error(request, "There are some errors in the form. Please fix them and try again.")
    else:
            form=DoctorForm()
    return render(request,"addDoctor.html",{"form":form})

@login_required(login_url='/admin_login/')
def edit_doctor(request,pk):
    doctor=get_object_or_404(Doctor,pk=pk)
    if request.method=="POST":
        form=DoctorForm(request.POST,request.FILES,instance=doctor)
        if form.is_valid():
            form.save()
            return redirect("viewDoctors")
    else:
            form=DoctorForm(instance=doctor)
    return render(request,"editDoctor.html",{"form":form})

@login_required(login_url='/admin_login/')
def delete_doctor(request,pk):
    doctor=get_object_or_404(Doctor,pk=pk)
    if request.method=="POST":
        doctor.delete()
        return redirect("viewDoctors")
    return redirect("viewDoctors")


@login_required(login_url='/admin_login/')
def most_viewed_doctor(request):
    selected_month = request.GET.get('month','all')
    month = {
    'jan': 1, 'feb': 2, 'mar': 3, 'apr': 4, 'may': 5, 'jun': 6,
    'jul': 7, 'aug': 8, 'sep': 9, 'oct': 10, 'nov': 11, 'dec': 12
    }
    appointments=Appointment.objects.all()
    if selected_month != 'all':
       month_num=month.get(selected_month.lower())
       if month_num:
           current_year=datetime.now().year
           appointments=appointments.filter(appointment_date__year=current_year,appointment_date__month=month_num)

    appointments = appointments.values(
        'doctor__id', 'doctor__name', 'doctor__department'
    ).annotate(
        total_visits=Sum('patient_visit')
    ).order_by('-total_visits')

    return render(request, "mostViewed.html", {"appointments": appointments,"selected_month":selected_month})

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def doctor_list(request):
    doctor=Doctor.objects.all()
    serializer=DoctorSerializer(doctor,many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def doctor_prof(request,pk):
    try:
        doctor=Doctor.objects.get(pk=pk)
    except Doctor.DoesNotExist:
        return Response({"error": "Doctor not found"}, status=HTTP_404_NOT_FOUND)
    serializer=DoctorSerializer(doctor, context={'request': request})
    return Response(serializer.data)


