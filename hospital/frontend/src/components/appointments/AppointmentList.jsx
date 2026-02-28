import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = () => {
    api.get('/appointments/').then((res) => setAppointments(res.data));
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      await api.delete(`/appointments/${id}/`);
      fetchAppointments();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Appointments</h1>
          <p className="text-gray-500 mt-1">
            {appointments.length} appointment{appointments.length !== 1 && 's'} scheduled
          </p>
        </div>
        <Link
          to="/appointments/new"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-violet-200 hover:shadow-xl hover:from-violet-700 hover:to-purple-700 transition-all duration-200"
        >
          <span className="text-lg leading-none">+</span> Add Appointment
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-violet-100 flex items-center justify-center text-2xl">📅</div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
            <p className="text-sm text-gray-500">Total Appointments</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center text-2xl">🏢</div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{new Set(appointments.map(a => a.Bldg_No)).size}</p>
            <p className="text-sm text-gray-500">Buildings</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-cyan-50 flex items-center justify-center text-2xl">🚪</div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{new Set(appointments.map(a => a.Room_No)).size}</p>
            <p className="text-sm text-gray-500">Rooms Used</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-100">
          <thead>
            <tr className="bg-gray-50/80">
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Appt ID</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Patient ID</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Doctor ID</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Room</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Building</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {appointments.map((a) => (
              <tr key={a.id} className="hover:bg-violet-50/40 transition-colors duration-150">
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-violet-100 text-xs font-mono font-semibold text-violet-700">
                    {a.Appointment_ID}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-blue-50 text-xs font-mono font-semibold text-blue-600">
                    {a.Patient_ID}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-emerald-50 text-xs font-mono font-semibold text-emerald-600">
                    {a.Doctor_ID}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-sm text-gray-700">
                    <span>📅</span> {a.Appointment_Date}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-sm text-gray-700">
                    <span>🕐</span> {a.Appointment_Time}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-amber-100 text-xs font-semibold text-amber-700">
                    Room {a.Room_No}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-cyan-100 text-xs font-semibold text-cyan-700">
                    Bldg {a.Bldg_No}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/appointments/${a.id}/edit`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                    >
                      ✏️ Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr>
                <td colSpan="8" className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-5xl">📅</span>
                    <p className="text-gray-400 font-medium">No appointments found</p>
                    <Link to="/appointments/new" className="text-violet-600 text-sm font-semibold hover:underline">
                      Schedule your first appointment →
                    </Link>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
