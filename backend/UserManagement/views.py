from django.shortcuts import render,get_object_or_404
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from django.http import JsonResponse
from UserManagement.models import User
from django.contrib.auth import authenticate
from rest_framework.status import HTTP_200_OK,HTTP_400_BAD_REQUEST,HTTP_404_NOT_FOUND,HTTP_409_CONFLICT
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer
from AppointmentManagement.models import Appointment
from .models import User
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator

@login_required(login_url='/admin_login/')
def view_user(request):
    user_list=User.objects.filter(is_admin=False)
    paginator=Paginator(user_list,4)
    page_number=request.GET.get("page")
    page_obj=paginator.get_page(page_number)
    elided_page=paginator.get_elided_page_range(page_obj.number)
    return render(request,'viewUser.html',{'user_list':page_obj,'page_range':elided_page})

@login_required(login_url='/admin_login/')
def profile(request,pk):
    user = get_object_or_404(User, pk=pk)
    appointments=Appointment.objects.filter(user=user).order_by('-appointment_date')
    paginator=Paginator(appointments,3)
    page_num=request.GET.get("page")
    page_obj=paginator.get_page(page_num)
    elided_range = paginator.get_elided_page_range(page_obj.number)
    return render(request,'userProfile.html', {'user': user,'appointments':page_obj, 'page_range': elided_range})


@api_view(['POST'])
@permission_classes((AllowAny,))
def api_signup(request):
    email=request.data.get("email")
    password=request.data.get("password")
    name=request.data.get("name")
    dob=request.data.get("dob")
    gender=request.data.get("gender")
    address=request.data.get("address")
    contact_no=request.data.get("contact_no")
    if not name or not email or not password:
        return Response({'message':"All fields are required"})
    if User.objects.filter(email=email).exists():
        return JsonResponse({'message':'Email already exists'},status=HTTP_409_CONFLICT)
    user=User.objects.create_user(email=email,password=password)
    user.name=name
    user.dob=dob
    user.gender=gender
    user.address=address
    user.contact_no=contact_no
    user.save()
    return JsonResponse({"message":"user created successfully"},status=HTTP_200_OK)


@csrf_exempt
@api_view(["POST"])
@permission_classes([AllowAny,])
def api_login(request):
    email=request.data.get('email')
    password=request.data.get('password')
    if email is None or password is None:
        return Response({'message':'All fields are required'},status=HTTP_400_BAD_REQUEST)
    user=authenticate(email=email,password=password)
    if not user:
        return Response({'message':'Invalid credentials'},status=HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key,'userId':user.id},status=HTTP_200_OK)



@api_view(['GET'])
@permission_classes([AllowAny])
def user_profile(request,pk):
    user=get_object_or_404(User,pk=pk)
    serializer=UserSerializer(user)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([AllowAny])
def user_profile_update(request,pk):
    user=get_object_or_404(User,pk=pk)
    serializer=UserSerializer(user,data=request.data,partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=HTTP_200_OK)
    else:
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)