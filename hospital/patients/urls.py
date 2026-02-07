from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'patients', views.PatientViewSet)
router.register(r'doctors', views.DoctorViewSet)
router.register(r'appointments', views.AppointmentViewSet)

urlpatterns = [
    path('', views.patient_list, name='home'),  # Root redirects to patient list
    path('api/', include(router.urls)),
    # Web URLs
    path('patients/', views.patient_list, name='patient_list'),
    path('patients/create/', views.patient_create, name='patient_create'),
    path('patients/<int:pk>/update/', views.patient_update, name='patient_update'),
    path('patients/<int:pk>/delete/', views.patient_delete, name='patient_delete'),

    path('doctors/', views.doctor_list, name='doctor_list'),
    path('doctors/create/', views.doctor_create, name='doctor_create'),
    path('doctors/<int:pk>/update/', views.doctor_update, name='doctor_update'),
    path('doctors/<int:pk>/delete/', views.doctor_delete, name='doctor_delete'),

    path('appointments/', views.appointment_list, name='appointment_list'),
    path('appointments/create/', views.appointment_create, name='appointment_create'),
    path('appointments/<int:pk>/update/', views.appointment_update, name='appointment_update'),
    path('appointments/<int:pk>/delete/', views.appointment_delete, name='appointment_delete'),
]