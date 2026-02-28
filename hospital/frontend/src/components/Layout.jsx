import { Link, Outlet, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Patients', icon: '👤' },
  { to: '/doctors', label: 'Doctors', icon: '🩺' },
  { to: '/appointments', label: 'Appointments', icon: '📅' },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-800 via-blue-700 to-indigo-800 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-0 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 py-4 group">
            <span className="text-3xl group-hover:scale-110 transition-transform">🏥</span>
            <div>
              <h1 className="text-xl font-bold tracking-tight leading-tight">Hospital Management</h1>
              <p className="text-blue-200 text-xs font-medium">Patient Care System</p>
            </div>
          </Link>
          <div className="flex gap-1">
            {navItems.map((item) => {
              const isActive =
                item.to === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-2 px-4 py-5 text-sm font-semibold border-b-3 transition-all duration-200 ${
                    isActive
                      ? 'border-white bg-white/10 text-white'
                      : 'border-transparent hover:bg-white/5 hover:border-blue-300 text-blue-100 hover:text-white'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Page content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-400">
          &copy; 2026 Hospital Management System. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
