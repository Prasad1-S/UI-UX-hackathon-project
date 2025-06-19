# Lumos - Modern Interactive Website

## Overview

Lumos is a modern, fully responsive website built with vanilla HTML, CSS, and JavaScript. The project features a clean architecture focused on interactive user experiences, including dark mode support, smooth animations, carousels, and responsive design. It's designed as a showcase/portfolio site with multiple sections and modern web development best practices.

## System Architecture

### Frontend Architecture
- **Pure Client-Side Application**: Built entirely with vanilla web technologies (HTML5, CSS3, ES6+ JavaScript)
- **Component-Based Structure**: Organized into logical sections (navigation, hero, features, portfolio, testimonials, contact)
- **Progressive Enhancement**: Core functionality works without JavaScript, enhanced features require JS
- **Mobile-First Responsive Design**: Designed for mobile devices first, then scaled up for larger screens

### Static File Serving
- **Simple Python HTTP Server**: Uses Python's built-in `http.server` module on port 5000
- **No Build Process**: Direct serving of static files without compilation or bundling
- **Development Focus**: Architecture optimized for rapid development and iteration

## Key Components

### 1. User Interface Layer
- **Navigation System**: Fixed navbar with smooth scrolling and mobile hamburger menu
- **Theme Management**: CSS custom properties enable seamless dark/light mode switching
- **Interactive Elements**: Carousels, modal popups, ripple effects, and scroll animations
- **Responsive Grid**: Flexible layout system using CSS Grid and Flexbox

### 2. Animation & Interaction Engine
- **Scroll-Based Animations**: Elements animate in/out based on viewport intersection
- **Carousel System**: Automated slideshow with manual navigation controls
- **Smooth Scrolling**: Enhanced navigation experience between sections
- **Loading States**: Preloader with minimum display time for perceived performance

### 3. Performance Optimizations
- **Intersection Observer API**: Efficient scroll-based animations and lazy loading
- **Event Debouncing**: Throttled scroll and resize handlers to prevent performance issues
- **CSS Animations**: Hardware-accelerated transitions using transform properties
- **Minimal Dependencies**: Only jQuery for DOM manipulation, reducing bundle size

### 4. Accessibility Features
- **Semantic HTML**: Proper heading hierarchy and ARIA labels
- **Keyboard Navigation**: Focus management and keyboard shortcuts
- **Screen Reader Support**: Alt text, descriptions, and proper markup structure
- **Color Contrast**: Theme colors meet WCAG accessibility guidelines

## Data Flow

### 1. Application Initialization
```
Page Load → Preloader Display → DOM Ready → Feature Initialization → Content Reveal
```

### 2. Theme Management
```
User Toggle → CSS Custom Property Update → Persistent Storage → UI Re-render
```

### 3. Navigation Flow
```
Link Click → Smooth Scroll → Section Animation → URL Hash Update
```

### 4. Form Submission
```
User Input → Client Validation → Submit Animation → Success/Error Feedback
```

## External Dependencies

### CDN Resources
- **Font Awesome 6.0.0**: Icon library for UI elements and visual enhancement
- **jQuery 3.6.0**: DOM manipulation and event handling (could be replaced with vanilla JS)
- **Google Fonts**: Custom typography (loaded via CSS imports)

### Browser APIs
- **Intersection Observer**: For scroll-based animations and performance optimization
- **Local Storage**: Theme preference persistence across sessions
- **History API**: URL management for single-page navigation
- **CSS Custom Properties**: Dynamic theming and style management

## Deployment Strategy

### Current Setup
- **Development Server**: Python HTTP server for local development
- **Static Hosting Ready**: Can be deployed to any static hosting service (Netlify, Vercel, GitHub Pages)
- **No Build Process**: Direct deployment of source files
- **Environment Agnostic**: Works in any environment that can serve static files

### Production Considerations
- **CDN Integration**: External resources loaded from CDNs for performance
- **Caching Strategy**: Static assets can be cached indefinitely
- **Compression**: Server-level gzip/brotli compression recommended
- **HTTPS**: SSL/TLS required for modern browser features

## Changelog
- June 19, 2025: Initial setup
- June 19, 2025: Converted from jQuery to vanilla JavaScript
- June 19, 2025: Renamed project to "Lumos"

## User Preferences

Preferred communication style: Simple, everyday language.