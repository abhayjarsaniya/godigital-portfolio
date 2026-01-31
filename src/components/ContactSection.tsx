import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, User, Mail, Phone, MessageSquare, FolderOpen, ChevronDown } from 'lucide-react';
import { z } from 'zod';
import { GalaxyButton } from '@/components/ui/galaxy-button';

const PROJECT_OPTIONS = [
  { value: 'not-sure', label: 'Not Sure Yet' },
  { value: 'website', label: 'Website Development' },
  { value: 'mobile-app', label: 'Mobile Application' },
  { value: 'dashboard', label: 'Dashboard / Admin Panel' },
  { value: 'ai-solution', label: 'AI / ML Solution' },
  { value: 'graphic-design', label: 'Graphic Design' },
  { value: 'branding', label: 'Branding & Identity' },
  { value: 'ecommerce', label: 'E-commerce Platform' },
  { value: 'custom', label: 'Custom Project' },
];

const WHATSAPP_NUMBER = '7600323130';

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(10, "Phone must be at least 10 digits").max(15),
  projectType: z.string().min(1, "Please select a project type"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleProjectSelect = (value: string) => {
    setFormData(prev => ({ ...prev, projectType: value }));
    setDropdownOpen(false);
    if (errors.projectType) {
      setErrors(prev => ({ ...prev, projectType: undefined }));
    }
  };

  const sendToWhatsApp = (data: ContactFormData) => {
    const projectLabel = PROJECT_OPTIONS.find(p => p.value === data.projectType)?.label || data.projectType;
    const message = `🚀 *New Project Inquiry*

*Name:* ${data.name}
*Email:* ${data.email}
*Phone:* ${data.phone}
*Project Type:* ${projectLabel}

*Message:*
${data.message}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Store inquiry in localStorage for admin dashboard
    const inquiries = JSON.parse(localStorage.getItem('godigital_inquiries') || '[]');
    const newInquiry = {
      id: Date.now().toString(),
      ...formData,
      projectTypeLabel: PROJECT_OPTIONS.find(p => p.value === formData.projectType)?.label,
      createdAt: new Date().toISOString(),
    };
    inquiries.push(newInquiry);
    localStorage.setItem('godigital_inquiries', JSON.stringify(inquiries));
    
    // Send to WhatsApp
    sendToWhatsApp(formData);
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', projectType: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-4 block">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Start Your <span className="text-gradient font-medium">Project</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Ready to bring your vision to life? Tell us about your project and we'll get back to you within 24 hours.
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="glass-panel p-8 md:p-12 rounded-2xl">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 10 }}
                  className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Send className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="text-2xl font-medium mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`
                        w-full px-4 py-3 glass-input rounded-lg
                        focus:outline-none transition-all duration-300 
                        placeholder:text-muted-foreground/50
                        ${errors.name ? 'border-destructive' : ''}
                      `}
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-destructive"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`
                        w-full px-4 py-3 glass-input rounded-lg
                        focus:outline-none transition-all duration-300 
                        placeholder:text-muted-foreground/50
                        ${errors.email ? 'border-destructive' : ''}
                      `}
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-destructive"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`
                      w-full px-4 py-3 glass-input rounded-lg
                      focus:outline-none transition-all duration-300 
                      placeholder:text-muted-foreground/50
                      ${errors.phone ? 'border-destructive' : ''}
                    `}
                  />
                  {errors.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-destructive"
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                </div>

                {/* Project Type Dropdown */}
                <div className="space-y-2 relative">
                  <label className="text-sm text-muted-foreground flex items-center gap-2">
                    <FolderOpen className="w-4 h-4" />
                    Project Type
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`
                        w-full px-4 py-3 glass-input rounded-lg text-left
                        focus:outline-none transition-all duration-300 
                        flex items-center justify-between
                        ${errors.projectType ? 'border-destructive' : ''}
                        ${formData.projectType ? 'text-foreground' : 'text-muted-foreground/50'}
                      `}
                    >
                      <span>
                        {formData.projectType 
                          ? PROJECT_OPTIONS.find(p => p.value === formData.projectType)?.label 
                          : 'Select project type...'}
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full left-0 right-0 mt-2 glass-panel rounded-lg shadow-xl z-50 overflow-hidden"
                      >
                        {PROJECT_OPTIONS.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => handleProjectSelect(option.value)}
                            className="w-full px-4 py-3 text-left hover:bg-primary/10 transition-colors duration-200 text-sm border-b border-border/20 last:border-0"
                          >
                            {option.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                  {errors.projectType && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-destructive"
                    >
                      {errors.projectType}
                    </motion.p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Project Description
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project, goals, and timeline..."
                    rows={5}
                    className={`
                      w-full px-4 py-3 glass-input rounded-lg resize-none
                      focus:outline-none transition-all duration-300 
                      placeholder:text-muted-foreground/50
                      ${errors.message ? 'border-destructive' : ''}
                    `}
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-destructive"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <GalaxyButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </GalaxyButton>
              </form>
            )}
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
