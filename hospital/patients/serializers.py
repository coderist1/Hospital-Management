from rest_framework import serializers
from .models import PatientDetails, DoctorDetails, AppointmentDetails

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientDetails
        fields = '__all__'
        read_only_fields = ['Patient_ID']

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorDetails
        fields = '__all__'
        read_only_fields = ['Doctor_ID']

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppointmentDetails
        fields = '__all__'
        read_only_fields = ['Appointment_ID']