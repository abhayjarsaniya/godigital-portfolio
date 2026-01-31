/**
 * Site Content Data - Editable from Admin Dashboard
 * 
 * All content sections for About, Contact, Privacy, Terms pages
 * Stored in localStorage for persistence
 */

// About Page Content
export interface AboutSection {
  id: string;
  type: 'hero' | 'mission' | 'values' | 'team' | 'stats' | 'cta';
  title: string;
  subtitle?: string;
  description?: string;
  isVisible: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  isVisible: boolean;
}

export interface ValueItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  isVisible: boolean;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  isVisible: boolean;
}

// Contact Page Content
export interface ContactInfo {
  id: string;
  icon: string;
  label: string;
  value: string;
  href: string;
  isVisible: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  isVisible: boolean;
}

// Privacy & Terms Content
export interface LegalSection {
  id: string;
  title: string;
  content: string;
  order: number;
  isVisible: boolean;
}

// Page Settings
export interface PageSettings {
  id: string;
  pageName: string;
  pageTitle: string;
  pageSubtitle: string;
  isPublished: boolean;
  lastUpdated: string;
}

// Full Site Content Structure
export interface SiteContent {
  about: {
    settings: PageSettings;
    sections: AboutSection[];
    team: TeamMember[];
    values: ValueItem[];
    stats: StatItem[];
  };
  contact: {
    settings: PageSettings;
    sections: AboutSection[];
    info: ContactInfo[];
    faqs: FAQItem[];
  };
  privacy: {
    settings: PageSettings;
    sections: LegalSection[];
  };
  terms: {
    settings: PageSettings;
    sections: LegalSection[];
  };
}

// Default Content
export const defaultSiteContent: SiteContent = {
  about: {
    settings: {
      id: 'about',
      pageName: 'About Us',
      pageTitle: 'We Are GODIGITAL',
      pageSubtitle: 'A creative digital agency crafting beautiful, functional experiences that make a real difference in the digital landscape.',
      isPublished: true,
      lastUpdated: new Date().toISOString(),
    },
    sections: [
      { id: 'hero', type: 'hero', title: 'About Us', subtitle: 'We Are GODIGITAL', isVisible: true },
      { id: 'mission', type: 'mission', title: 'Transforming Ideas Into Digital Excellence', subtitle: 'Our Mission', description: 'At GODIGITAL, we believe every business deserves a powerful digital presence. Our mission is to bridge the gap between vision and reality, creating digital solutions that not only look stunning but drive real results.', isVisible: true },
      { id: 'stats', type: 'stats', title: 'Our Achievements', isVisible: true },
      { id: 'values', type: 'values', title: 'What Drives Us', subtitle: 'Our Values', isVisible: true },
      { id: 'team', type: 'team', title: 'Meet the Creators', subtitle: 'Our Team', isVisible: true },
      { id: 'cta', type: 'cta', title: 'Let\'s Build Something Amazing', description: 'Ready to start your digital journey? We\'d love to hear from you.', isVisible: true },
    ],
    team: [
      { id: 't1', name: 'Alex Chen', role: 'Founder & Creative Director', image: 'linear-gradient(135deg, hsl(260 80% 40%) 0%, hsl(200 70% 50%) 100%)', isVisible: true },
      { id: 't2', name: 'Priya Sharma', role: 'Lead Developer', image: 'linear-gradient(135deg, hsl(180 60% 35%) 0%, hsl(260 70% 50%) 100%)', isVisible: true },
      { id: 't3', name: 'Marcus Johnson', role: 'UX Designer', image: 'linear-gradient(135deg, hsl(320 60% 40%) 0%, hsl(20 70% 50%) 100%)', isVisible: true },
      { id: 't4', name: 'Aisha Patel', role: 'Project Manager', image: 'linear-gradient(135deg, hsl(150 50% 35%) 0%, hsl(200 60% 45%) 100%)', isVisible: true },
    ],
    values: [
      { id: 'v1', icon: 'Target', title: 'Purpose-Driven', description: 'Every pixel has a purpose. We design with intention and build with precision.', isVisible: true },
      { id: 'v2', icon: 'Zap', title: 'Innovation First', description: 'We embrace cutting-edge technology to deliver forward-thinking solutions.', isVisible: true },
      { id: 'v3', icon: 'Heart', title: 'Client-Centric', description: 'Your success is our success. We partner with you every step of the way.', isVisible: true },
      { id: 'v4', icon: 'Lightbulb', title: 'Creative Excellence', description: 'We push boundaries to create memorable, impactful digital experiences.', isVisible: true },
    ],
    stats: [
      { id: 's1', value: '50+', label: 'Projects Delivered', isVisible: true },
      { id: 's2', value: '30+', label: 'Happy Clients', isVisible: true },
      { id: 's3', value: '5+', label: 'Years Experience', isVisible: true },
      { id: 's4', value: '99%', label: 'Client Satisfaction', isVisible: true },
    ],
  },
  contact: {
    settings: {
      id: 'contact',
      pageName: 'Contact',
      pageTitle: 'Let\'s Create Together',
      pageSubtitle: 'Ready to transform your ideas into digital reality? We\'re here to help bring your vision to life.',
      isPublished: true,
      lastUpdated: new Date().toISOString(),
    },
    sections: [
      { id: 'hero', type: 'hero', title: 'Get In Touch', subtitle: 'Let\'s Create Together', isVisible: true },
      { id: 'cta', type: 'cta', title: 'Start a Conversation', description: 'Click below to open our contact form. Tell us about your project and we\'ll get back to you within 24 hours.', isVisible: true },
    ],
    info: [
      { id: 'c1', icon: 'Mail', label: 'Email', value: 'hello@godigital.io', href: 'mailto:hello@godigital.io', isVisible: true },
      { id: 'c2', icon: 'Phone', label: 'Phone', value: '+91 76003 23130', href: 'tel:+917600323130', isVisible: true },
      { id: 'c3', icon: 'MapPin', label: 'Location', value: 'Mumbai, India', href: '#', isVisible: true },
      { id: 'c4', icon: 'Clock', label: 'Working Hours', value: 'Mon-Sat, 9AM-7PM IST', href: '#', isVisible: true },
    ],
    faqs: [
      { id: 'f1', question: 'How long does a typical project take?', answer: 'Most projects are completed within 2-8 weeks depending on complexity. We provide detailed timelines during our initial consultation.', isVisible: true },
      { id: 'f2', question: 'What is your pricing model?', answer: 'We offer flexible pricing including fixed-price packages and custom quotes. Our packages start at ₹2,999 for starter websites.', isVisible: true },
      { id: 'f3', question: 'Do you provide ongoing support?', answer: 'Yes! We offer maintenance packages and are always available for updates, bug fixes, and improvements after launch.', isVisible: true },
      { id: 'f4', question: 'Can you work with my existing brand guidelines?', answer: 'Absolutely. We seamlessly integrate with existing brand identities or can help create new ones from scratch.', isVisible: true },
    ],
  },
  privacy: {
    settings: {
      id: 'privacy',
      pageName: 'Privacy Policy',
      pageTitle: 'Privacy Policy',
      pageSubtitle: 'Your privacy is important to us. Learn how we collect, use, and protect your information.',
      isPublished: true,
      lastUpdated: new Date().toISOString(),
    },
    sections: [
      { id: 'p1', title: 'Information We Collect', content: 'We collect information you provide directly to us, such as when you fill out a contact form, request a quote, or communicate with us. This may include your name, email address, phone number, company name, and project details.', order: 1, isVisible: true },
      { id: 'p2', title: 'How We Use Your Information', content: 'We use the information we collect to respond to your inquiries, provide our services, send project updates, and improve our website. We may also use your information to send occasional marketing communications, which you can opt out of at any time.', order: 2, isVisible: true },
      { id: 'p3', title: 'Information Sharing', content: 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as necessary to provide our services or as required by law.', order: 3, isVisible: true },
      { id: 'p4', title: 'Data Security', content: 'We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.', order: 4, isVisible: true },
      { id: 'p5', title: 'Cookies', content: 'Our website may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, though this may affect some website functionality.', order: 5, isVisible: true },
      { id: 'p6', title: 'Contact Us', content: 'If you have any questions about this Privacy Policy, please contact us at hello@godigital.io', order: 6, isVisible: true },
    ],
  },
  terms: {
    settings: {
      id: 'terms',
      pageName: 'Terms of Service',
      pageTitle: 'Terms of Service',
      pageSubtitle: 'Please read these terms carefully before using our services.',
      isPublished: true,
      lastUpdated: new Date().toISOString(),
    },
    sections: [
      { id: 't1', title: 'Acceptance of Terms', content: 'By accessing and using our website or services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.', order: 1, isVisible: true },
      { id: 't2', title: 'Services Description', content: 'GODIGITAL provides web design, development, branding, and digital marketing services. The specific scope of each project will be outlined in individual proposals and contracts.', order: 2, isVisible: true },
      { id: 't3', title: 'Payment Terms', content: 'Payment terms vary by project and will be specified in your contract. Generally, we require a deposit before work begins, with the balance due upon project completion or in installments as agreed.', order: 3, isVisible: true },
      { id: 't4', title: 'Intellectual Property', content: 'Upon full payment, you will own the final deliverables as specified in your contract. We retain the right to display completed work in our portfolio unless otherwise agreed.', order: 4, isVisible: true },
      { id: 't5', title: 'Revisions and Changes', content: 'Each project includes a specified number of revision rounds. Additional revisions or scope changes may incur extra charges, which will be communicated and agreed upon before proceeding.', order: 5, isVisible: true },
      { id: 't6', title: 'Limitation of Liability', content: 'GODIGITAL shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.', order: 6, isVisible: true },
      { id: 't7', title: 'Termination', content: 'Either party may terminate a project with written notice. In such cases, you will be responsible for payment for all work completed up to the termination date.', order: 7, isVisible: true },
      { id: 't8', title: 'Changes to Terms', content: 'We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.', order: 8, isVisible: true },
    ],
  },
};

// Helper functions
export const getSiteContent = (): SiteContent => {
  const stored = localStorage.getItem('godigital_site_content');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultSiteContent;
    }
  }
  return defaultSiteContent;
};

export const saveSiteContent = (content: SiteContent): void => {
  localStorage.setItem('godigital_site_content', JSON.stringify(content));
};

export const getPageContent = <K extends keyof SiteContent>(page: K): SiteContent[K] => {
  const content = getSiteContent();
  return content[page];
};

export const savePageContent = <K extends keyof SiteContent>(page: K, data: SiteContent[K]): void => {
  const content = getSiteContent();
  content[page] = data;
  saveSiteContent(content);
};
