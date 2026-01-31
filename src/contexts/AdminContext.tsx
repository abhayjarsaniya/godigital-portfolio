import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { portfolioProjects as defaultProjects } from '@/data/portfolioProjects';
import { getSiteContent, saveSiteContent, defaultSiteContent, SiteContent } from '@/data/siteContent';

// Types
export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  projectTypeLabel?: string;
  message: string;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  clientCompany?: string;
  industry: string;
  platform: string;
  description: string;
  technologies: string[];
  features: string[];
  results: string[];
  imageUrl: string;
  salesName?: string;
  projectValue?: number;
  startDate?: string;
  endDate?: string;
  estimatedDuration?: string;
  status: 'inquiry' | 'in-progress' | 'completed' | 'cancelled';
  isVisible: boolean;
  createdAt: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  currency: string;
  pages: number;
  description: string;
  features: string[];
  isActive: boolean;
}

export const PLATFORM_OPTIONS = ['websites', 'mobile', 'tablet', 'dashboards', 'graphic-design', 'ai-work'];
export const INDUSTRY_OPTIONS = ['Technology', 'Healthcare', 'Finance', 'E-commerce', 'Education', 'Entertainment', 'Real Estate', 'Food & Beverage', 'Fashion', 'Other'];
export const STATUS_OPTIONS = [
  { value: 'inquiry', label: 'Inquiry', color: 'hsl(var(--info))' },
  { value: 'in-progress', label: 'In Progress', color: 'hsl(var(--primary))' },
  { value: 'completed', label: 'Completed', color: 'hsl(var(--success))' },
  { value: 'cancelled', label: 'Cancelled', color: 'hsl(var(--destructive))' },
];

export const DEFAULT_PRICING: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 2999,
    currency: '₹',
    pages: 3,
    description: 'Perfect for small businesses starting online',
    features: ['3 responsive pages', 'Mobile-optimized design', 'Contact form', 'Basic SEO setup'],
    isActive: true,
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 4999,
    currency: '₹',
    pages: 5,
    description: 'Ideal for growing businesses',
    features: ['5 responsive pages', 'Custom design', 'Contact & inquiry forms', 'Social media integration', 'Google Analytics'],
    isActive: true,
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 9999,
    currency: '₹',
    pages: 10,
    description: 'Complete digital presence',
    features: ['10 responsive pages', 'Premium custom design', 'CMS integration', 'Advanced forms', 'Performance optimization', 'SEO optimization'],
    isActive: true,
  },
  {
    id: 'custom',
    name: 'Custom',
    price: 0,
    currency: '₹',
    pages: 0,
    description: 'Enterprise solutions',
    features: ['Custom page count', 'Complex integrations', 'Dashboard/ERP/CRM', 'Dedicated support', 'Priority development'],
    isActive: true,
  },
];

export const emptyProject: Omit<Project, 'id' | 'createdAt'> = {
  title: '',
  clientName: '',
  clientEmail: '',
  clientPhone: '',
  clientCompany: '',
  industry: '',
  platform: '',
  description: '',
  technologies: [],
  features: [],
  results: [],
  imageUrl: '',
  salesName: '',
  projectValue: undefined,
  startDate: '',
  endDate: '',
  estimatedDuration: '',
  status: 'inquiry',
  isVisible: true,
};

interface AdminContextType {
  // Auth
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  
  // Inquiries
  inquiries: Inquiry[];
  setInquiries: React.Dispatch<React.SetStateAction<Inquiry[]>>;
  deleteInquiry: (id: string) => void;
  
  // Projects
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  deleteProject: (id: string) => void;
  toggleProjectVisibility: (id: string) => void;
  saveProject: (project: Omit<Project, 'id' | 'createdAt'>, editingId?: string | null) => void;
  
  // Pricing
  pricingTiers: PricingTier[];
  setPricingTiers: React.Dispatch<React.SetStateAction<PricingTier[]>>;
  savePricing: (tier: PricingTier) => void;
  togglePricingActive: (id: string) => void;
  
  // Site Content
  siteContent: SiteContent;
  setSiteContent: React.Dispatch<React.SetStateAction<SiteContent>>;
  saveSiteContentToStorage: () => void;
  updatePageSettings: (page: keyof SiteContent, field: string, value: any) => void;
  toggleItemVisibility: (page: keyof SiteContent, arrayName: string, itemId: string) => void;
  deleteSiteItem: (page: keyof SiteContent, arrayName: string, itemId: string) => void;
  addSiteItem: (page: keyof SiteContent, arrayName: string, newItem: any) => void;
  updateSiteItem: (page: keyof SiteContent, arrayName: string, itemId: string, data: any) => void;
  
  // Stats
  stats: {
    totalInquiries: number;
    totalProjects: number;
    liveProjects: number;
    hiddenProjects: number;
    thisMonthInquiries: number;
    completedProjects: number;
    inProgressProjects: number;
    totalSalesValue: number;
    estimatedPipelineValue: number;
  };
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>(DEFAULT_PRICING);
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent);

  useEffect(() => {
    const auth = localStorage.getItem('godigital_admin_auth');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    const storedInquiries = localStorage.getItem('godigital_inquiries');
    const storedProjects = localStorage.getItem('godigital_projects');
    const storedPricing = localStorage.getItem('godigital_pricing');
    
    if (storedInquiries) setInquiries(JSON.parse(storedInquiries));
    
    if (storedProjects) {
      const savedProjects = JSON.parse(storedProjects);
      const savedIds = new Set(savedProjects.map((p: Project) => p.id));
      const mergedProjects = [
        ...savedProjects,
        ...defaultProjects
          .filter(dp => !savedIds.has(dp.id))
          .map(dp => ({
            id: dp.id,
            title: dp.name,
            clientName: dp.client || 'Demo Client',
            clientCompany: dp.client,
            industry: dp.industry || 'Technology',
            platform: dp.platform,
            description: dp.overview,
            technologies: dp.technologies || [],
            features: dp.features || [],
            results: dp.results || [],
            imageUrl: dp.thumbnail,
            status: 'completed' as const,
            isVisible: true,
            createdAt: new Date().toISOString(),
          }))
      ];
      setProjects(mergedProjects);
    } else {
      const initialProjects: Project[] = defaultProjects.map(dp => ({
        id: dp.id,
        title: dp.name,
        clientName: dp.client || 'Demo Client',
        clientCompany: dp.client,
        industry: dp.industry || 'Technology',
        platform: dp.platform,
        description: dp.overview,
        technologies: dp.technologies || [],
        features: dp.features || [],
        results: dp.results || [],
        imageUrl: dp.thumbnail,
        status: 'completed' as const,
        isVisible: true,
        createdAt: new Date().toISOString(),
      }));
      setProjects(initialProjects);
      localStorage.setItem('godigital_projects', JSON.stringify(initialProjects));
    }
    
    if (storedPricing) setPricingTiers(JSON.parse(storedPricing));
    setSiteContent(getSiteContent());
  }, []);

  const login = (password: string): boolean => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('godigital_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('godigital_admin_auth');
  };

  const deleteInquiry = (id: string) => {
    const updated = inquiries.filter(i => i.id !== id);
    setInquiries(updated);
    localStorage.setItem('godigital_inquiries', JSON.stringify(updated));
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem('godigital_projects', JSON.stringify(updated));
  };

  const toggleProjectVisibility = (id: string) => {
    const updated = projects.map(p => 
      p.id === id ? { ...p, isVisible: !p.isVisible } : p
    );
    setProjects(updated);
    localStorage.setItem('godigital_projects', JSON.stringify(updated));
  };

  const saveProject = (projectData: Omit<Project, 'id' | 'createdAt'>, editingId?: string | null) => {
    if (editingId) {
      const updated = projects.map(p => 
        p.id === editingId 
          ? { ...projectData, id: editingId, createdAt: p.createdAt }
          : p
      );
      setProjects(updated);
      localStorage.setItem('godigital_projects', JSON.stringify(updated));
    } else {
      const project: Project = {
        ...projectData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      const updated = [...projects, project];
      setProjects(updated);
      localStorage.setItem('godigital_projects', JSON.stringify(updated));
    }
  };

  const savePricing = (tier: PricingTier) => {
    const updated = pricingTiers.map(t => t.id === tier.id ? tier : t);
    setPricingTiers(updated);
    localStorage.setItem('godigital_pricing', JSON.stringify(updated));
  };

  const togglePricingActive = (id: string) => {
    const updated = pricingTiers.map(t => 
      t.id === id ? { ...t, isActive: !t.isActive } : t
    );
    setPricingTiers(updated);
    localStorage.setItem('godigital_pricing', JSON.stringify(updated));
  };

  const saveSiteContentToStorage = () => {
    saveSiteContent(siteContent);
  };

  const updatePageSettings = (page: keyof SiteContent, field: string, value: any) => {
    setSiteContent(prev => ({
      ...prev,
      [page]: {
        ...prev[page],
        settings: {
          ...prev[page].settings,
          [field]: value,
          lastUpdated: new Date().toISOString(),
        },
      },
    }));
  };

  const toggleItemVisibility = (page: keyof SiteContent, arrayName: string, itemId: string) => {
    setSiteContent(prev => {
      const pageData = prev[page] as any;
      const array = pageData[arrayName];
      if (!array) return prev;
      
      const updated = array.map((item: any) => 
        item.id === itemId ? { ...item, isVisible: !item.isVisible } : item
      );
      
      return {
        ...prev,
        [page]: {
          ...pageData,
          [arrayName]: updated,
        },
      };
    });
  };

  const deleteSiteItem = (page: keyof SiteContent, arrayName: string, itemId: string) => {
    setSiteContent(prev => {
      const pageData = prev[page] as any;
      const array = pageData[arrayName];
      if (!array) return prev;
      
      return {
        ...prev,
        [page]: {
          ...pageData,
          [arrayName]: array.filter((item: any) => item.id !== itemId),
        },
      };
    });
  };

  const addSiteItem = (page: keyof SiteContent, arrayName: string, newItem: any) => {
    setSiteContent(prev => {
      const pageData = prev[page] as any;
      const array = pageData[arrayName] || [];
      
      return {
        ...prev,
        [page]: {
          ...pageData,
          [arrayName]: [...array, { ...newItem, id: Date.now().toString() }],
        },
      };
    });
  };

  const updateSiteItem = (page: keyof SiteContent, arrayName: string, itemId: string, data: any) => {
    setSiteContent(prev => {
      const pageData = prev[page] as any;
      const array = pageData[arrayName];
      if (!array) return prev;
      
      const updated = array.map((item: any) => 
        item.id === itemId ? { ...item, ...data } : item
      );
      
      return {
        ...prev,
        [page]: {
          ...pageData,
          [arrayName]: updated,
        },
      };
    });
  };

  const stats = {
    totalInquiries: inquiries.length,
    totalProjects: projects.length,
    liveProjects: projects.filter(p => p.isVisible).length,
    hiddenProjects: projects.filter(p => !p.isVisible).length,
    thisMonthInquiries: inquiries.filter(i => {
      const date = new Date(i.createdAt);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length,
    completedProjects: projects.filter(p => p.status === 'completed').length,
    inProgressProjects: projects.filter(p => p.status === 'in-progress').length,
    totalSalesValue: projects.reduce((sum, p) => sum + (p.projectValue || 0), 0),
    estimatedPipelineValue: inquiries.length * 5000,
  };

  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      inquiries,
      setInquiries,
      deleteInquiry,
      projects,
      setProjects,
      deleteProject,
      toggleProjectVisibility,
      saveProject,
      pricingTiers,
      setPricingTiers,
      savePricing,
      togglePricingActive,
      siteContent,
      setSiteContent,
      saveSiteContentToStorage,
      updatePageSettings,
      toggleItemVisibility,
      deleteSiteItem,
      addSiteItem,
      updateSiteItem,
      stats,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
