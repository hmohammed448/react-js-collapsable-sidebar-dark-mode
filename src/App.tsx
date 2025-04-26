
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
import { cn } from "@/lib/utils";  // Add this import

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

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="min-h-screen flex bg-background text-foreground">
          <Sidebar />
          <div className={cn(
            "flex-1 flex flex-col transition-all duration-300",
            {
              "pl-20": isCollapsed,
              "pl-72": !isCollapsed,
              "pl-4": window.innerWidth < 768 // Mobile view
            }
          )}>
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
