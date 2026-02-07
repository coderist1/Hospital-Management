from django import forms
from .models import PatientDetails, DoctorDetails, AppointmentDetails

class PatientForm(forms.ModelForm):
    Patient_ID = forms.CharField(disabled=True, required=False)
    
    class Meta:
        model = PatientDetails
        fields = ['Patient_ID', 'name', 'age', 'gender', 'phone', 'address']

class DoctorForm(forms.ModelForm):
    Doctor_ID = forms.CharField(disabled=True, required=False)
    
    class Meta:
        model = DoctorDetails
        fields = ['Doctor_ID', 'Full_Name', 'Address', 'Age', 'Sex', 'ContactNumber', 'Specialization']

class AppointmentForm(forms.ModelForm):
    Appointment_ID = forms.CharField(disabled=True, required=False)
    Patient_ID = forms.ChoiceField(choices=[])
    Doctor_ID = forms.ChoiceField(choices=[])
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['Patient_ID'].choices = [(p.Patient_ID, f"{p.Patient_ID} - {p.name}") for p in PatientDetails.objects.all()]
        self.fields['Doctor_ID'].choices = [(d.Doctor_ID, f"{d.Doctor_ID} - {d.Full_Name}") for d in DoctorDetails.objects.all()]
    
    class Meta:
        model = AppointmentDetails
        fields = ['Appointment_ID', 'Patient_ID', 'Doctor_ID', 'Appointment_Date', 'Appointment_Time', 'Room_No', 'Bldg_No']