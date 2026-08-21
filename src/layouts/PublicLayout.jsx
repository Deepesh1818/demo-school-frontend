import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, GraduationCap, LogOut, Layout } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import CursorGlow from '../components/common/CursorGlow';

const navigationLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Academics', href: '/academics' },
  { name: 'Results', href: '/results' },
  { name: 'Campus', href: '/campus' },
  { name: 'Faculty', href: '/faculty' },
  { name: 'Activities', href: '/activities' },
  { name: 'Admissions', href: '/admissions' },
  { name: 'Notices', href: '/notices' },
  { name: 'Contact', href: '/contact' }
];

export default function PublicLayout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleDashboardRedirect = () => {
    if (user?.role === 'admin' || user?.role === 'superadmin' || user?.role === 'teacher') {
      navigate('/admin');
    } else if (user?.role === 'student') {
      navigate('/student');
    } else if (user?.role === 'parent') {
      navigate('/parent');
    }
  };

  return (
    <div className="min-h-screen bg-brand-alabaster flex flex-col justify-between">
      <CursorGlow />
      {/* Premium Floating Header */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || location.pathname !== '/'
            ? 'py-3 bg-brand-navy/90 backdrop-blur-md shadow-lg border-b border-white/10' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-lg bg-brand-gold flex items-center justify-center transition-transform group-hover:scale-105">
              <GraduationCap className="h-6 w-6 text-brand-navy" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-wider font-display text-white">
                GOSHEN
              </span>
              <span className="block text-[9px] tracking-[0.25em] font-medium font-sans uppercase text-brand-gold">
                School of Excellence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navigationLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative font-sans text-sm font-medium tracking-wide transition-colors py-1 group ${
                    isActive 
                      ? 'text-brand-gold' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive ? (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-gold"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  ) : (
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User CTA Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDashboardRedirect}
                  className="px-4 py-2 rounded-lg bg-brand-gold text-brand-navy text-xs font-semibold uppercase tracking-wider flex items-center gap-2 hover:bg-brand-goldlight transition-all luxury-shadow"
                >
                  <Layout className="h-4 w-4" /> Dashboard
                </button>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg border border-white/10 hover:bg-white/5 text-white transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all bg-brand-gold text-brand-navy hover:bg-brand-goldlight"
              >
                Portal Login <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-brand-gold transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-brand-navy z-40 pt-24 pb-12 px-6 shadow-2xl overflow-y-auto lg:hidden flex flex-col"
          >
            <div className="flex flex-col gap-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-lg font-medium tracking-wide py-2 border-b border-white/5 ${
                    location.pathname === link.href ? 'text-brand-gold' : 'text-white/70'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={handleDashboardRedirect}
                      className="w-full py-3 bg-brand-gold text-brand-navy font-semibold text-sm rounded-lg text-center flex items-center justify-center gap-2"
                    >
                      <Layout className="h-4 w-4" /> Go to Dashboard
                    </button>
                    <button
                      onClick={logout}
                      className="w-full py-3 bg-white/5 border border-white/10 text-white font-semibold text-sm rounded-lg text-center"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="w-full py-3 bg-brand-gold text-brand-navy font-semibold text-sm rounded-lg text-center flex items-center justify-center gap-1.5"
                  >
                    Portal Login <ArrowUpRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Pages Content Router Outlet */}
      <main className="flex-grow pt-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Premium Footer */}
      <footer className="bg-brand-navy text-white pt-16 pb-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-brand-gold flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-brand-navy" />
              </div>
              <span className="text-xl font-bold tracking-wider font-display text-white">GOSHEN</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Built on academic rigor, character building, technological innovation, and self-confidence. Shaping future leaders since 2001.
            </p>
            <div className="text-[10px] tracking-wider text-brand-gold">
              CBSE ACCREDITED SCHOOL (AFFILIATION NO. 2730101)
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-brand-gold mb-5 font-sans">Explore</h4>
            <ul className="flex flex-col gap-3 text-xs text-slate-400">
              <li><Link to="/about" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 inline-block">History & Mission</Link></li>
              <li><Link to="/academics" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 inline-block">Academics Curriculum</Link></li>
              <li><Link to="/results" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 inline-block">Board Toppers</Link></li>
              <li><Link to="/campus" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 inline-block">Campus Facilities</Link></li>
              <li><Link to="/faculty" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 inline-block">Our Educators</Link></li>
            </ul>
          </div>

          {/* Portals Link */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-brand-gold mb-5 font-sans">Admissions & Portals</h4>
            <ul className="flex flex-col gap-3 text-xs text-slate-400">
              <li><Link to="/admissions" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 inline-block">Apply Online</Link></li>
              <li><Link to="/login" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 inline-block">Student Portal</Link></li>
              <li><Link to="/login" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 inline-block">Parent Portal</Link></li>
              <li><Link to="/admin/login" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 inline-block">Administration Console</Link></li>
              <li><Link to="/contact" className="hover:text-white hover:translate-x-1.5 transition-all duration-300 inline-block">Help & Enquiries</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-brand-gold mb-5 font-sans">Contact Details</h4>
            <address className="not-italic text-xs text-slate-400 flex flex-col gap-3">
              <span>Goshen Campus, Rohini Sector-24, New Delhi, Pin-110085</span>
              <span>Admissions desk: +91 (011) 2701 4321</span>
              <span>General desk: office@goshenschool.demo</span>
            </address>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Goshen School. All Rights Reserved. Designed as a premium MERN demonstration platform.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
