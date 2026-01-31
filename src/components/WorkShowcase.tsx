import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { portfolioProjects, platformCategories, PlatformType } from '@/data/portfolioProjects';

export default function WorkShowcase() {
  const [activeFilter, setActiveFilter] = useState<PlatformType | 'all'>('all');
  
  // Filter projects based on selected category
  const filteredProjects = activeFilter === 'all' 
    ? portfolioProjects.slice(0, 8) // Show first 8 when "All Work" selected
    : portfolioProjects.filter(p => p.platform === activeFilter).slice(0, 8);

  return (
    <section id="work" className="py-24 px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary text-sm uppercase tracking-[0.3em] mb-4">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Our <span className="text-gradient">Work</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Explore our carefully crafted digital experiences across platforms.
          </p>
        </motion.div>
        
        {/* Platform Pills - Now with inline filtering */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {/* All Work button */}
          <button
            onClick={() => setActiveFilter('all')}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              flex items-center gap-2 glass-pill
              ${activeFilter === 'all' ? 'active' : ''}
            `}
          >
            <span className="text-xs">◉</span>
            All Work
          </button>
          
          {platformCategories.map((platform) => (
            <button
              key={platform.id}
              onClick={() => setActiveFilter(platform.id)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                flex items-center gap-2 glass-pill
                ${activeFilter === platform.id ? 'active' : ''}
              `}
            >
              <span className="text-xs">{platform.icon}</span>
              {platform.name}
            </button>
          ))}
        </motion.div>
        
        {/* Featured Projects Grid - Animated on filter change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link to="/work" className="group block">
                  <div 
                    className="glass-card aspect-[4/3] rounded-xl mb-3 overflow-hidden relative transition-all duration-500 group-hover:shadow-[0_0_30px_hsl(var(--glow-primary)/0.15)]"
                    style={{ background: project.thumbnail }}
                  >
                    {/* Platform badge */}
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full glass-badge text-xs text-muted-foreground">
                      {platformCategories.find(p => p.id === project.platform)?.icon} {platformCategories.find(p => p.id === project.platform)?.name}
                    </div>
                    
                    {/* AI Badge for AI projects */}
                    {project.platform === 'ai-work' && (
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full glass-badge border-primary/30">
                        <span className="text-primary text-xs font-medium">✦ AI</span>
                      </div>
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full glass-button bg-primary/20 text-primary flex items-center justify-center border-primary/40">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="font-medium text-foreground text-sm mb-0.5 group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">{project.tagline}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <Link
            to="/work"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass-button text-foreground font-medium hover:border-primary/50 hover:shadow-[0_0_30px_hsl(var(--glow-primary)/0.15)] transition-all duration-300 group"
          >
            View All Work
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <p className="text-muted-foreground text-sm mt-4">
            {portfolioProjects.length}+ projects across {platformCategories.length} categories
          </p>
        </motion.div>
      </div>
    </section>
  );
}
