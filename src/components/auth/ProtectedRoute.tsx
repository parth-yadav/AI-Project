// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../../lib/auth';
// import { ReactNode } from 'react';

// interface ProtectedRouteProps {
//   children: ReactNode;
// }

// export default function ProtectedRoute({ children }: ProtectedRouteProps) {
//   const { user, isAdmin } = useAuth();

//   if (!user || !isAdmin) {
//     return <Navigate to="/login" replace />;
//   }

//   return <>{children}</>;
// }