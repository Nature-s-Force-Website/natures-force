// Modern UI Component Types for Page Builder
export interface BaseComponentProps {
  id: string
  type: string
  data: Record<string, any>
}

export interface ComponentDefinition {
  type: string
  name: string
  description: string
  category: 'hero' | 'content' | 'media' | 'social' | 'business' | 'interactive'
  icon: string
  preview: string
  defaultData: Record<string, any>
  fields: ComponentField[]
}

export interface ComponentField {
  key: string
  label: string
  type: 'text' | 'textarea' | 'image' | 'color' | 'select' | 'number' | 'boolean' | 'url'
  required?: boolean
  options?: { label: string; value: string }[]
  placeholder?: string
  description?: string
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
      features: [
        {
          icon: '📦',
          title: 'Contract Packing',
          description: 'Professional packaging services for all your products.'
        },
        {
          icon: '🚚',
          title: 'Logistics Support',
          description: 'End-to-end logistics and distribution solutions.'
        },
        {
          icon: '🔍',
          title: 'Quality Control',
          description: 'Rigorous quality checks ensure perfect results.'
        }
      ]
    },
    fields: [
      { key: 'title', label: 'Section Title', type: 'text' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'text' },
      // Features would be handled as a dynamic array
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
      testimonials: [
        {
          name: 'John Smith',
          company: 'ABC Manufacturing',
          text: 'NaturesForce has been our trusted packaging partner for over 5 years.',
          image: '',
          rating: 5
        },
        {
          name: 'Sarah Johnson',
          company: 'XYZ Products',
          text: 'Exceptional service and attention to detail. Highly recommended!',
          image: '',
          rating: 5
        }
      ]
    },
    fields: [
      { key: 'title', label: 'Section Title', type: 'text' }
      // Testimonials would be handled as a dynamic array
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
      description: 'Contact us today for a free consultation and quote.',
      ctaText: 'Contact Us Now',
      ctaLink: '/contact',
      backgroundColor: '#1f2937',
      textColor: '#ffffff'
    },
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'ctaText', label: 'Button Text', type: 'text' },
      { key: 'ctaLink', label: 'Button Link', type: 'url' },
      { key: 'backgroundColor', label: 'Background Color', type: 'color' },
      { key: 'textColor', label: 'Text Color', type: 'color' }
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
      stats: [
        { number: '500+', label: 'Happy Clients' },
        { number: '10M+', label: 'Packages Delivered' },
        { number: '15+', label: 'Years Experience' },
        { number: '99.9%', label: 'Quality Rate' }
      ],
      backgroundColor: '#f9fafb'
    },
    fields: [
      { key: 'title', label: 'Section Title', type: 'text' },
      { key: 'backgroundColor', label: 'Background Color', type: 'color' }
      // Stats would be handled as a dynamic array
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
      images: [],
      columns: 3,
      spacing: 'normal'
    },
    fields: [
      { key: 'title', label: 'Gallery Title', type: 'text' },
      { key: 'subtitle', label: 'Gallery Subtitle', type: 'text' },
      { 
        key: 'columns', 
        label: 'Columns', 
        type: 'select',
        options: [
          { label: '2 Columns', value: '2' },
          { label: '3 Columns', value: '3' },
          { label: '4 Columns', value: '4' }
        ]
      }
      // Images would be handled as a dynamic array
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
      members: [
        {
          name: 'Jane Doe',
          position: 'Operations Manager',
          image: '',
          bio: 'Leading our operations with over 10 years of experience.',
          linkedin: '',
          email: ''
        }
      ]
    },
    fields: [
      { key: 'title', label: 'Section Title', type: 'text' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'text' }
      // Team members would be handled as a dynamic array
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
      description: 'Ready to discuss your packaging needs? Contact us today.',
      phone: '+1 (555) 123-4567',
      email: 'info@naturesforce.com',
      address: '123 Business St, City, State 12345',
      showMap: true,
      showContactForm: true
    },
    fields: [
      { key: 'title', label: 'Section Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'phone', label: 'Phone Number', type: 'text' },
      { key: 'email', label: 'Email Address', type: 'text' },
      { key: 'address', label: 'Physical Address', type: 'textarea' },
      { key: 'showMap', label: 'Show Map', type: 'boolean' },
      { key: 'showContactForm', label: 'Show Contact Form', type: 'boolean' }
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
      faqs: [
        {
          question: 'What types of products do you package?',
          answer: 'We handle a wide variety of products including consumer goods, food items, electronics, and more.'
        },
        {
          question: 'What is your typical turnaround time?',
          answer: 'Our standard turnaround time is 3-5 business days, depending on the complexity and volume of the project.'
        }
      ]
    },
    fields: [
      { key: 'title', label: 'Section Title', type: 'text' },
      { key: 'subtitle', label: 'Section Subtitle', type: 'text' }
      // FAQs would be handled as a dynamic array
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