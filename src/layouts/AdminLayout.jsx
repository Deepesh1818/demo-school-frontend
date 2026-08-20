import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import {
  LayoutDashboard,
  Users,
  Backpack,
  CalendarCheck,
  Award,
  CreditCard,
  Bell,
  Clock,
  LogOut,
  Compass,
  BookOpen,
  Settings,
  GraduationCap,
  Sparkles,
  BookCheck,
  FolderOpen
} from 'lucide-react';

const sidebarLinks = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Students', href: '/admin/students', icon: Users },
  { name: 'Teachers', href: '/admin/teachers', icon: Backpack },
  { name: 'Classes', href: '/admin/classes', icon: GraduationCap },
  { name: 'Subjects', href: '/admin/subjects', icon: BookOpen },
  { name: 'Attendance', href: '/admin/attendance', icon: CalendarCheck },
  { name: 'Exam Results', href: '/admin/results', icon: Award },
  { name: 'Fees Invoices', href: '/admin/fees', icon: CreditCard },
  { name: 'Notice Board', href: '/admin/notices', icon: Bell },
  { name: 'School Events', href: '/admin/events', icon: Clock },
  { name: 'Admissions Desk', href: '/admin/admissions', icon: Compass },
  { name: 'Library Center', href: '/admin/library', icon: BookCheck },
  { name: 'Transport Hub', href: '/admin/transport', icon: FolderOpen },
  { name: 'Settings', href: '/admin/settings', icon: Settings }
];

export default function AdminLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex font-sans antialiased overflow-hidden">
      {/* SaaS Sidebar */}
      <aside
        className={`bg-white border-r border-slate-200 transition-all duration-300 flex flex-col justify-between z-30 ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div>
          {/* Sidebar Header Brand (Redirect to Homepage) */}
          <Link 
            to="/" 
            className="h-16 flex items-center px-5 border-b border-slate-200/60 justify-between hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              {!isSidebarCollapsed && (
                <div className="flex flex-col text-left">
                  <span className="text-sm font-extrabold tracking-tight text-slate-800 font-sans">GOSHEN</span>
                  <span className="text-[9px] text-blue-600 font-semibold tracking-wider font-sans uppercase">BACK TO SITE</span>
                </div>
              )}
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="p-4 flex flex-col gap-1.5 overflow-y-auto max-h-[calc(100vh-140px)] no-scrollbar">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.name}
                  to={link.href}
                  end={link.href === '/admin'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-3 rounded-lg text-[13px] font-medium transition-all ${
                      isActive
                        ? 'bg-blue-50/60 text-blue-600 border-l-2 border-blue-600'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  <Icon className="h-4.5 w-4.5 flex-shrink-0" />
                  {!isSidebarCollapsed && <span>{link.name}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer logout */}
        <div className="p-4 border-t border-slate-200/60">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-[13px] font-medium text-rose-600 hover:bg-rose-50 transition-all"
          >
            <LogOut className="h-4.5 w-4.5 flex-shrink-0" />
            {!isSidebarCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <div className="flex-grow flex flex-col h-screen overflow-hidden">
        {/* Workspace Topbar Header */}
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 flex-shrink-0 z-20 shadow-sm">
          {/* Collapse toggle */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="text-slate-500 hover:text-slate-800 text-[10px] font-bold tracking-widest border border-slate-200 px-3 py-1.5 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors"
          >
            {isSidebarCollapsed ? 'EXPAND' : 'COLLAPSE'}
          </button>

          {/* User Meta Controls */}
          <div className="flex items-center gap-4">
            {/* User Details */}
            <div className="text-right hidden sm:block">
              <span className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                {user?.profile?.name || user?.email?.split('@')[0]}
              </span>
              <span className="block text-[10px] text-brand-gold font-sans font-semibold uppercase tracking-widest">
                {user?.role} Account
              </span>
            </div>

            {/* Avatar Profile */}
            <div className="h-10 w-10 rounded-full border border-slate-200 bg-slate-100 flex items-center justify-center font-display font-semibold text-brand-navy">
              {(user?.email?.[0] || 'A').toUpperCase()}
            </div>
          </div>
        </header>

        {/* Dynamic Inner Panel View scroll container */}
        <main className="flex-grow p-8 overflow-y-auto bg-[#f8fafc] no-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
