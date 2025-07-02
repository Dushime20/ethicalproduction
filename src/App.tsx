import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import Layout from './components/Layout/Layout';
import AdminLayout from './pages/Admin/AdminLayout';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import VerifyEmail from './pages/Auth/VerifyEmail';
import BookingPage from './pages/Booking/BookingPage';
import MyBookings from './pages/Booking/MyBookings';
import Dashboard from './pages/Admin/Dashboard';
import BookingManagement from './pages/Admin/BookingManagement';
import GalleryManagement from './pages/Admin/GalleryManagement';
import ClientManagement from './pages/Admin/ClientManagement';

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/portfolio" element={<Layout><Portfolio /></Layout>} />
            <Route path="/services" element={<Layout><Services /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/register" element={<Layout><Register /></Layout>} />
            <Route path="/verify-email" element={<Layout><VerifyEmail /></Layout>} />
            
            {/* Client booking routes */}
            <Route path="/book" element={<Layout><BookingPage /></Layout>} />
            <Route path="/bookings" element={<Layout><MyBookings /></Layout>} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
            <Route path="/admin/bookings" element={<AdminLayout><BookingManagement /></AdminLayout>} />
            <Route path="/admin/gallery" element={<AdminLayout><GalleryManagement /></AdminLayout>} />
            <Route path="/admin/clients" element={<AdminLayout><ClientManagement /></AdminLayout>} />
          </Routes>
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;