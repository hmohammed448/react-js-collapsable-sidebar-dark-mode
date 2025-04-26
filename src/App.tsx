
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { Toaster } from "sonner";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('sidebarCollapsed');
      setIsCollapsed(saved ? JSON.parse(saved) : false);
    };

    // Update content padding when sidebar state changes
    window.addEventListener('storage', handleStorageChange);
    
    // Listen for custom event from sidebar component
    const handleSidebarToggle = (e: CustomEvent) => {
      setIsCollapsed(e.detail.isCollapsed);
    };
    
    window.addEventListener('sidebarToggle', handleSidebarToggle as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('sidebarToggle', handleSidebarToggle as EventListener);
    };
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="min-h-screen flex bg-background text-foreground">
          <Sidebar />
          <div 
            className={cn(
              "flex-1 flex flex-col transition-all duration-300",
              {
                "md:ml-16": isCollapsed, // 16 = 4rem (64px) collapsed width
                "md:ml-64": !isCollapsed, // 64 = 16rem (256px) expanded width
                "ml-0": true // Default for mobile
              }
            )}
          >
            <main className="flex-1 p-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
