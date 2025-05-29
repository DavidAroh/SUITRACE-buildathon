// src/screens/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { getUserRole } from '../lib/auth';

interface ProtectedRouteProps {
  role: 'admin' | 'user';
  children: JSX.Element;
}

export const ProtectedRoute = ({ role, children }: ProtectedRouteProps) => {
  const userRole = getUserRole();

  if (!userRole) return <Navigate to="/" />;
  if (userRole !== role) return <Navigate to={`/${userRole}/dashboard`} />;

  return children;
};

export default ProtectedRoute;
