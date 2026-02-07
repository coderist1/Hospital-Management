from django.shortcuts import render, get_object_or_404, redirect
from rest_framework import viewsets
from .models import PatientDetails, DoctorDetails, AppointmentDetails
from .forms import PatientForm, DoctorForm, AppointmentForm
from .serializers import PatientSerializer, DoctorSerializer, AppointmentSerializer

# DRF ViewSets
class PatientViewSet(viewsets.ModelViewSet):
    queryset = PatientDetails.objects.all()
    serializer_class = PatientSerializer

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = DoctorDetails.objects.all()
    serializer_class = DoctorSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = AppointmentDetails.objects.all()
    serializer_class = AppointmentSerializer

# Web Views (keeping for HTML interface)
def patient_list(request):
    patients = PatientDetails.objects.all()
    return render(request, 'patients/patient_list.html', {'patients': patients})

def patient_create(request):
    if request.method == 'POST':
        form = PatientForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('patient_list')
    else:
        form = PatientForm()
    return render(request, 'patients/patient_form.html', {'form': form})

def patient_update(request, pk):
    patient = get_object_or_404(PatientDetails, pk=pk)
    if request.method == 'POST':
        form = PatientForm(request.POST, instance=patient)
        if form.is_valid():
            form.save()
            return redirect('patient_list')
    else:
        form = PatientForm(instance=patient)
    return render(request, 'patients/patient_form.html', {'form': form})

def patient_delete(request, pk):
    patient = get_object_or_404(PatientDetails, pk=pk)
    if request.method == 'POST':
        patient.delete()
        return redirect('patient_list')
    return render(request, 'patients/patient_confirm_delete.html', {'patient': patient})

# Doctor Web Views
def doctor_list(request):
    doctors = DoctorDetails.objects.all()
    return render(request, 'patients/doctor_list.html', {'doctors': doctors})

def doctor_create(request):
    if request.method == 'POST':
        form = DoctorForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('doctor_list')
    else:
        form = DoctorForm()
    return render(request, 'patients/doctor_form.html', {'form': form})

def doctor_update(request, pk):
    doctor = get_object_or_404(DoctorDetails, pk=pk)
    if request.method == 'POST':
        form = DoctorForm(request.POST, instance=doctor)
        if form.is_valid():
            form.save()
            return redirect('doctor_list')
    else:
        form = DoctorForm(instance=doctor)
    return render(request, 'patients/doctor_form.html', {'form': form})

def doctor_delete(request, pk):
    doctor = get_object_or_404(DoctorDetails, pk=pk)
    if request.method == 'POST':
        doctor.delete()
        return redirect('doctor_list')
    return render(request, 'patients/doctor_confirm_delete.html', {'doctor': doctor})

# Appointment Web Views
def appointment_list(request):
    appointments = AppointmentDetails.objects.all()
    return render(request, 'patients/appointment_list.html', {'appointments': appointments})

def appointment_create(request):
    if request.method == 'POST':
        form = AppointmentForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('appointment_list')
    else:
        form = AppointmentForm()
    return render(request, 'patients/appointment_form.html', {'form': form})

def appointment_update(request, pk):
    appointment = get_object_or_404(AppointmentDetails, pk=pk)
    if request.method == 'POST':
        form = AppointmentForm(request.POST, instance=appointment)
        if form.is_valid():
            form.save()
            return redirect('appointment_list')
    else:
        form = AppointmentForm(instance=appointment)
    return render(request, 'patients/appointment_form.html', {'form': form})

def appointment_delete(request, pk):
    appointment = get_object_or_404(AppointmentDetails, pk=pk)
    if request.method == 'POST':
        appointment.delete()
        return redirect('appointment_list')
    return render(request, 'patients/appointment_confirm_delete.html', {'appointment': appointment})
