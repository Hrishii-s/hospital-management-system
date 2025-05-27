from django.urls import path,include
from django.views.generic.base import RedirectView
from Home import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns=[
    path('',RedirectView.as_view(url="/home/")),
    path('home/',views.home,name="home"),
    path('admin_login/',views.admin_login,name="adminLogin"),
    path('admin_logout/',views.admin_logout,name="adminLogout")
   
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)