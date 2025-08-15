export interface AppConfig {
  api: {
    baseUrl: string;
    timeout: number;
    retries: number;
  };
  features: {
    demo: boolean;
    analytics: boolean;
    errorReporting: boolean;
  };
  layers: {
    count: number;
    names: string[];
    descriptions: string[];
  };
}

// Default configuration
const defaultConfig: AppConfig = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    timeout: 30000, // 30 seconds
    retries: 3,
  },
  features: {
    demo: true,
    analytics: process.env.NODE_ENV === 'production',
    errorReporting: process.env.NODE_ENV === 'production',
  },
  layers: {
    count: 7,
    names: [
      'Configuration Modernization',
      'Content Standardization', 
      'Component Intelligence',
      'SSR/Hydration Safety',
      'Next.js App Router Optimization',
      'Testing & Validation',
      'Adaptive Pattern Learning'
    ],
    descriptions: [
      'TypeScript, Next.js, and package.json updates',
      'Pattern fixes, entity cleanup, and syntax modernization',
      'React component modernization with accessibility and TypeScript',
      'Client-server consistency and hydration error prevention',
      'App Router migration and optimization',
      'Automated test generation and testing library updates',
      'Machine learning-based pattern detection and custom rules'
    ]
  }
};

// Environment-specific overrides
const getConfig = (): AppConfig => {
  const config = { ...defaultConfig };

  // Development overrides
  if (process.env.NODE_ENV === 'development') {
    config.api.baseUrl = 'http://localhost:3000/api';
    config.features.demo = true;
    config.features.analytics = false;
    config.features.errorReporting = false;
  }

  // Production overrides
  if (process.env.NODE_ENV === 'production') {
    config.api.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://app.neurolint.dev/api';
    config.features.demo = false;
    config.features.analytics = true;
    config.features.errorReporting = true;
  }

  return config;
};

export const appConfig = getConfig();

// Helper functions
export const getApiUrl = (endpoint: string): string => {
  return `${appConfig.api.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};

export const getLayerInfo = (layerId: number) => {
  if (layerId < 1 || layerId > appConfig.layers.count) {
    return null;
  }
  
  return {
    id: layerId,
    name: appConfig.layers.names[layerId - 1],
    description: appConfig.layers.descriptions[layerId - 1],
  };
};

export const getAllLayers = () => {
  return Array.from({ length: appConfig.layers.count }, (_, i) => i + 1).map(layerId => ({
    id: layerId,
    name: appConfig.layers.names[layerId - 1],
    description: appConfig.layers.descriptions[layerId - 1],
  }));
}; 