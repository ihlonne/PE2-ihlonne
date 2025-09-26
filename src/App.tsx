import { Toaster } from './components/ui/toaster';

import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router';

import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Venue from './pages/venues/Venue';
import Venues from './pages/venues/Venues';
import Profile from './pages/Profile';
import CreateVenue from './pages/venues/CreateVenue';
import EditVenue from './pages/venues/EditVenue';
import NotFound from './pages/NotFound';

import ProtectedRoute from './routes/ProtectedRoute';

const App = function () {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Public routes */}
            <Route path='/' element={<Home />} />
            <Route
              path='/venues'
              element={<Venues />}
            />
            <Route
              path='/venues/venue/:id'
              element={<Venue />}
            />

            {/* Customer-only */}
            <Route
              path='/profile/:name'
              element={
                <ProtectedRoute requiredRole='customer'>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Manager-only */}
            <Route
              path='/venues/create'
              element={
                <ProtectedRoute requiredRole='manager'>
                  <CreateVenue />
                </ProtectedRoute>
              }
            />
            <Route
              path='/venues/edit/:id'
              element={
                <ProtectedRoute requiredRole='manager'>
                  <EditVenue />
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route
              path='*'
              element={<NotFound />}
            />
          </Routes>
        </Layout>
      </BrowserRouter>
      <Toaster />
    </>
  );
};

export default App;
