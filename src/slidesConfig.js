// src/slidesConfig.js

// Use dynamic imports to load slide components only when needed.
const slides = [
  {
    title: 'Welcome to the Presentation',
    component: () => import('./slides/Slide1.jsx'),
    // BaseSlide properties
    footerText: '© 2023 Presentation App - Introduction Slide',
    backgroundColor: '#121212', // Dark background
    titleColor: '#ffffff', // White title
    textColor: '#ffffff' // White text
  },
  {
    title: 'Core Features',
    component: () => import('./slides/Slide2.jsx'),
    // BaseSlide properties
    footerText: '© 2023 Presentation App - Features Slide',
    backgroundColor: '#121212', // Dark background
    titleColor: '#ffffff', // White title
    textColor: '#ffffff' // White text
  },
  {
    title: 'PDF Export Example',
    component: () => import('./slides/Slide3.jsx'),
    // BaseSlide properties
    footerText: '© 2023 Presentation App - PDF Export Slide',
    backgroundColor: '#121212', // Dark background
    titleColor: '#ffffff', // White title
    textColor: '#ffffff' // White text
  }
];

export default slides; 