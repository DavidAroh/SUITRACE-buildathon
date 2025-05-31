import { ReactNode } from 'react';
import Sidebar from './Sidebar';

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen font-[Inter]">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;
