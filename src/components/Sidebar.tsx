
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Home, Book, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProfileDropdown } from './ProfileDropdown';
import { useIsMobile } from '@/hooks/use-mobile';

const SIDEBAR_STATE_KEY = 'sidebarCollapsed';

const Sidebar = () => {
  // Initialize from localStorage, defaulting to false if no value exists
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem(SIDEBAR_STATE_KEY);
    return saved ? JSON.parse(saved) : false;
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isMobile = useIsMobile();

  // Update localStorage and notify app when isCollapsed changes
  useEffect(() => {
    localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(isCollapsed));
    
    // Dispatch custom event for App component to listen to
    const event = new CustomEvent('sidebarToggle', { 
      detail: { isCollapsed } 
    });
    window.dispatchEvent(event);
    
  }, [isCollapsed]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      if (isMobile && isMobileOpen && sidebar && !sidebar.contains(event.target as Node)) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isMobileOpen]);

  const navigationItems = [
    { title: 'Home', icon: Home, path: '/' },
    { title: 'About', icon: Book, path: '/about' },
    { title: 'Settings', icon: Settings, path: '/settings' },
  ];

  const sidebarClasses = cn(
    "fixed top-0 h-screen bg-background border-r transition-all duration-300 ease-in-out flex flex-col z-30",
    {
      // Desktop view (>= 768px)
      "md:w-64": !isCollapsed,
      "md:w-16": isCollapsed,
      // Mobile view (< 768px)
      "w-64": isMobile,
      "left-0": isMobileOpen || !isMobile,
      "-left-64": !isMobileOpen && isMobile,
    }
  );

  return (
    <>
      {/* Mobile Menu Toggle */}
      {isMobile && (
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="fixed top-4 left-4 z-40 p-2 bg-background border rounded-md md:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
      )}

      {/* Sidebar */}
      <div id="sidebar" className={sidebarClasses}>
        <div className="flex flex-col h-full">
          {/* Collapse Toggle (Desktop only) */}
          {!isMobile && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="absolute -right-3 top-6 bg-primary text-primary-foreground rounded-full p-1 z-50 hidden md:block"
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          )}

          {/* Header */}
          <div className="flex items-center p-4 gap-4 border-b">
            <img 
              src="/lovable-uploads/3d4dd8a5-8d5b-45fc-9256-6753d1b4606b.png" 
              alt="Logo"
              className="h-8 w-8 object-contain"
            />
            {(!isCollapsed || isMobile) && <span className="font-semibold">Platform</span>}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
                onClick={() => isMobile && setIsMobileOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {(!isCollapsed || isMobile) && <span>{item.title}</span>}
              </Link>
            ))}
          </nav>

          {/* Footer with Profile - now inside the flex column */}
          <div className="border-t p-2 mt-auto">
            <ProfileDropdown />
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobile && isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
