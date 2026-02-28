import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = () => {
    api.get('/doctors/').then((res) => setDoctors(res.data));
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      await api.delete(`/doctors/${id}/`);
      fetchDoctors();
    }
  };

  const specColors = [
    'bg-emerald-100 text-emerald-700',
    'bg-violet-100 text-violet-700',
    'bg-amber-100 text-amber-700',
    'bg-cyan-100 text-cyan-700',
    'bg-rose-100 text-rose-700',
    'bg-teal-100 text-teal-700',
  ];
  const getSpecColor = (spec) => {
    if (!spec) return specColors[0];
    let hash = 0;
    for (const ch of spec) hash = ch.charCodeAt(0) + ((hash << 5) - hash);
    return specColors[Math.abs(hash) % specColors.length];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Doctors</h1>
          <p className="text-gray-500 mt-1">
            {doctors.length} doctor{doctors.length !== 1 && 's'} on staff
          </p>
        </div>
        <Link
          to="/doctors/new"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-emerald-200 hover:shadow-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200"
        >
          <span className="text-lg leading-none">+</span> Add Doctor
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center text-2xl">🩺</div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{doctors.length}</p>
            <p className="text-sm text-gray-500">Total Doctors</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-violet-50 flex items-center justify-center text-2xl">🔬</div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{new Set(doctors.map(d => d.Specialization)).size}</p>
            <p className="text-sm text-gray-500">Specializations</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-2xl">👨‍⚕️</div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{doctors.filter(d => d.Sex === 'Male').length}</p>
            <p className="text-sm text-gray-500">Male Doctors</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-100">
          <thead>
            <tr className="bg-gray-50/80">
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Doctor ID</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Sex</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Specialization</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {doctors.map((d) => (
              <tr key={d.id} className="hover:bg-emerald-50/40 transition-colors duration-150">
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-gray-100 text-xs font-mono font-semibold text-gray-600">
                    {d.Doctor_ID}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                      {d.Full_Name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{d.Full_Name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{d.Age}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${d.Sex === 'Male' ? 'bg-blue-100 text-blue-700' : d.Sex === 'Female' ? 'bg-pink-100 text-pink-700' : 'bg-purple-100 text-purple-700'}`}>
                    {d.Sex}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 font-mono">{d.ContactNumber}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getSpecColor(d.Specialization)}`}>
                    {d.Specialization}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/doctors/${d.id}/edit`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                    >
                      ✏️ Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(d.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {doctors.length === 0 && (
              <tr>
                <td colSpan="7" className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-5xl">🩺</span>
                    <p className="text-gray-400 font-medium">No doctors found</p>
                    <Link to="/doctors/new" className="text-emerald-600 text-sm font-semibold hover:underline">
                      Add your first doctor →
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
