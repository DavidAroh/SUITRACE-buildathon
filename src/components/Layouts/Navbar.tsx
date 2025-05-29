// src/components/Layout/Navbar.tsx
import { Link } from 'react-router-dom';
import { getUserRole } from '../../lib/auth';

const Navbar = () => {
  const role = getUserRole();

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between">
      <h1 className="text-lg font-bold text-blue-600">SuiTrace</h1>
      <div className="space-x-4">
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
        <Link to="/shipments" className="text-gray-700 hover:text-blue-600">Shipments</Link>
        <Link to="/tracking" className="text-gray-700 hover:text-blue-600">Tracking</Link>
        {role === 'admin' && (
          <Link to="/admin" className="text-gray-700 hover:text-blue-600">Admin Panel</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
