import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SystemIntelligenceProvider } from '@/contexts/SystemIntelligence';
import { platformCategories, portfolioProjects, PortfolioProject, PlatformType } from '@/data/portfolioProjects';
import { ArrowUpRight, X, ArrowLeft, Clock, Layers, Zap } from 'lucide-react';

function WorkContent() {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType | 'all'>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  
  const filteredProjects = useMemo(() => {
    if (selectedPlatform === 'all') return portfolioProjects;
    return portfolioProjects.filter(p => p.platform === selectedPlatform);
  }, [selectedPlatform]);
  
  // Get AI Work projects for featured section
  const aiProjects = portfolioProjects.filter(p => p.platform === 'ai-work');
  
  return (
    <div className="relative min-h-screen bg-background">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      <Navigation />
      
      <main className="relative z-10">
        {/* Hero Section - Modern like homepage */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
          {/* Background elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-drift" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-drift delay-500" />
          </div>
          
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block text-primary text-sm uppercase tracking-[0.3em] mb-4">
                Portfolio
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6">
                <span className="text-gradient">Our</span>
                <span className="text-foreground"> Work</span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12"
            >
              Explore our carefully crafted digital experiences across platforms.
              <br />
              Each project reflects our commitment to quality.
            </motion.p>
            
            {/* Platform Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-full px-2"
            >
              <FilterButton 
                active={selectedPlatform === 'all'} 
                onClick={() => setSelectedPlatform('all')}
                icon="◉"
              >
                All
              </FilterButton>
              {platformCategories.map((platform) => (
                <FilterButton
                  key={platform.id}
                  active={selectedPlatform === platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  icon={platform.icon}
                  featured={platform.id === 'ai-work'}
                >
                  <span className="hidden sm:inline">{platform.name}</span>
                  <span className="sm:hidden">{platform.name.split(' ')[0]}</span>
                </FilterButton>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* AI Work Featured Section - Only show when AI or All is selected */}
        {(selectedPlatform === 'all' || selectedPlatform === 'ai-work') && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="py-16 px-6"
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-2xl">✦</span>
                <h2 className="text-2xl font-semibold text-foreground">AI-Powered Solutions</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent ml-4" />
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {aiProjects.map((project, index) => (
                  <AIProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onSelect={() => setSelectedProject(project)}
                  />
                ))}
              </div>
            </div>
          </motion.section>
        )}
        
        {/* Projects Grid */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            {selectedPlatform !== 'ai-work' && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPlatform}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {selectedPlatform === 'all' && (
                    <div className="flex items-center gap-3 mb-8">
                      <span className="text-2xl">◈</span>
                      <h2 className="text-2xl font-semibold text-foreground">All Projects</h2>
                      <span className="text-muted-foreground text-sm">({filteredProjects.filter(p => p.platform !== 'ai-work').length})</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent ml-4" />
                    </div>
                  )}
                  
                  {selectedPlatform !== 'all' && (
                    <div className="flex items-center gap-3 mb-8">
                      <span className="text-2xl">{platformCategories.find(p => p.id === selectedPlatform)?.icon}</span>
                      <h2 className="text-2xl font-semibold text-foreground">
                        {platformCategories.find(p => p.id === selectedPlatform)?.name}
                      </h2>
                      <span className="text-muted-foreground text-sm">({filteredProjects.length})</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent ml-4" />
                    </div>
                  )}
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProjects
                      .filter(p => selectedPlatform === 'all' ? p.platform !== 'ai-work' : true)
                      .map((project, index) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          index={index}
                          onSelect={() => setSelectedProject(project)}
                        />
                      ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </section>
      </main>
      
      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
      
      <Footer />
    </div>
  );
}

// Filter Button Component
interface FilterButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  icon?: string;
  featured?: boolean;
}

function FilterButton({ children, active, onClick, icon, featured }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300
        flex items-center gap-1 sm:gap-2 whitespace-nowrap
        ${active
          ? 'bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--glow-primary)/0.3)]'
          : featured
            ? 'bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20'
            : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
        }
      `}
    >
      {icon && <span className="text-xs">{icon}</span>}
      {children}
    </button>
  );
}

// AI Project Card - Featured styling
interface AIProjectCardProps {
  project: PortfolioProject;
  index: number;
  onSelect: () => void;
}

function AIProjectCard({ project, index, onSelect }: AIProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onClick={onSelect}
      className="group cursor-pointer"
    >
      <div className="relative rounded-2xl overflow-hidden border border-primary/20 bg-card hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_40px_hsl(var(--glow-primary)/0.15)]">
        {/* Thumbnail */}
        <div 
          className="aspect-[4/3] relative"
          style={{ background: project.thumbnail }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          
          {/* AI Badge */}
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30">
            <span className="text-primary text-xs font-medium flex items-center gap-1">
              <span>✦</span> AI Powered
            </span>
          </div>
          
          {/* Hover Arrow */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5">
          <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
            {project.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{project.tagline}</p>
          
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.technologies?.slice(0, 3).map((tech) => (
              <span key={tech} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Regular Project Card
interface ProjectCardProps {
  project: PortfolioProject;
  index: number;
  onSelect: () => void;
}

function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  const platformIcon = platformCategories.find(p => p.id === project.platform)?.icon || '◇';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onClick={onSelect}
      className="group cursor-pointer"
    >
      <div 
        className="aspect-[4/3] rounded-xl mb-3 overflow-hidden relative border border-border/30 transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-[0_0_30px_hsl(var(--glow-primary)/0.1)]"
        style={{ background: project.thumbnail }}
      >
        {/* Platform badge */}
        <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-background/80 backdrop-blur-sm text-xs text-muted-foreground">
          {platformIcon} {project.category}
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </div>
      
      <h3 className="font-medium text-foreground text-sm mb-0.5 group-hover:text-primary transition-colors">
        {project.name}
      </h3>
      <p className="text-xs text-muted-foreground line-clamp-1">{project.tagline}</p>
    </motion.div>
  );
}

// Project Detail Modal
interface ProjectDetailModalProps {
  project: PortfolioProject;
  onClose: () => void;
}

function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const platformIcon = platformCategories.find(p => p.id === project.platform)?.icon || '◇';
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/95 backdrop-blur-md" />
      
      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-card border border-border rounded-xl sm:rounded-2xl w-full max-w-3xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
        </button>
        
        {/* Thumbnail */}
        <div 
          className="aspect-video relative"
          style={{ background: project.thumbnail }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          
          {/* Platform & Category */}
          <div className="absolute bottom-2 left-3 sm:bottom-4 sm:left-6 flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs sm:text-sm text-foreground">
              {platformIcon} {platformCategories.find(p => p.id === project.platform)?.name}
            </span>
            <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-primary/20 backdrop-blur-sm text-xs sm:text-sm text-primary">
              {project.category}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 break-words">
            {project.name}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-lg mb-4 sm:mb-6 break-words">{project.tagline}</p>
          
          {/* Project Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {project.client && (
              <div className="p-3 sm:p-4 rounded-xl bg-secondary/50">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Client</span>
                <p className="text-xs sm:text-sm font-medium text-foreground mt-1 break-words">{project.client}</p>
              </div>
            )}
            {project.industry && (
              <div className="p-3 sm:p-4 rounded-xl bg-secondary/50">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Industry</span>
                <p className="text-xs sm:text-sm font-medium text-foreground mt-1 break-words">{project.industry}</p>
              </div>
            )}
            {project.duration && (
              <div className="p-3 sm:p-4 rounded-xl bg-secondary/50">
                <span className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Duration
                </span>
                <p className="text-xs sm:text-sm font-medium text-foreground mt-1">{project.duration}</p>
              </div>
            )}
          </div>
          
          {/* Overview */}
          <div className="mb-4 sm:mb-6">
            <h3 className="text-xs sm:text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" /> Overview
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed break-words">{project.overview}</p>
          </div>
          
          {/* Technologies */}
          {project.technologies && (
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xs sm:text-sm font-medium text-foreground mb-2 sm:mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs sm:text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Features */}
          {project.features && (
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xs sm:text-sm font-medium text-foreground mb-2 sm:mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" /> Key Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span className="break-words">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Results */}
          {project.results && (
            <div className="mb-6 sm:mb-8 p-3 sm:p-4 rounded-xl bg-primary/5 border border-primary/20">
              <h3 className="text-xs sm:text-sm font-medium text-foreground mb-2 sm:mb-3">Results & Impact</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {project.results.map((result) => (
                  <span key={result} className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium break-words">
                    {result}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* CTA */}
          <div className="pt-4 sm:pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
              Want a similar project for your business?
            </p>
            <Link
              to="/#pricing"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-primary text-primary-foreground rounded-full font-medium text-xs sm:text-sm hover:shadow-[0_0_20px_hsl(var(--glow-primary)/0.3)] transition-all w-full sm:w-auto justify-center"
            >
              View Pricing
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Work() {
  return (
    <SystemIntelligenceProvider>
      <WorkContent />
    </SystemIntelligenceProvider>
  );
}
