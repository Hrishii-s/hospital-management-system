from django import forms
from .models import Doctor

class DoctorForm(forms.ModelForm):
    class Meta:
        model = Doctor
        fields = '__all__'
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'doc_num': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': '10 digit number',
 
            }),
            'qualification': forms.TextInput(attrs={'class': 'form-control'}),
            'experience': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'In years'
            }),
            'department': forms.Select(attrs={'class': 'form-select'}),
            'profile': forms.FileInput(attrs={'class': 'form-control'}),
        }