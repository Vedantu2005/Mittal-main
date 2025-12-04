import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, BookOpen, LayoutDashboard, FileText, GraduationCap } from 'lucide-react';

const Sidebar = ({ setIsAdminLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    // { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/blogs', label: 'Blog', icon: BookOpen },
    // Add other items to match the screenshot if needed:
    // { path: '/admin/course', label: 'Course', icon: GraduationCap },
    // { path: '/admin/research', label: 'Research', icon: FileText },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    if (setIsAdminLoggedIn) setIsAdminLoggedIn(false);
    navigate('/admin');
  };

  return (
    <div 
      className={`
        fixed left-0 top-0 h-screen 
        bg-[#561C24] text-white 
        transition-all duration-300 z-50 
        ${isOpen ? 'w-64' : 'w-20'}
        shadow-2xl
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        {isOpen && (
          <h2 className="text-2xl font-bold tracking-wide animate-fade-in">
            Admin Panel
          </h2>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 cursor-pointer hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.includes(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-4 px-6 py-4 transition-all duration-200
                border-l-4
                ${isActive 
                  ? 'bg-black/20 border-white text-white' 
                  : 'border-transparent text-white/70 hover:bg-white/5 hover:text-white'
                }
              `}
            >
              <Icon size={22} strokeWidth={1.5} className="flex-shrink-0" />
              
              {isOpen && (
                <span className="whitespace-nowrap font-medium text-lg tracking-wide">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-white/10">
        <button
          onClick={handleLogout}
          className={`
            w-full flex items-center gap-3 px-4 py-3 rounded-xl
            border border-white/20 hover:bg-white/10 transition-all
            ${isOpen ? 'justify-center' : 'justify-center'}
          `}
        >
          <LogOut size={20} className="text-white/90" />
          {isOpen && <span className="font-semibold text-white/90">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;