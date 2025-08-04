import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import Booking from './components/Booking';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/booking" element={<Booking />} />
    </Routes>
  );
}

export default App;
