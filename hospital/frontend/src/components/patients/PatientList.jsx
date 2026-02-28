import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

export default function PatientList() {
  const [patients, setPatients] = useState([]);

  const fetchPatients = () => {
    api.get('/patients/').then((res) => setPatients(res.data));
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      await api.delete(`/patients/${id}/`);
      fetchPatients();
    }
  };

  const genderBadge = (g) => {
    const colors = {
      Male: 'bg-blue-100 text-blue-700',
      Female: 'bg-pink-100 text-pink-700',
      Other: 'bg-purple-100 text-purple-700',
    };
    return colors[g] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Patients</h1>
          <p className="text-gray-500 mt-1">
            {patients.length} patient{patients.length !== 1 && 's'} registered
          </p>
        </div>
        <Link
          to="/patients/new"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-200 hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
        >
          <span className="text-lg leading-none">+</span> Add Patient
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-2xl">👥</div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
            <p className="text-sm text-gray-500">Total Patients</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-2xl">👨</div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{patients.filter(p => p.gender === 'Male').length}</p>
            <p className="text-sm text-gray-500">Male</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-pink-50 flex items-center justify-center text-2xl">👩</div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{patients.filter(p => p.gender === 'Female').length}</p>
            <p className="text-sm text-gray-500">Female</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-100">
          <thead>
            <tr className="bg-gray-50/80">
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Patient ID</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Gender</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {patients.map((p) => (
              <tr key={p.id} className="hover:bg-blue-50/40 transition-colors duration-150">
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-gray-100 text-xs font-mono font-semibold text-gray-600">
                    {p.Patient_ID}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                      {p.name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{p.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{p.age}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${genderBadge(p.gender)}`}>
                    {p.gender}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 font-mono">{p.phone}</td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-[200px] truncate">{p.address}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/patients/${p.id}/edit`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                    >
                      ✏️ Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {patients.length === 0 && (
              <tr>
                <td colSpan="7" className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-5xl">🏥</span>
                    <p className="text-gray-400 font-medium">No patients found</p>
                    <Link to="/patients/new" className="text-blue-600 text-sm font-semibold hover:underline">
                      Add your first patient →
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
