# My System - Design Style Guide

## Design Philosophy

### Visual Language
- **Theme**: Sophisticated AI companion with organic wisdom
- **Metaphor**: Digital owl companion guiding life optimization
- **Emotional Tone**: Trustworthy, intelligent, calming yet energizing
- **Aesthetic**: Modern tech meets natural wisdom

### Color Palette
- **Primary**: Deep Night Blue (#1a1a2e) - main background
- **Secondary**: Warm Ochre (#cc8b3c) - accents and highlights  
- **Tertiary**: Sage Mint (#7fb069) - success states and positive metrics
- **Neutral**: Soft Gray (#f5f5f5) - text and subtle elements
- **Accent**: Copper Rose (#c17767) - warnings and important actions

### Typography
- **Display Font**: "Tiempos Text" - bold serif for headings and hero text
- **Body Font**: "Suisse Int'l" - clean sans-serif for readability
- **Monospace**: "JetBrains Mono" - for data displays and code elements
- **Font Sizes**: Large headings (48px+), medium subheadings (24px), small body (16px)

## Visual Effects & Styling

### Background Effects
- **Primary**: Animated aurora gradient flow using shader-park
- **Secondary**: Subtle particle system representing data points
- **Texture**: Soft noise overlay for depth without distraction

### Interactive Elements
- **Cards**: Glass morphism with subtle borders and glow on hover
- **Buttons**: 3D depth with color morphing on interaction
- **Data Visualizations**: Smooth orbital animations with connecting lines
- **Navigation**: Floating elements with physics-based movement

### Animation Library Usage
- **Anime.js**: Smooth transitions and micro-interactions
- **ECharts.js**: Interactive data visualizations with custom themes
- **Shader-park**: Background aurora effects and particle systems
- **Matter.js**: Physics-based floating elements
- **p5.js**: Creative coding for data particle effects

### Header Effects
- **Hero Section**: Large animated background with floating UI elements
- **Navigation**: Semi-transparent glass effect with backdrop blur
- **Text Effects**: Color cycling emphasis on key phrases
- **Scroll Behavior**: Parallax layers with different movement speeds

## Layout & Composition

### Grid System
- **Desktop**: 12-column grid with 80px gutters
- **Tablet**: 8-column grid with 40px gutters  
- **Mobile**: 4-column grid with 20px gutters

### Spacing Scale
- **Base Unit**: 8px
- **Scale**: 8, 16, 24, 32, 48, 64, 96, 128px
- **Vertical Rhythm**: 24px baseline for text elements

### Component Hierarchy
1. **Hero Section**: Full viewport with animated background
2. **Dashboard Preview**: Interactive LifeOS simulator
3. **Feature Grid**: 5 modules with hover states
4. **Vision Section**: Timeline and philosophy
5. **Call to Action**: Waitlist signup with personalization

## Responsive Behavior

### Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px - 1440px
- **Large**: 1440px+

### Adaptive Elements
- **Navigation**: Hamburger menu on mobile, full bar on desktop
- **Dashboard**: Stacked cards on mobile, grid layout on desktop
- **Typography**: Fluid scaling based on viewport size
- **Interactions**: Touch-friendly on mobile, hover states on desktop

## Accessibility Features
- **Color Contrast**: Minimum 4.5:1 ratio for all text
- **Focus States**: Clear keyboard navigation indicators
- **Screen Reader**: Proper ARIA labels and semantic HTML
- **Motion**: Respect prefers-reduced-motion settings