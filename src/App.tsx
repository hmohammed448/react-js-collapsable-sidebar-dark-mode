
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { Toaster } from "sonner";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="min-h-screen flex bg-background text-foreground">
          <Sidebar />
          <div className="flex-1 flex flex-col pl-4 md:pl-20">
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
