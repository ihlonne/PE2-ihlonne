import { Toaster } from './components/ui/toaster';

import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router';

import Layout from './components/Layout';
import Home from './pages/Home';
import Venue from './pages/venues/Venue';
import Venues from './pages/venues/Venues';
import Profile from './pages/Profile';
import CreateVenue from './pages/venues/CreateVenue';
import EditVenue from './pages/venues/EditVenue';

const App = function () {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/venues/venue/:id'
              element={<Venue />}
            />
            <Route
              path='/venues'
              element={<Venues />}
            />
            <Route
              path='/venues/create'
              element={<CreateVenue />}
            />
            <Route
              path='/venues/edit'
              element={<EditVenue />}
            />
            <Route
              path='/profile/:name'
              element={<Profile />}
            />
          </Routes>
        </Layout>
      </BrowserRouter>
      <Toaster />
    </>
  );
};

export default App;
