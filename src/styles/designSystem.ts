// Design System สำหรับ LabelLink Client
// ใช้ Green theme สำหรับความสอดคล้องทั้งแอป

export const colors = {
  // Primary Green Palette (เหมือนน้องปันปัน)
  primary: {
    50: '#f0fdf4',   // from-green-50
    100: '#dcfce7',  // bg-green-100
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',  // bg-green-500
    600: '#16a34a',  // text-green-600
    700: '#15803d',
    800: '#166534',  // text-green-800
    900: '#14532d'
  },
  
  // Secondary Emerald (สำหรับ accent)
  secondary: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',  // emerald-500
    600: '#059669',  // emerald-600
    700: '#047857',
    800: '#065f46',
    900: '#064e3b'
  },

  // Status Colors
  success: {
    50: '#f0fdf4',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d'
  },
  
  warning: {
    50: '#fefce8',
    100: '#fef3c7',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207'
  },
  
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c'
  },

  // Neutral Colors
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827'
  }
};

export const gradients = {
  // Background Gradients
  backgroundLight: 'bg-gradient-to-b from-green-50 to-white',
  backgroundSoft: 'bg-gradient-to-br from-green-50 via-emerald-50 to-white',
  
  // Button Gradients  
  primaryButton: 'bg-gradient-to-r from-green-500 to-emerald-600',
  secondaryButton: 'bg-gradient-to-r from-emerald-500 to-green-600',
  accentButton: 'bg-gradient-to-r from-green-400 to-emerald-500',
  
  // Card Gradients
  cardSoft: 'bg-gradient-to-br from-green-50 to-emerald-50',
  cardElevated: 'bg-white shadow-lg shadow-green-100/50'
};

export const typography = {
  // Headings
  h1: 'text-2xl font-bold text-green-800',
  h2: 'text-xl font-bold text-green-800', 
  h3: 'text-lg font-semibold text-green-800',
  h4: 'text-base font-medium text-green-800',
  
  // Body Text
  body: 'text-green-700',
  bodySecondary: 'text-green-600',
  caption: 'text-sm text-green-600',
  small: 'text-xs text-green-500',
  
  // Interactive Text
  link: 'text-green-600 hover:text-green-700',
  linkSecondary: 'text-emerald-600 hover:text-emerald-700'
};

export const spacing = {
  // Container Padding
  containerX: 'px-4',
  containerY: 'py-6',
  
  // Section Spacing
  sectionMb: 'mb-6',
  cardSpacing: 'space-y-4',
  gridGap: 'gap-4',
  
  // Component Spacing
  buttonSpacing: 'space-x-2',
  iconSpacing: 'space-x-3'
};

export const components = {
  // Header Styles
  header: {
    container: 'bg-white shadow-sm px-4 py-4 sticky top-0 z-50',
    logo: 'w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center',
    logoText: 'text-white font-bold',
    title: 'font-bold text-green-800',
    subtitle: 'text-sm text-green-600'
  },
  
  // Button Styles
  button: {
    primary: `py-3 px-6 ${gradients.primaryButton} text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all`,
    secondary: 'py-3 px-6 bg-green-100 text-green-800 rounded-2xl font-bold hover:bg-green-200 transition-all',
    outline: 'py-3 px-6 border-2 border-green-500 text-green-700 rounded-2xl font-bold hover:bg-green-50 transition-all',
    cta: `py-4 ${gradients.primaryButton} text-white rounded-2xl font-bold text-base shadow-lg hover:shadow-xl transition-all`
  },
  
  // Card Styles
  card: {
    elevated: 'bg-white rounded-2xl shadow-lg shadow-green-100/50 p-4',
    soft: 'bg-green-50 rounded-2xl p-4 border border-green-100',
    gradient: `${gradients.cardSoft} rounded-2xl p-4 border border-green-200`,
    interactive: 'group active:scale-98 transition-transform hover:shadow-lg'
  },
  
  // Icon Container
  iconContainer: {
    primary: 'w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center',
    secondary: 'w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center',
    accent: 'w-8 h-8 bg-green-200 rounded-lg flex items-center justify-center'
  },
  
  // Status Indicators
  status: {
    active: 'w-3 h-3 rounded-full bg-green-500',
    completed: 'w-3 h-3 rounded-full bg-emerald-500', 
    pending: 'w-3 h-3 rounded-full bg-yellow-500'
  },
  
  // Bottom Navigation
  bottomNav: {
    container: 'fixed bottom-0 left-0 right-0 bg-white border-t border-green-100 shadow-lg',
    item: 'flex flex-col items-center py-3',
    itemActive: 'text-green-600',
    itemInactive: 'text-green-400 hover:text-green-600',
    icon: 'w-5 h-5 mb-1',
    label: 'text-xs font-medium'
  }
};

export const animations = {
  // Transitions
  default: 'transition-all duration-200',
  slow: 'transition-all duration-300',
  bounce: 'active:scale-95 transition-transform',
  
  // Hover Effects
  cardHover: 'hover:shadow-lg hover:-translate-y-1 transition-all',
  buttonHover: 'hover:shadow-xl hover:scale-105 transition-all'
};

// Utility Functions
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'text-green-600 bg-green-100';
    case 'completed': return 'text-emerald-600 bg-emerald-100';
    case 'pending': return 'text-yellow-600 bg-yellow-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

export const getBiasRiskColor = (risk: string) => {
  switch (risk) {
    case 'low': return 'text-green-600 bg-green-100';
    case 'medium': return 'text-yellow-600 bg-yellow-100';
    case 'high': return 'text-red-600 bg-red-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

export const getImpactBorderColor = (impact: string) => {
  switch (impact) {
    case 'low': return 'border-green-400 bg-green-50';
    case 'medium': return 'border-yellow-400 bg-yellow-50';
    case 'high': return 'border-red-400 bg-red-50';
    default: return 'border-gray-400 bg-gray-50';
  }
};

// Layout Constants
export const layout = {
  maxWidth: 'max-w-md mx-auto',
  minHeight: 'min-h-screen',
  bottomPadding: 'pb-20', // For bottom navigation
  sectionSpacing: 'space-y-6'
};