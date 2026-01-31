import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useContactModal } from '@/contexts/ContactModalContext';

const categoryLinks = [
  { label: 'AI Work', href: '/services/ai-work', icon: '✦' },
  { label: 'Websites', href: '/services/websites', icon: '◈' },
  { label: 'Mobile', href: '/services/mobile', icon: '◇' },
  { label: 'Tablet', href: '/services/tablet', icon: '▢' },
  { label: 'Dashboards', href: '/services/dashboards', icon: '◎' },
  { label: 'Graphic Design', href: '/services/graphic-design', icon: '◐' },
];

const experimentLinks = [
  { label: 'Website', href: '/experiments/website', icon: '◈' },
  { label: 'Branding', href: '/experiments/branding', icon: '◐' },
  { label: 'Ads & Marketing', href: '/experiments/ads-marketing', icon: '◎' },
  { label: 'Automation', href: '/experiments/automation', icon: '⚡' },
  { label: 'Development', href: '/experiments/development', icon: '◇' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [experimentsOpen, setExperimentsOpen] = useState(false);
  const [mobileExperimentsOpen, setMobileExperimentsOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { openModal } = useContactModal();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoriesOpen(false);
    setExperimentsOpen(false);
    setMobileExperimentsOpen(false);
    setMobileCategoriesOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Check if link is active
  const isActive = (href: string) => {
    if (href.startsWith('/#')) return false;
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };
  
  const navItems = [
    { label: 'Experiments', href: '/experiments', hasDropdown: true },
    { label: 'Categories', href: '/categories', hasDropdown: true },
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 50 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      }
    })
  };
  
  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 glass-nav transition-all duration-500"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-xl font-bold z-50">
            <span className="text-gradient">GO</span>
            <span className="text-foreground">DIGITAL</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Experiments Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setExperimentsOpen(true)}
              onMouseLeave={() => setExperimentsOpen(false)}
            >
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className={`flex items-center gap-1 text-sm transition-colors duration-300 ${
                  location.pathname.startsWith('/experiments') 
                    ? 'text-primary font-medium' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Experiments
                <ChevronDown className={`w-3 h-3 transition-transform ${experimentsOpen ? 'rotate-180' : ''}`} />
              </motion.button>
              
              <AnimatePresence>
                {experimentsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 glass-panel rounded-xl p-2 border border-border/50"
                  >
                    {experimentLinks.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive(item.href)
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'
                        }`}
                      >
                        <span>{item.icon}</span>
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Categories Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setCategoriesOpen(true)}
              onMouseLeave={() => setCategoriesOpen(false)}
            >
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className={`flex items-center gap-1 text-sm transition-colors duration-300 ${
                  location.pathname.startsWith('/services') 
                    ? 'text-primary font-medium' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Categories
                <ChevronDown className={`w-3 h-3 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
              </motion.button>
              
              <AnimatePresence>
                {categoriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 glass-panel rounded-xl p-2 border border-border/50"
                  >
                    {categoryLinks.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive(item.href)
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'
                        }`}
                      >
                        <span>{item.icon}</span>
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Work */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <Link
                to="/work"
                className={`text-sm transition-colors duration-300 ${
                  location.pathname === '/work' 
                    ? 'text-primary font-medium' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Work
              </Link>
            </motion.div>

            {/* Pricing */}
            <motion.a
              href={isHomePage ? '#pricing' : '/#pricing'}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              Pricing
            </motion.a>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={openModal}
              className="hidden md:block glass-button px-4 py-2 rounded-full text-sm text-primary font-medium hover:text-foreground"
            >
              Start Project
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden z-50 p-2 -mr-2 glass-icon rounded-lg"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-foreground" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm glass-panel z-40 md:hidden overflow-hidden"
            >
              <div className="flex flex-col h-full pt-20 px-6 pb-6 overflow-y-auto">
                {/* Decorative header */}
                <motion.div
                  custom={0}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  className="mb-6"
                >
                  <div className="h-px w-12 bg-primary/50 mb-4" />
                  <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
                    Navigation
                  </span>
                </motion.div>
                
                {/* Nav Links */}
                <nav className="flex-1 space-y-4">
                  {/* Experiments Dropdown */}
                  <motion.div
                    custom={1}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                  >
                    <button
                      onClick={() => setMobileExperimentsOpen(!mobileExperimentsOpen)}
                      className={`w-full flex items-center justify-between text-lg font-medium transition-colors ${
                        location.pathname.startsWith('/experiments') ? 'text-primary' : 'text-foreground'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">01</span>
                        Experiments
                      </span>
                      <motion.div
                        animate={{ rotate: mobileExperimentsOpen ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {mobileExperimentsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-6 pt-2 space-y-2">
                            {experimentLinks.map((item) => (
                              <Link
                                key={item.href}
                                to={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`flex items-center gap-2 text-sm py-1 transition-colors ${
                                  isActive(item.href) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                                }`}
                              >
                                <span className="text-xs">{item.icon}</span>
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  
                  {/* Categories Dropdown */}
                  <motion.div
                    custom={2}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                  >
                    <button
                      onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                      className={`w-full flex items-center justify-between text-lg font-medium transition-colors ${
                        location.pathname.startsWith('/services') ? 'text-primary' : 'text-foreground'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">02</span>
                        Categories
                      </span>
                      <motion.div
                        animate={{ rotate: mobileCategoriesOpen ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {mobileCategoriesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-6 pt-2 space-y-2">
                            {categoryLinks.map((item) => (
                              <Link
                                key={item.href}
                                to={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`flex items-center gap-2 text-sm py-1 transition-colors ${
                                  isActive(item.href) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                                }`}
                              >
                                <span className="text-xs">{item.icon}</span>
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  
                  {/* Quick Links */}
                  <motion.div
                    custom={3}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    className="pt-4 border-t border-border/30"
                  >
                    <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase mb-3 block">Quick Links</span>
                    <div className="space-y-3">
                      <Link
                        to="/work"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-lg font-medium block transition-colors ${
                          location.pathname === '/work' ? 'text-primary' : 'text-foreground hover:text-primary'
                        }`}
                      >
                        Work
                      </Link>
                      <Link
                        to="/about"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-lg font-medium block transition-colors ${
                          location.pathname === '/about' ? 'text-primary' : 'text-foreground hover:text-primary'
                        }`}
                      >
                        About
                      </Link>
                      <Link
                        to="/contact"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-lg font-medium block transition-colors ${
                          location.pathname === '/contact' ? 'text-primary' : 'text-foreground hover:text-primary'
                        }`}
                      >
                        Contact
                      </Link>
                      <a
                        href={isHomePage ? '#pricing' : '/#pricing'}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors block"
                      >
                        Pricing
                      </a>
                    </div>
                  </motion.div>
                </nav>

                {/* CTA Button */}
                <motion.div
                  custom={navItems.length + 1}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  className="mt-auto pt-4"
                >
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openModal();
                    }}
                    className="block w-full py-4 text-center bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors duration-300"
                  >
                    Start Project
                  </button>
                </motion.div>

                {/* Footer with branding */}
                <motion.div
                  custom={navItems.length + 2}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between"
                >
                  <p className="text-xs text-muted-foreground tracking-wider">
                    GODIGITAL © 2024
                  </p>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] text-muted-foreground">LIVE</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
