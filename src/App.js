import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Booking from "./components/Booking";
import  MyContext  from "./context";
import{ useState } from "react";

function App() {
   const [bookings, insertBookings] = useState([]);

  return (
    <MyContext.Provider value={{ bookings, insertBookings }}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/booking" element={<Booking />} />
    </Routes>
    </MyContext.Provider>
  );
}

export default App;
