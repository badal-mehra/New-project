import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import VerifyCertificate from './pages/VerifyCertificate';
import MatrixBackground from './components/MatrixBackground';
import AIMentor from './components/AIMentor';
import { AuthProvider, useAuth } from './content/AuthContext';

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white relative">
      <MatrixBackground />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/verify-certificate" element={<VerifyCertificate />} />
        </Routes>
      </AnimatePresence>
      {user && <AIMentor />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;