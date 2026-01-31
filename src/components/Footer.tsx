import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { platformCategories } from '@/data/portfolioProjects';

const experimentLinks = [
  { name: 'Website', path: '/experiments/website', icon: '◈' },
  { name: 'Branding', path: '/experiments/branding', icon: '◐' },
  { name: 'Ads & Marketing', path: '/experiments/ads-marketing', icon: '◎' },
  { name: 'Automation', path: '/experiments/automation', icon: '⚡' },
  { name: 'Development', path: '/experiments/development', icon: '◇' },
];

// Check if a path is active
const isActive = (currentPath: string, linkPath: string) => {
  return currentPath === linkPath || currentPath.startsWith(linkPath + '/');
};

export default function Footer() {
  const location = useLocation();
  return (
    <footer className="relative py-20 px-6 border-t border-border/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold mb-4"
            >
              <span className="text-gradient">GO</span>
              <span className="text-foreground">DIGITAL</span>
            </motion.h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              Creative experiments in digital space. Building beautiful, 
              functional experiences that make a difference.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              Categories
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/work" 
                  className={`text-sm transition-colors duration-300 flex items-center gap-2 ${
                    isActive(location.pathname, '/work')
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  <span className="text-xs opacity-60">◉</span>
                  All Work
                </Link>
              </li>
              {platformCategories.map((platform) => (
                <li key={platform.id}>
                  <Link 
                    to={`/services/${platform.id}`} 
                    className={`text-sm transition-colors duration-300 flex items-center gap-2 ${
                      isActive(location.pathname, `/services/${platform.id}`)
                        ? 'text-primary font-medium'
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    <span className="text-xs opacity-60">{platform.icon}</span>
                    {platform.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              Experiments
            </h4>
            <ul className="space-y-3">
              {experimentLinks.map((experiment) => (
                <li key={experiment.path}>
                  <Link 
                    to={experiment.path} 
                    className={`text-sm transition-colors duration-300 flex items-center gap-2 ${
                      isActive(location.pathname, experiment.path)
                        ? 'text-primary font-medium'
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    <span className="text-xs opacity-60">{experiment.icon}</span>
                    {experiment.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/about" 
                  className={`text-sm transition-colors duration-300 ${
                    isActive(location.pathname, '/about')
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className={`text-sm transition-colors duration-300 ${
                    isActive(location.pathname, '/contact')
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  Contact
                </Link>
              </li>
              <li>
                <a href="mailto:hello@godigital.io" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                  hello@godigital.io
                </a>
              </li>
              <li>
                <a href="tel:+917600323130" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                  +91 76003 23130
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2024 GODIGITAL. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className={`text-xs transition-colors ${
              isActive(location.pathname, '/privacy')
                ? 'text-primary'
                : 'text-muted-foreground hover:text-primary'
            }`}>
              Privacy Policy
            </Link>
            <Link to="/terms" className={`text-xs transition-colors ${
              isActive(location.pathname, '/terms')
                ? 'text-primary'
                : 'text-muted-foreground hover:text-primary'
            }`}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
