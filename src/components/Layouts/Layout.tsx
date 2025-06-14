// src/components/Layout/Layout.tsx
import { ReactNode } from 'react';
import Navbar from './Navbar';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-100 font-[Inter]">
      <Navbar />
      <main >{children}</main>
    </div>
  );
};

export default Layout;
