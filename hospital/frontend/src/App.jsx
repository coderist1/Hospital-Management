import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PatientList from './components/patients/PatientList';
import PatientForm from './components/patients/PatientForm';
import DoctorList from './components/doctors/DoctorList';
import DoctorForm from './components/doctors/DoctorForm';
import AppointmentList from './components/appointments/AppointmentList';
import AppointmentForm from './components/appointments/AppointmentForm';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Patients */}
        <Route path="/" element={<PatientList />} />
        <Route path="/patients/new" element={<PatientForm />} />
        <Route path="/patients/:id/edit" element={<PatientForm />} />

        {/* Doctors */}
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/doctors/new" element={<DoctorForm />} />
        <Route path="/doctors/:id/edit" element={<DoctorForm />} />

        {/* Appointments */}
        <Route path="/appointments" element={<AppointmentList />} />
        <Route path="/appointments/new" element={<AppointmentForm />} />
        <Route path="/appointments/:id/edit" element={<AppointmentForm />} />
      </Route>
    </Routes>
  );
}

export default App;
