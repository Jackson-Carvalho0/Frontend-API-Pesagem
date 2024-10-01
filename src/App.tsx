import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import Dashboard from './pages/Dashboard';
import TruckRegistration from './pages/TruckRegistration';
import TruckListPage from './pages/TruckListPage';

const App = () => {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<TruckRegistration />} />
        <Route path="/trucks" element={<TruckListPage />} />
      </Routes>
    </Router>
  );
};

export default App;
