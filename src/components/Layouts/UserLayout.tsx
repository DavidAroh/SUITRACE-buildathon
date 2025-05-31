import { ReactNode } from 'react';
import Navbar from './Navbar';

export const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-100 font-[Inter]">
      <Navbar />
      <main className='overflow-auto'>{children}</main>
    </div>
  );
};

export default UserLayout;
