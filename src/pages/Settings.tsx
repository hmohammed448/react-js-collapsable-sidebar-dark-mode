
import { useTheme } from '@/components/ThemeProvider';
import { Moon, Sun } from 'lucide-react';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-card rounded-lg">
          <div>
            <h3 className="font-medium">Theme Preferences</h3>
            <p className="text-sm text-muted-foreground">Toggle between light and dark mode</p>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

