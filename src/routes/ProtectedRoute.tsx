import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: 'customer' | 'manager';
};

const ProtectedRoute = ({
  children,
  requiredRole,
}: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  if (
    requiredRole === 'manager' &&
    !user.venueManager
  ) {
    return <Navigate to='/' replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
