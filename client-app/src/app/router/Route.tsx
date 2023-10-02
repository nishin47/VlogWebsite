import ActivityDetails from '../../features/activities/details/ActivityDetails';
import NotFound from '../../features/errors/NotFound';
import PrivacyPolicyPage from '../../features/activities/Static/PrivacyPolicyPage';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import App from '../layout/App';
import LoginHome from '../../features/users/LoginHome';
import RegisterHome from '../../features/users/RegisterHome';
import DvisaSample from '../../features/activities/Static/DvisaSample';
import Dvisa from '../../features/users/Dvisa';
import RequireAuth from './RequireAuth';
import ConfirmPasswordHome from '../../features/users/ConfirmPasswordHome';
import LandingPage from '../../features/home/LandingPage';
import ErrorBoundary from '../layout/ErrorBoundary';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <ErrorBoundary>
                  <App />
               </ErrorBoundary>,
        children: [
            {
                element: <RequireAuth />, children: [

                    { path: 'dvisa', element: <Dvisa /> },
                    { path: 'activities', element: <ActivityDashboard /> },
                    { path: 'activities/:id', element: <ActivityDetails /> },

                ]
            },
            { path: '/', element: <LandingPage /> },
            { path: 'register', element: <RegisterHome /> },
            { path: 'privacy', element: <PrivacyPolicyPage /> },
            { path: 'changepwd', element: <ConfirmPasswordHome /> },
            { path: 'login', element: <LoginHome /> },
            { path: 'about', element: <DvisaSample /> },
            { path: 'server-error', element: <NotFound /> },
            { path: 'not-found', element: <NotFound /> },
            { path: '*', element: <Navigate replace to='/not-found' /> },
        ]
    }]

export const router = createBrowserRouter(routes);