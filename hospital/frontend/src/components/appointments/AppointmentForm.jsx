import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api';

export default function AppointmentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    Patient_ID: '',
    Doctor_ID: '',
    Appointment_Date: '',
    Appointment_Time: '',
    Room_No: '',
    Bldg_No: '',
  });

  useEffect(() => {
    if (isEdit) {
      api.get(`/appointments/${id}/`).then((res) => setForm(res.data));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      Patient_ID: form.Patient_ID,
      Doctor_ID: form.Doctor_ID,
      Appointment_Date: form.Appointment_Date,
      Appointment_Time: form.Appointment_Time,
      Room_No: form.Room_No,
      Bldg_No: form.Bldg_No,
    };

    if (isEdit) {
      await api.put(`/appointments/${id}/`, payload);
    } else {
      await api.post('/appointments/', payload);
    }
    navigate('/appointments');
  };

  const inputClass =
    'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent focus:bg-white transition-all duration-200';

  return (
    <div className="max-w-xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
        <button onClick={() => navigate('/appointments')} className="hover:text-violet-600 transition-colors">Appointments</button>
        <span>/</span>
        <span className="text-gray-700 font-medium">{isEdit ? 'Edit' : 'New'}</span>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-5">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <span>{isEdit ? '✏️' : '➕'}</span>
            {isEdit ? 'Edit Appointment' : 'Schedule Appointment'}
          </h1>
          <p className="text-violet-200 text-sm mt-1">Fill in the appointment details below</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">👤 Patient ID</label>
              <input
                name="Patient_ID"
                value={form.Patient_ID}
                onChange={handleChange}
                required
                placeholder="e.g. PAT-001"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">🩺 Doctor ID</label>
              <input
                name="Doctor_ID"
                value={form.Doctor_ID}
                onChange={handleChange}
                required
                placeholder="e.g. DOC-001"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">📅 Date</label>
              <input
                name="Appointment_Date"
                type="date"
                value={form.Appointment_Date}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">🕐 Time</label>
              <input
                name="Appointment_Time"
                type="time"
                value={form.Appointment_Time}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">🚪 Room No.</label>
              <input
                name="Room_No"
                value={form.Room_No}
                onChange={handleChange}
                required
                placeholder="e.g. 101"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">🏢 Building No.</label>
              <input
                name="Bldg_No"
                value={form.Bldg_No}
                onChange={handleChange}
                required
                placeholder="e.g. A"
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-3 border-t border-gray-100">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-violet-200 hover:shadow-xl hover:from-violet-700 hover:to-purple-700 transition-all duration-200"
            >
              {isEdit ? '💾 Update Appointment' : '✅ Schedule Appointment'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/appointments')}
              className="px-6 py-2.5 rounded-xl font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
