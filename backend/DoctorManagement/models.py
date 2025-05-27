from django.db import models

class Doctor(models.Model):
    DEPARTMENT_CHOICES = [
        ('Cardiology', 'Cardiology'),
        ('Dermatology', 'Dermatology'),
        ('Endocrinology', 'Endocrinology'),
        ('ENT', 'ENT'),
        ('Gynecology', 'Gynecology'),
        ('Neurology', 'Neurology'),
        ('Oncology', 'Oncology'),
        ('Orthopedics', 'Orthopedics'),
        ('Pediatrics', 'Pediatrics'),
        ('Psychiatry', 'Psychiatry'),
        ('Radiology', 'Radiology'),
    ]
    
    name = models.CharField(max_length=200)
    qualification = models.CharField(max_length=200)
    doc_num = models.CharField(max_length=10)
    experience = models.CharField(max_length=200)
    department = models.CharField(max_length=100, choices=DEPARTMENT_CHOICES)
    profile = models.ImageField(upload_to='doctor_profiles/')
