from django.db import models
import uuid

class PatientDetails(models.Model):
    Patient_ID = models.CharField(max_length=20, unique=True, blank=True)
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')])
    phone = models.CharField(max_length=15)
    address = models.TextField()

    def save(self, *args, **kwargs):
        if not self.Patient_ID:
            self.Patient_ID = f"P{uuid.uuid4().hex[:8].upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class DoctorDetails(models.Model):
    Doctor_ID = models.CharField(max_length=20, unique=True, blank=True)
    Full_Name = models.CharField(max_length=100, default='Unknown')
    Address = models.TextField(default='')
    Age = models.IntegerField(default=0)
    Sex = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], default='Male')
    ContactNumber = models.CharField(max_length=15, default='')
    Specialization = models.CharField(max_length=100, default='General')

    def save(self, *args, **kwargs):
        if not self.Doctor_ID:
            self.Doctor_ID = f"D{uuid.uuid4().hex[:8].upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return self.Full_Name

class AppointmentDetails(models.Model):
    Appointment_ID = models.CharField(max_length=20, unique=True, blank=True)
    Patient_ID = models.CharField(max_length=20, default='')
    Doctor_ID = models.CharField(max_length=20, default='')
    Appointment_Date = models.DateField(default='2026-01-01')
    Appointment_Time = models.TimeField(default='09:00')
    Room_No = models.CharField(max_length=10, default='')
    Bldg_No = models.CharField(max_length=10, default='')

    def save(self, *args, **kwargs):
        if not self.Appointment_ID:
            self.Appointment_ID = f"A{uuid.uuid4().hex[:8].upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Appointment {self.Appointment_ID}"
