from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,UserManager
from django.utils.timezone import now
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self,email,password=None):
        if not email:
            raise ValueError("Users must hve an email address")
        email=self.normalize_email(email)
        user=self.model(email=email)
        user.set_password(password)
        user.save(using=self._db)
        return user
    

    def create_superuser(self,email,password):
        user=self.create_user(email,password)
        user.is_admin=True
        user.is_superuser=True
        user.save(using=self._db)
        return user
    

class User(AbstractBaseUser):
        email=models.EmailField(unique=True)
        name=models.CharField(max_length=255)
        dob=models.DateField(default="2000-01-01")
        gender=models.CharField(max_length=20,default='Not Specified')
        address=models.CharField(max_length=500,default='No address provided')
        contact_no=models.CharField(max_length=15, default='0000000000')
        last_login=models.DateTimeField(null=True, blank=True, default=now)
        is_active=models.BooleanField(default=True)
        is_admin=models.BooleanField(default=False)
        objects=UserManager()
        USERNAME_FIELD='email'

