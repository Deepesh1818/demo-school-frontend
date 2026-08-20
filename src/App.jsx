import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Public Marketing Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Academics from './pages/public/Academics';
import Results from './pages/public/Results';
import Campus from './pages/public/Campus';
import Faculty from './pages/public/Faculty';
import Activities from './pages/public/Activities';
import Admissions from './pages/public/Admissions';
import Notices from './pages/public/Notices';
import Contact from './pages/public/Contact';
import Login from './pages/public/Login';

// Portal layouts & dashboards
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import StudentDashboard from './pages/student/StudentDashboard';
import ParentDashboard from './pages/parent/ParentDashboard';

// Admin Sub-modules
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentsList from './pages/admin/StudentsList';
import TeachersList from './pages/admin/TeachersList';
import ClassesList from './pages/admin/ClassesList';
import SubjectsList from './pages/admin/SubjectsList';
import MarkAttendance from './pages/admin/MarkAttendance';
import UploadResults from './pages/admin/UploadResults';
import FeesManager from './pages/admin/FeesManager';
import NoticeCMS from './pages/admin/NoticeCMS';
import EventCMS from './pages/admin/EventCMS';
import EnquiriesBoard from './pages/admin/EnquiriesBoard';
import TransportTracker from './pages/admin/TransportTracker';
import LibraryCMS from './pages/admin/LibraryCMS';
import SettingsView from './pages/admin/SettingsView';

// Protected Route components
const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, isLoading, user } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-navy flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-gold"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const { checkAuth, isLoading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-navy flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-gold"></div>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Standalone Login Gates (No Header/Footer Clash) */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<Login />} />

        {/* Public Website Flow */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/results" element={<Results />} />
          <Route path="/achievements" element={<Home />} /> {/* Redirect to home timeline */}
          <Route path="/campus" element={<Campus />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Student Portal Protected Route */}
        <Route element={<ProtectedRoute allowedRoles={['student']} />}>
          <Route path="/student" element={<StudentDashboard />} />
        </Route>

        {/* Parent Portal Protected Route */}
        <Route element={<ProtectedRoute allowedRoles={['parent']} />}>
          <Route path="/parent" element={<ParentDashboard />} />
        </Route>

        {/* Admin Dashboard SaaS Layout protected Flow */}
        <Route element={<ProtectedRoute allowedRoles={['admin', 'superadmin', 'teacher']} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/students" element={<StudentsList />} />
            <Route path="/admin/teachers" element={<TeachersList />} />
            <Route path="/admin/classes" element={<ClassesList />} />
            <Route path="/admin/subjects" element={<SubjectsList />} />
            <Route path="/admin/attendance" element={<MarkAttendance />} />
            <Route path="/admin/results" element={<UploadResults />} />
            <Route path="/admin/fees" element={<FeesManager />} />
            <Route path="/admin/notices" element={<NoticeCMS />} />
            <Route path="/admin/events" element={<EventCMS />} />
            <Route path="/admin/admissions" element={<EnquiriesBoard />} />
            <Route path="/admin/enquiries" element={<EnquiriesBoard />} />
            <Route path="/admin/transport" element={<TransportTracker />} />
            <Route path="/admin/library" element={<LibraryCMS />} />
            <Route path="/admin/settings" element={<SettingsView />} />
          </Route>
        </Route>

        {/* Catch All Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
