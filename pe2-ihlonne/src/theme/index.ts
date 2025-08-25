import {
  createSystem,
  defaultConfig,
  defineConfig,
} from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    breakpoints: {
      sm: '320px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
    tokens: {
      fonts: {
        heading: { value: 'Inria Serif, serif' },
        body: {
          value:
            'Albert Sans Variable, sans-serif',
        },
      },
      colors: {
        brand100: { value: '#ffffff' },
        brand200: { value: '#f6f6f6' },
        brand300: { value: '#ededed' },
        brand400: { value: '#cccccc' },
        brand500: { value: '#d8d0c5' },
        brand600: { value: '#7e9da4' },
        brand700: { value: '#721825' },
        brand800: { value: '#120D1E' },
        active: { value: '#00FFB7' },
      },
    },
    semanticTokens: {
      colors: {
        danger: { value: '{colors.red}' },
      },
    },
    recipes: {
      Button: {
        base: {
          borderRadius: 'sm',
          fontWeight: 'semibold',
        },
      },
    },
  },
});

export default createSystem(
  defaultConfig,
  config
);
