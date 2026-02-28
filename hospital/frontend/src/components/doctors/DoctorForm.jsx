import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api';

const sexOptions = ['Male', 'Female', 'Other'];

export default function DoctorForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    Full_Name: '',
    Address: '',
    Age: '',
    Sex: 'Male',
    ContactNumber: '',
    Specialization: '',
  });

  useEffect(() => {
    if (isEdit) {
      api.get(`/doctors/${id}/`).then((res) => setForm(res.data));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      Full_Name: form.Full_Name,
      Address: form.Address,
      Age: Number(form.Age),
      Sex: form.Sex,
      ContactNumber: form.ContactNumber,
      Specialization: form.Specialization,
    };

    if (isEdit) {
      await api.put(`/doctors/${id}/`, payload);
    } else {
      await api.post('/doctors/', payload);
    }
    navigate('/doctors');
  };

  const inputClass =
    'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white transition-all duration-200';

  return (
    <div className="max-w-xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
        <button onClick={() => navigate('/doctors')} className="hover:text-emerald-600 transition-colors">Doctors</button>
        <span>/</span>
        <span className="text-gray-700 font-medium">{isEdit ? 'Edit' : 'New'}</span>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-5">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <span>{isEdit ? '✏️' : '➕'}</span>
            {isEdit ? 'Edit Doctor' : 'Add New Doctor'}
          </h1>
          <p className="text-emerald-200 text-sm mt-1">Fill in the doctor's details below</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">👤 Full Name</label>
            <input
              name="Full_Name"
              value={form.Full_Name}
              onChange={handleChange}
              required
              placeholder="Dr. John Doe"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">🎂 Age</label>
              <input
                name="Age"
                type="number"
                value={form.Age}
                onChange={handleChange}
                required
                placeholder="e.g. 45"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">⚧ Sex</label>
              <select
                name="Sex"
                value={form.Sex}
                onChange={handleChange}
                className={inputClass}
              >
                {sexOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">📞 Contact Number</label>
            <input
              name="ContactNumber"
              value={form.ContactNumber}
              onChange={handleChange}
              required
              placeholder="e.g. 09123456789"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">🔬 Specialization</label>
            <input
              name="Specialization"
              value={form.Specialization}
              onChange={handleChange}
              required
              placeholder="e.g. Cardiology"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">📍 Address</label>
            <textarea
              name="Address"
              value={form.Address}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Full address"
              className={inputClass}
            />
          </div>

          <div className="flex gap-3 pt-3 border-t border-gray-100">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-emerald-200 hover:shadow-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200"
            >
              {isEdit ? '💾 Update Doctor' : '✅ Create Doctor'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/doctors')}
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
