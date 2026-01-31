import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, Send, Sparkles, MessageCircle } from 'lucide-react';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone number required').regex(/^[0-9+\-\s()]+$/, 'Invalid phone format'),
  projectType: z.string().min(1, 'Select a project type'),
  message: z.string().min(10, 'Tell us more about your project'),
});

interface GalaxyContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const projectTypes = [
  { value: 'website', label: 'Website', icon: '◈' },
  { value: 'branding', label: 'Branding', icon: '◐' },
  { value: 'mobile', label: 'Mobile App', icon: '◇' },
  { value: 'ai', label: 'AI Project', icon: '✦' },
  { value: 'automation', label: 'Automation', icon: '⚡' },
  { value: 'other', label: 'Other', icon: '◎' },
];

function FloatingParticle({ delay, size, left, top }: { delay: number; size: number; left: string; top: string }) {
  return (
    <motion.div
      className="absolute rounded-full bg-primary/30"
      style={{ width: size, height: size, left, top }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 0.8, 0],
        scale: [0.5, 1.5, 0.5],
        y: [0, -100],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  );
}

function StarField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated stars */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
          }}
        />
      ))}
      
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <FloatingParticle
          key={`particle-${i}`}
          delay={i * 0.3}
          size={4 + Math.random() * 8}
          left={`${Math.random() * 100}%`}
          top={`${70 + Math.random() * 30}%`}
        />
      ))}
      
      {/* Nebula gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-[80px] animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-primary/10 via-transparent to-transparent rounded-full" />
    </div>
  );
}

export default function GalaxyContactModal({ isOpen, onClose }: GalaxyContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleWhatsAppRedirect = () => {
    const projectLabel = projectTypes.find(t => t.value === formData.projectType)?.label || formData.projectType;
    const message = encodeURIComponent(
      `Hi! I'm ${formData.name}.\n\nProject Type: ${projectLabel}\n\nMessage: ${formData.message}\n\nEmail: ${formData.email}\nPhone: ${formData.phone}`
    );
    window.open(`https://wa.me/917600323130?text=${message}`, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      contactSchema.parse(formData);
      setErrors({});
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save to localStorage
      const inquiries = JSON.parse(localStorage.getItem('godigital_inquiries') || '[]');
      const projectLabel = projectTypes.find(t => t.value === formData.projectType)?.label || formData.projectType;
      inquiries.push({
        ...formData,
        projectTypeLabel: projectLabel,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        status: 'new',
      });
      localStorage.setItem('godigital_inquiries', JSON.stringify(inquiries));
      
      setSubmitted(true);
      
      // Reset after showing success
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', projectType: '', message: '' });
        setSubmitted(false);
        onClose();
      }, 2500);
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop with galaxy effect */}
          <motion.div 
            className="absolute inset-0 bg-background/90 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <StarField />
          </motion.div>
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow effect behind modal */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50 rounded-3xl blur-lg opacity-50 animate-pulse" />
            
            <div className="relative glass-panel p-8 rounded-2xl border border-primary/20">
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 p-2 glass-icon rounded-full text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
              
              {/* Success state */}
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                      className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center"
                    >
                      <motion.div
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Sparkles className="w-10 h-10 text-primary" />
                      </motion.div>
                    </motion.div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Header */}
                    <div className="text-center mb-8">
                      <motion.div
                        animate={{ 
                          y: [0, -5, 0],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="inline-flex items-center gap-2 text-primary text-sm uppercase tracking-widest mb-3"
                      >
                        <Sparkles className="w-4 h-4" />
                        Start Your Project
                        <Sparkles className="w-4 h-4" />
                      </motion.div>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                        Let's Create Something
                        <span className="text-gradient block">Amazing Together</span>
                      </h2>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass border border-border/50 bg-transparent text-foreground placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-xs mt-1"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </div>

                    {/* Email & Phone Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                        <motion.input
                          whileFocus={{ scale: 1.01 }}
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl glass border border-border/50 bg-transparent text-foreground placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                          placeholder="your@email.com"
                        />
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-xs mt-1"
                          >
                            {errors.email}
                          </motion.p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                        <motion.input
                          whileFocus={{ scale: 1.01 }}
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl glass border border-border/50 bg-transparent text-foreground placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                          placeholder="+91 98765 43210"
                        />
                        {errors.phone && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-xs mt-1"
                          >
                            {errors.phone}
                          </motion.p>
                        )}
                      </div>
                    </div>

                    {/* Project Type */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Project Type</label>
                      <div className="grid grid-cols-3 gap-2">
                        {projectTypes.map((type) => (
                          <motion.button
                            key={type.value}
                            type="button"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setFormData({ ...formData, projectType: type.value })}
                            className={`p-3 rounded-xl glass border transition-all text-sm ${
                              formData.projectType === type.value
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border/50 text-muted-foreground hover:border-primary/50'
                            }`}
                          >
                            <span className="block text-lg mb-1">{type.icon}</span>
                            <span className="text-xs">{type.label}</span>
                          </motion.button>
                        ))}
                      </div>
                      {errors.projectType && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-xs mt-1"
                        >
                          {errors.projectType}
                        </motion.p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                      <motion.textarea
                        whileFocus={{ scale: 1.01 }}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl glass border border-border/50 bg-transparent text-foreground placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                        placeholder="Tell us about your project..."
                      />
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-xs mt-1"
                        >
                          {errors.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 py-4 rounded-xl bg-gradient-to-r from-primary via-primary/90 to-primary text-primary-foreground font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                          />
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </motion.button>
                      
                      <motion.button
                        type="button"
                        onClick={handleWhatsAppRedirect}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="py-4 px-6 rounded-xl glass border border-green-500/30 text-green-500 font-medium flex items-center justify-center gap-2 hover:bg-green-500/10 transition-all"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="hidden sm:inline">WhatsApp</span>
                      </motion.button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
