import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import UserOnboardingPage from './pages/UserOnboardingPage';
import UserControlPage from './pages/UserControlPage';

const AuthGuard = ({children}) => {
  const access_token = localStorage.getItem('access_token');
  if (!access_token) {
    return <Navigate to="/login" />;
  }

  return children;
};

const AnynomousGuard = ({children}) => {
  const access_token = localStorage.getItem('access_token');

  if (access_token) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: 
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: 
        <AnynomousGuard>
          <LoginPage />
        </AnynomousGuard>,
    },
    {
      path: '/newstudent/:id',
      element: <UserOnboardingPage />,
    },
    {
      path: '/student/:id',
      element: <UserControlPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
