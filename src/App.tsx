import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import { Toaster } from './components/ui/toaster';

const App = function () {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      <Toaster />
    </>
  );
};

export default App;
