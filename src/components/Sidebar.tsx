
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Home, Book, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProfileDropdown } from './ProfileDropdown';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    { title: 'Home', icon: Home, path: '/' },
    { title: 'About', icon: Book, path: '/about' },
    { title: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div className={cn(
      "fixed left-0 top-0 h-screen bg-background border-r transition-all duration-300 ease-in-out flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-primary text-primary-foreground rounded-full p-1 z-50"
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
      
      <div className="flex items-center p-4 gap-4 border-b">
        <img 
          src="/lovable-uploads/3d4dd8a5-8d5b-45fc-9256-6753d1b4606b.png" 
          alt="Logo"
          className="h-8 w-8 object-contain"
        />
        {!isCollapsed && <span className="font-semibold">Platform</span>}
      </div>

      <nav className="flex-1 px-2 py-4">
        {navigationItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
          >
            <item.icon className="h-5 w-5" />
            {!isCollapsed && <span>{item.title}</span>}
          </Link>
        ))}
      </nav>

      <div className="border-t p-2">
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default Sidebar;
