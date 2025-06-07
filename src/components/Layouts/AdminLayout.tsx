import { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import { FiMenu } from 'react-icons/fi';

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen font-[Inter] relative">
      {/* Sidebar */}
      <div
        className={`
          fixed z-40 top-0 left-0 h-full bg-white shadow-lg transition-transform transform
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:shadow-none lg:block
        `}
      >
        <Sidebar />
      </div>

      {/* Overlay on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Topbar with mobile menu toggle */}
        <div className="lg:hidden bg-white shadow px-4 py-3 flex items-center justify-between">
          <button onClick={toggleSidebar}>
            <FiMenu size={24} />
          </button>
          <h1 className="text-lg font-semibold">Admin Panel</h1>
        </div>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
