import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Homepage from "./Components/homepage";
import Turfs from "./Components/turfs";
import Bookings from "./Components/booking";
import Booking from "./Components/bookform";
import Login from "./Components/login";
import Register from "./Components/register";
import AdminLogin from "./Components/adminLogin";
import AdminDashboard from "./Components/adminDBoard";
import Ticket from "./Components/ticket";



function App() {
  return (
    <BrowserRouter>


      {/* Routes */}
      <Routes>

        <Route path="/" element={<Homepage />} />

        <Route path="/turfs" element={<Turfs />} />

        <Route path="/bookings" element={<Bookings />} />

        <Route path="/login" element={<Login />} />

        <Route path="/booking" element={<Booking />} />

        <Route path="/register" element={<Register />} />

        <Route path="/admin-login" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/ticket" element={<Ticket />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;