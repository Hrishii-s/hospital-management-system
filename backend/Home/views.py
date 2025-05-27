from django.shortcuts import render,redirect
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login,authenticate,logout

def home(request):
    return render (request,"home.html")

def admin_login(request):
    if request.method=="POST":
        email=request.POST.get("email")
        password=request.POST.get("password")
        user=authenticate(request,email=email,password=password)
        if user is not None and user.is_admin:
            login(request,user)
            return redirect("/")
        else:
            return render(request,"adminLogin.html",{"message":"Invalid Email or Password"})
    return render(request,"adminLogin.html")


def admin_logout(request):
    logout(request)  # Clears the session
    return redirect('home') 



# admin@gmail.com
# admin123