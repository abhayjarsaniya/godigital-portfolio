import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, MessageSquare, FolderPlus, DollarSign, 
  Menu, LogOut, ArrowLeft, X, Globe
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { GalaxyButton } from '@/components/ui/galaxy-button';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { isAuthenticated, login, logout, inquiries } = useAdmin();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(loginPassword)) {
      setLoginError('');
    } else {
      setLoginError('Invalid password');
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="grain-overlay" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              <span className="text-gradient">GO</span>
              <span className="text-foreground">DIGITAL</span>
            </h1>
            <p className="text-muted-foreground text-sm">Admin Dashboard</p>
          </div>
          
          <div className="glass-card rounded-xl p-6 md:p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                />
                {loginError && (
                  <p className="text-sm text-destructive">{loginError}</p>
                )}
              </div>
              
              <GalaxyButton type="submit" className="w-full" size="lg">
                Login
              </GalaxyButton>
            </form>
          </div>
          
          <p className="text-center text-xs text-muted-foreground mt-4">
            Demo password: admin123
          </p>
        </motion.div>
      </div>
    );
  }

  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/inquiries', icon: MessageSquare, label: 'Inquiries', badge: inquiries.length },
    { path: '/admin/projects', icon: FolderPlus, label: 'Projects' },
    { path: '/admin/pricing', icon: DollarSign, label: 'Pricing' },
    { path: '/admin/site-settings', icon: Globe, label: 'Site Settings' },
  ];

  const isActivePath = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  const NavItem = ({ path, icon: Icon, label, badge }: { path: string; icon: any; label: string; badge?: number }) => (
    <button
      onClick={() => {
        navigate(path);
        setMobileMenuOpen(false);
      }}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 text-sm ${
        isActivePath(path)
          ? 'glass-button text-primary' 
          : 'text-muted-foreground hover:bg-muted'
      }`}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span className="flex-1 text-left truncate">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="grain-overlay" />
      
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 glass-nav px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-base font-bold flex items-center gap-1">
            <span className="text-gradient">GO</span>
            <span className="text-foreground">DIGITAL</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={logout}
              className="p-2 glass-button rounded-lg"
            >
              <LogOut className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 glass-button rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute right-0 top-0 bottom-0 w-72 glass-panel p-4 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <p className="text-xs text-muted-foreground">Admin Dashboard</p>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <NavItem key={item.path} {...item} />
                ))}
              </nav>
              
              <div className="mt-8 pt-4 border-t border-border/30">
                <Link 
                  to="/"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Site
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-56 min-h-screen glass-panel p-4 fixed left-0 top-0">
          <div className="mb-6">
            <Link to="/" className="text-lg font-bold flex items-center gap-1">
              <span className="text-gradient">GO</span>
              <span className="text-foreground">DIGITAL</span>
            </Link>
            <p className="text-xs text-muted-foreground mt-1">Admin Dashboard</p>
          </div>
          
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
          </nav>
          
          <div className="absolute bottom-4 left-4 right-4 space-y-2">
            <button
              onClick={logout}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
            <Link 
              to="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Site
            </Link>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 lg:ml-56 p-4 md:p-6 pt-20 lg:pt-6 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
