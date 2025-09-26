// Modern UI Component Types for Page Builder
export interface BaseComponentProps {
  id: string
  type: string
  data: Record<string, unknown>
}

export interface ComponentDefinition {
  type: string
  name: string
  description: string
  category: 'hero' | 'content' | 'media' | 'social' | 'business' | 'interactive'
  icon: string
  preview: string
  defaultData: Record<string, unknown>
  fields: ComponentField[]
}

export interface ComponentField {
  key: string
  label: string
  type: 'text' | 'textarea' | 'image' | 'color' | 'select' | 'number' | 'boolean' | 'url' | 'array' | 'object'
  required?: boolean
  options?: { label: string; value: string }[]
  placeholder?: string
  description?: string
  arrayFields?: ComponentField[] // For array type fields
  objectFields?: ComponentField[] // For object type fields
  min?: number // For array minimum items
  max?: number // For array maximum items
}

// Available Component Types
export const COMPONENT_TYPES: ComponentDefinition[] = [
  // HERO SECTIONS
  {
    type: 'hero_banner',
    name: 'Hero Banner',
    description: 'Full-width hero section with background image, title, and CTA',
    category: 'hero',
    icon: '🎯',
    preview: '/previews/hero-banner.jpg',
    defaultData: {
      title: 'Welcome to NaturesForce',
      subtitle: 'Premium Contract Packing Services',
      description: 'We provide reliable, efficient contract packing solutions for your business needs.',
      badge: 'Trusted Since 2020',
      backgroundImage: '',
      ctaText: 'Get Started',
      ctaLink: '/contact',
      secondaryCtaText: 'Learn More',
      secondaryCtaLink: '/about',
      trustText: 'Trusted by 500+ Australian businesses',
      textAlign: 'center',
      overlayOpacity: 0.85
    },
    fields: [
      { key: 'badge', label: 'Badge Text', type: 'text', description: 'Small badge/label above the title' },
      { key: 'title', label: 'Main Title', type: 'text', required: true },
      { key: 'subtitle', label: 'Subtitle', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'backgroundImage', label: 'Background Image', type: 'image' },
      { key: 'ctaText', label: 'Primary Button Text', type: 'text' },
      { key: 'ctaLink', label: 'Primary Button Link', type: 'url' },
      { key: 'secondaryCtaText', label: 'Secondary Button Text', type: 'text' },
      { key: 'secondaryCtaLink', label: 'Secondary Button Link', type: 'url' },
      { key: 'trustText', label: 'Trust Indicator Text', type: 'text', description: 'Small text below buttons' },
      { 
        key: 'textAlign', 
        label: 'Text Alignment', 
        type: 'select',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
          { label: 'Right', value: 'right' }
        ]
      },
      { key: 'overlayOpacity', label: 'Overlay Opacity', type: 'number', description: 'Controls background overlay darkness (0-1)' }
    ]
  },

  {
    type: 'hero_split',
    name: 'Split Hero',
    description: 'Two-column hero with image on one side, content on the other',
    category: 'hero',
    icon: '⚡',
    preview: '/previews/hero-split.jpg',
    defaultData: {
      title: 'Professional Contract Packing',
      description: 'Expert packaging solutions tailored to your business requirements. Quality, efficiency, and reliability guaranteed.',
      image: '',
      ctaText: 'Learn More',
      ctaLink: '/services',
      imagePosition: 'right',
      backgroundColor: '#ffffff'
    },
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'image', label: 'Hero Image', type: 'image' },
      { key: 'ctaText', label: 'Button Text', type: 'text' },
      { key: 'ctaLink', label: 'Button Link', type: 'url' },
      { 
        key: 'imagePosition', 
        label: 'Image Position', 
        type: 'select',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Right', value: 'right' }
        ]
      },
      { key: 'backgroundColor', label: 'Background Color', type: 'color' }
    ]
  },

  // CONTENT SECTIONS
  {
    type: 'feature_grid',
    name: 'Feature Grid',
    description: '3-column grid showcasing features or services',
    category: 'content',
    icon: '🏗️',
    preview: '/previews/feature-grid.jpg',
    defaultData: {
      title: 'Our Services',
      subtitle: 'What we offer',
      description: 'Comprehensive solutions tailored to your business needs',
      backgroundColor: '#ffffff',
      features: [
        {
          icon: '📦',
          title: 'Contract Packing',
          description: 'Professional packaging services for all your products.',
          image: '',
          link: '/services/packing'
        },
        {
          icon: '🚚',
          title: 'Logistics Support',
          description: 'End-to-end logistics and distribution solutions.',
          image: '',
          link: '/services/logistics'
        },
        {
          icon: '🔍',
          title: 'Quality Control',
          description: 'Rigorous quality checks ensure perfect results.',
          image: '',
          link: '/services/quality'
        }
      ]
    },
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', required: true },
      { key: 'subtitle', label: 'Section Subtitle', type: 'text' },
      { key: 'description', label: 'Section Description', type: 'textarea' },
      { key: 'backgroundColor', label: 'Background Color', type: 'color' },
      {
        key: 'features',
        label: 'Features',
        type: 'array',
        min: 1,
        max: 6,
        arrayFields: [
          { key: 'icon', label: 'Icon (Emoji)', type: 'text', placeholder: '📦' },
          { key: 'title', label: 'Feature Title', type: 'text', required: true },
          { key: 'description', label: 'Feature Description', type: 'textarea', required: true },
          { key: 'image', label: 'Feature Image', type: 'image' },
          { key: 'link', label: 'Feature Link', type: 'url' }
        ]
      }
    ]
  },

  {
    type: 'what_we_offer_card',
    name: 'What We Offer Card',
    description: 'Professional card layout showcasing services with bullet points',
    category: 'content',
    icon: '📋',
    preview: '/previews/what-we-offer-card.jpg',
    defaultData: {
      title: 'What We Offer',
      subtitle: 'Our comprehensive services and capabilities',
      cardStyle: 'default',
      layout: 'split',
      image: '',
      showCTA: true,
      ctaText: 'Learn More',
      ctaLink: '/contact',
      items: [
        {
          text: 'Custom ingredient sourcing & blending to your exact formulas'
        },
        {
          text: 'Bulk, retail, and trial-size filling'
        },
        {
          text: 'White label & private label services'
        },
        {
          text: 'Flexible packaging options: bottles, jars, pouches, tubes, pumps, sprays, buckets'
        },
        {
          text: 'Small batch production & no minimum order requirement (ideal for startups)'
        },
        {
          text: 'Label design, packaging sourcing, and eco-friendly packaging options'
        },
        {
          text: 'Compliance, quality control & documentation (safety, regulatory)'
        },
        {
          text: 'Liquid, cream, powder, or gel filling as required'
        }
      ]
    },
    fields: [
      { key: 'title', label: 'Card Title', type: 'text', required: true },
      { key: 'subtitle', label: 'Card Subtitle', type: 'text' },
      { 
        key: 'cardStyle', 
        label: 'Card Style', 
        type: 'select',
        options: [
          { label: 'Default', value: 'default' },
          { label: 'Gradient', value: 'gradient' },
          { label: 'Bordered', value: 'bordered' }
        ]
      },
      { 
        key: 'layout', 
        label: 'Layout', 
        type: 'select',
        options: [
          { label: 'Split (Image + Content)', value: 'split' },
          { label: 'Stacked (Image Above)', value: 'stacked' }
        ]
      },
      { key: 'image', label: 'Image', type: 'image' },
      { key: 'showCTA', label: 'Show Call-to-Action Button', type: 'boolean' },
      { key: 'ctaText', label: 'CTA Button Text', type: 'text', placeholder: 'Get a Custom Quote' },
      { key: 'ctaLink', label: 'CTA Button Link', type: 'url', placeholder: '/contact' },
      {
        key: 'items',
        label: 'Service Items',
        type: 'array',
        min: 1,
        max: 15,
        arrayFields: [
          { key: 'text', label: 'Service Description', type: 'textarea', required: true }
        ]
      }
    ]
  },

  {
    type: 'testimonials',
    name: 'Testimonials',
    description: 'Customer testimonials in an elegant card layout',
    category: 'social',
    icon: '💬',
    preview: '/previews/testimonials.jpg',
    defaultData: {
      title: 'What Our Clients Say',
      subtitle: 'Don\'t just take our word for it',
      description: 'Hear from businesses who trust us with their packaging needs',
      backgroundColor: '#f9fafb',
      testimonials: [
        {
          name: 'John Smith',
          company: 'ABC Manufacturing',
          position: 'CEO',
          text: 'NaturesForce has been our trusted packaging partner for over 5 years. Their attention to detail and quality is unmatched.',
          image: '',
          rating: 5
        },
        {
          name: 'Sarah Johnson',
          company: 'XYZ Products',
          position: 'Operations Manager',
          text: 'Exceptional service and attention to detail. The team goes above and beyond to ensure our products are perfectly packaged.',
          image: '',
          rating: 5
        },
        {
          name: 'Michael Chen',
          company: 'Green Solutions',
          position: 'Founder',
          text: 'Professional, reliable, and cost-effective. NaturesForce has helped us scale our business with confidence.',
          image: '',
          rating: 5
        }
      ]
    },
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', required: true },
      { key: 'subtitle', label: 'Section Subtitle', type: 'text' },
      { key: 'description', label: 'Section Description', type: 'textarea' },
      { key: 'backgroundColor', label: 'Background Color', type: 'color' },
      {
        key: 'testimonials',
        label: 'Testimonials',
        type: 'array',
        min: 1,
        max: 6,
        arrayFields: [
          { key: 'name', label: 'Client Name', type: 'text', required: true },
          { key: 'company', label: 'Company Name', type: 'text', required: true },
          { key: 'position', label: 'Position/Title', type: 'text' },
          { key: 'text', label: 'Testimonial Text', type: 'textarea', required: true },
          { key: 'image', label: 'Client Photo', type: 'image' },
          { key: 'rating', label: 'Rating (1-5)', type: 'number', min: 1, max: 5 }
        ]
      }
    ]
  },

  {
    type: 'cta_section',
    name: 'Call to Action',
    description: 'Prominent call-to-action section with background',
    category: 'business',
    icon: '📢',
    preview: '/previews/cta-section.jpg',
    defaultData: {
      title: 'Ready to Get Started?',
      subtitle: 'Take the next step',
      description: 'Contact us today for a free consultation and quote.',
      backgroundImage: '',
      backgroundColor: '#1f2937',
      textColor: '#ffffff',
      ctaText: 'Contact Us Now',
      ctaLink: '/contact',
      secondaryCtaText: 'Learn More',
      secondaryCtaLink: '/about',
      overlayOpacity: 0.7,
      textAlign: 'center'
    },
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'subtitle', label: 'Subtitle', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'backgroundImage', label: 'Background Image', type: 'image' },
      { key: 'backgroundColor', label: 'Background Color', type: 'color' },
      { key: 'textColor', label: 'Text Color', type: 'color' },
      { key: 'ctaText', label: 'Primary Button Text', type: 'text' },
      { key: 'ctaLink', label: 'Primary Button Link', type: 'url' },
      { key: 'secondaryCtaText', label: 'Secondary Button Text', type: 'text' },
      { key: 'secondaryCtaLink', label: 'Secondary Button Link', type: 'url' },
      { key: 'overlayOpacity', label: 'Background Overlay Opacity', type: 'number', min: 0, max: 1 },
      { 
        key: 'textAlign', 
        label: 'Text Alignment', 
        type: 'select',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
          { label: 'Right', value: 'right' }
        ]
      }
    ]
  },

  {
    type: 'stats_section',
    name: 'Statistics',
    description: 'Display impressive business statistics and achievements',
    category: 'business',
    icon: '📊',
    preview: '/previews/stats-section.jpg',
    defaultData: {
      title: 'Our Track Record',
      subtitle: 'Numbers that speak for themselves',
      description: 'Trusted by businesses across Australia',
      backgroundColor: '#f9fafb',
      textColor: '#111827',
      stats: [
        { 
          number: '500+', 
          label: 'Happy Clients',
          description: 'Businesses trust us',
          icon: '👥'
        },
        { 
          number: '10M+', 
          label: 'Packages Delivered',
          description: 'Products processed',
          icon: '📦'
        },
        { 
          number: '15+', 
          label: 'Years Experience',
          description: 'In the industry',
          icon: '⭐'
        },
        { 
          number: '99.9%', 
          label: 'Quality Rate',
          description: 'Satisfaction guarantee',
          icon: '✅'
        }
      ]
    },
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', required: true },
      { key: 'subtitle', label: 'Section Subtitle', type: 'text' },
      { key: 'description', label: 'Section Description', type: 'textarea' },
      { key: 'backgroundColor', label: 'Background Color', type: 'color' },
      { key: 'textColor', label: 'Text Color', type: 'color' },
      {
        key: 'stats',
        label: 'Statistics',
        type: 'array',
        min: 1,
        max: 6,
        arrayFields: [
          { key: 'number', label: 'Statistic Number', type: 'text', required: true, placeholder: '500+' },
          { key: 'label', label: 'Statistic Label', type: 'text', required: true, placeholder: 'Happy Clients' },
          { key: 'description', label: 'Statistic Description', type: 'text', placeholder: 'Businesses trust us' },
          { key: 'icon', label: 'Icon (Emoji)', type: 'text', placeholder: '👥' }
        ]
      }
    ]
  },

  {
    type: 'image_gallery',
    name: 'Image Gallery',
    description: 'Responsive image gallery with lightbox functionality',
    category: 'media',
    icon: '🖼️',
    preview: '/previews/image-gallery.jpg',
    defaultData: {
      title: 'Our Facilities',
      subtitle: 'Take a look at our state-of-the-art packaging facilities',
      description: 'Modern equipment and clean environments ensure quality results',
      backgroundColor: '#ffffff',
      columns: 3,
      spacing: 'normal',
      images: [
        {
          src: '',
          alt: 'Packaging facility interior',
          title: 'Main Production Floor',
          description: 'Our spacious production floor with modern equipment'
        },
        {
          src: '',
          alt: 'Quality control station',
          title: 'Quality Control',
          description: 'Rigorous testing ensures product quality'
        },
        {
          src: '',
          alt: 'Storage warehouse',
          title: 'Storage Facility',
          description: 'Climate-controlled storage for optimal preservation'
        }
      ]
    },
    fields: [
      { key: 'title', label: 'Gallery Title', type: 'text', required: true },
      { key: 'subtitle', label: 'Gallery Subtitle', type: 'text' },
      { key: 'description', label: 'Gallery Description', type: 'textarea' },
      { key: 'backgroundColor', label: 'Background Color', type: 'color' },
      { 
        key: 'columns', 
        label: 'Columns', 
        type: 'select',
        options: [
          { label: '2 Columns', value: '2' },
          { label: '3 Columns', value: '3' },
          { label: '4 Columns', value: '4' }
        ]
      },
      { 
        key: 'spacing', 
        label: 'Image Spacing', 
        type: 'select',
        options: [
          { label: 'Tight', value: 'tight' },
          { label: 'Normal', value: 'normal' },
          { label: 'Wide', value: 'wide' }
        ]
      },
      {
        key: 'images',
        label: 'Images',
        type: 'array',
        min: 1,
        max: 12,
        arrayFields: [
          { key: 'src', label: 'Image URL', type: 'image', required: true },
          { key: 'alt', label: 'Alt Text', type: 'text', required: true },
          { key: 'title', label: 'Image Title', type: 'text' },
          { key: 'description', label: 'Image Description', type: 'textarea' }
        ]
      }
    ]
  },

  {
    type: 'team_profiles',
    name: 'Team Profiles',
    description: 'Team member cards with photos and information',
    category: 'business',
    icon: '👥',
    preview: '/previews/team-profiles.jpg',
    defaultData: {
      title: 'Meet Our Team',
      subtitle: 'The experts behind our success',
      description: 'Our dedicated professionals bring years of experience and expertise',
      backgroundColor: '#ffffff',
      layout: 'grid',
      members: [
        {
          name: 'Jane Doe',
          position: 'Operations Manager',
          image: '',
          bio: 'Leading our operations with over 10 years of experience in contract manufacturing and packaging.',
          linkedin: '',
          email: '',
          phone: '',
          expertise: ['Operations', 'Quality Control', 'Team Leadership']
        },
        {
          name: 'John Smith',
          position: 'Quality Assurance Director',
          image: '',
          bio: 'Ensuring every product meets our rigorous quality standards with attention to detail.',
          linkedin: '',
          email: '',
          phone: '',
          expertise: ['Quality Control', 'Compliance', 'Process Improvement']
        }
      ]
    },
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', required: true },
      { key: 'subtitle', label: 'Section Subtitle', type: 'text' },
      { key: 'description', label: 'Section Description', type: 'textarea' },
      { key: 'backgroundColor', label: 'Background Color', type: 'color' },
      { 
        key: 'layout', 
        label: 'Layout Style', 
        type: 'select',
        options: [
          { label: 'Grid Layout', value: 'grid' },
          { label: 'Carousel', value: 'carousel' },
          { label: 'List View', value: 'list' }
        ]
      },
      {
        key: 'members',
        label: 'Team Members',
        type: 'array',
        min: 1,
        max: 8,
        arrayFields: [
          { key: 'name', label: 'Full Name', type: 'text', required: true },
          { key: 'position', label: 'Job Title', type: 'text', required: true },
          { key: 'image', label: 'Profile Photo', type: 'image' },
          { key: 'bio', label: 'Biography', type: 'textarea' },
          { key: 'linkedin', label: 'LinkedIn URL', type: 'url' },
          { key: 'email', label: 'Email Address', type: 'text' },
          { key: 'phone', label: 'Phone Number', type: 'text' },
          { 
            key: 'expertise', 
            label: 'Areas of Expertise', 
            type: 'array',
            min: 0,
            max: 5,
            arrayFields: [
              { key: 'skill', label: 'Skill/Expertise', type: 'text' }
            ]
          }
        ]
      }
    ]
  },

  {
    type: 'contact_section',
    name: 'Contact Information',
    description: 'Contact details with map and contact form',
    category: 'business',
    icon: '📞',
    preview: '/previews/contact-section.jpg',
    defaultData: {
      title: 'Get in Touch',
      subtitle: 'Ready to discuss your packaging needs?',
      description: 'Contact us today for a free consultation and quote. Our team is here to help.',
      backgroundColor: '#f9fafb',
      layout: 'split', // split, stacked, form-only
      contactInfo: {
        phone: '+1 (555) 123-4567',
        email: 'info@naturesforce.com',
        address: '123 Business St, City, State 12345',
        hours: 'Mon-Fri: 8AM-6PM',
        website: 'www.naturesforce.com'
      },
      showMap: true,
      mapAddress: '123 Business St, City, State 12345',
      showContactForm: true,
      formFields: [
        { name: 'name', label: 'Full Name', type: 'text', required: true },
        { name: 'email', label: 'Email Address', type: 'email', required: true },
        { name: 'phone', label: 'Phone Number', type: 'tel', required: false },
        { name: 'company', label: 'Company Name', type: 'text', required: false },
        { name: 'message', label: 'Message', type: 'textarea', required: true }
      ],
      socialLinks: [
        { platform: 'LinkedIn', url: '', icon: 'linkedin' },
        { platform: 'Facebook', url: '', icon: 'facebook' }
      ]
    },
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', required: true },
      { key: 'subtitle', label: 'Section Subtitle', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'backgroundColor', label: 'Background Color', type: 'color' },
      { 
        key: 'layout', 
        label: 'Layout Style', 
        type: 'select',
        options: [
          { label: 'Split (Info + Form)', value: 'split' },
          { label: 'Stacked', value: 'stacked' },
          { label: 'Form Only', value: 'form-only' }
        ]
      },
      {
        key: 'contactInfo',
        label: 'Contact Information',
        type: 'object',
        objectFields: [
          { key: 'phone', label: 'Phone Number', type: 'text' },
          { key: 'email', label: 'Email Address', type: 'text' },
          { key: 'address', label: 'Physical Address', type: 'textarea' },
          { key: 'hours', label: 'Business Hours', type: 'text' },
          { key: 'website', label: 'Website URL', type: 'url' }
        ]
      },
      { key: 'showMap', label: 'Show Map', type: 'boolean' },
      { key: 'mapAddress', label: 'Map Address', type: 'textarea' },
      { key: 'showContactForm', label: 'Show Contact Form', type: 'boolean' },
      {
        key: 'socialLinks',
        label: 'Social Media Links',
        type: 'array',
        min: 0,
        max: 6,
        arrayFields: [
          { key: 'platform', label: 'Platform Name', type: 'text', required: true },
          { key: 'url', label: 'Profile URL', type: 'url', required: true },
          { 
            key: 'icon', 
            label: 'Icon Type', 
            type: 'select',
            options: [
              { label: 'LinkedIn', value: 'linkedin' },
              { label: 'Facebook', value: 'facebook' },
              { label: 'Twitter', value: 'twitter' },
              { label: 'Instagram', value: 'instagram' },
              { label: 'YouTube', value: 'youtube' }
            ]
          }
        ]
      }
    ]
  },

  {
    type: 'faq_section',
    name: 'FAQ Accordion',
    description: 'Frequently asked questions in collapsible format',
    category: 'interactive',
    icon: '❓',
    preview: '/previews/faq-section.jpg',
    defaultData: {
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about our services',
      description: 'Get answers to the most common questions about our contract packing services',
      backgroundColor: '#ffffff',
      accordionStyle: 'bordered', // bordered, minimal, cards
      allowMultiple: false, // Allow multiple FAQs to be open at once
      faqs: [
        {
          question: 'What types of products do you package?',
          answer: 'We handle a wide variety of products including consumer goods, food items, electronics, cosmetics, supplements, and more. Our facilities are equipped to handle both small and large-scale packaging projects.',
          category: 'Services',
          featured: true
        },
        {
          question: 'What is your typical turnaround time?',
          answer: 'Our standard turnaround time is 3-5 business days for most projects, depending on the complexity and volume. Rush orders can often be accommodated with advance notice.',
          category: 'Timeline',
          featured: true
        },
        {
          question: 'Do you provide quality assurance testing?',
          answer: 'Yes, we have comprehensive quality control measures in place including visual inspections, weight checks, seal integrity testing, and compliance verification.',
          category: 'Quality',
          featured: false
        },
        {
          question: 'What packaging materials do you work with?',
          answer: 'We work with a variety of packaging materials including plastic bottles, glass containers, pouches, boxes, tubes, and sustainable packaging options.',
          category: 'Materials',
          featured: false
        }
      ]
    },
    fields: [
      { key: 'title', label: 'Section Title', type: 'text', required: true },
      { key: 'subtitle', label: 'Section Subtitle', type: 'text' },
      { key: 'description', label: 'Section Description', type: 'textarea' },
      { key: 'backgroundColor', label: 'Background Color', type: 'color' },
      { 
        key: 'accordionStyle', 
        label: 'Accordion Style', 
        type: 'select',
        options: [
          { label: 'Bordered', value: 'bordered' },
          { label: 'Minimal', value: 'minimal' },
          { label: 'Card Style', value: 'cards' }
        ]
      },
      { key: 'allowMultiple', label: 'Allow Multiple Open', type: 'boolean' },
      {
        key: 'faqs',
        label: 'FAQ Items',
        type: 'array',
        min: 1,
        max: 20,
        arrayFields: [
          { key: 'question', label: 'Question', type: 'text', required: true },
          { key: 'answer', label: 'Answer', type: 'textarea', required: true },
          { key: 'category', label: 'Category', type: 'text', placeholder: 'Services, Pricing, etc.' },
          { key: 'featured', label: 'Featured FAQ', type: 'boolean', description: 'Show this FAQ prominently' }
        ]
      }
    ]
  }
]

// Helper function to get component by type
export function getComponentDefinition(type: string): ComponentDefinition | undefined {
  return COMPONENT_TYPES.find(component => component.type === type)
}

// Helper function to get components by category
export function getComponentsByCategory(category: string): ComponentDefinition[] {
  return COMPONENT_TYPES.filter(component => component.category === category)
}

// Helper function to get all categories
export function getAllCategories(): string[] {
  return [...new Set(COMPONENT_TYPES.map(component => component.category))]
}