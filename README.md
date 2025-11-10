# 🎨 Logo Finder

> A modern, responsive React application for searching and downloading high-quality logos from multiple trusted sources

![Logo Finder](https://img.shields.io/badge/React-19.1.1-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.17-06B6D4?style=for-the-badge&logo=tailwindcss)
![Vercel Ready](https://img.shields.io/badge/Vercel-Ready-black?style=for-the-badge&logo=vercel)

## ✨ Overview

Logo Finder is a powerful web application that allows users to search for and download high-quality logos from over 10 trusted sources. Built with React and Tailwind CSS, it features real-time search with debouncing, responsive design, and one-click downloads in multiple formats.

## 🚀 Live Demo

**[Visit Logo Finder →](https://quicklogoforu.vercel.app/)**

## ⭐ Key Features

### 🎯 **Smart Search Engine**
- **Debounced Search**: 500ms delay prevents excessive API calls
- **Intelligent Variations**: Automatically generates search variants (e.g., "reactjs" → "react")
- **Real-time Results**: Instant visual feedback with loading states
- **Error Handling**: Graceful fallbacks for failed requests

### 🌐 **Multiple Logo Sources**
- **Simple Icons**: 2,000+ popular brand icons
- **DevIcons**: Developer tools and programming languages
- **Iconify**: Comprehensive icon library
- **Icons8**: High-quality icons in multiple styles
- **Clearbit**: Company logos and branding
- **Logos Collection**: Curated logo collection

### 📁 **Format Support**
- **SVG Files**: Vector graphics for perfect scalability
- **PNG Files**: Raster images for broad compatibility
- **Automatic Detection**: Smart format identification
- **One-Click Download**: Direct file download to your device

### 🎨 **Modern UI/UX**
- **Responsive Design**: Works seamlessly on all devices
- **Clean Interface**: Minimalist design focused on usability
- **Smooth Animations**: Delightful micro-interactions
- **Accessibility**: WCAG compliant with keyboard navigation

### ⚡ **Performance Optimized**
- **Code Splitting**: Optimized bundle sizes
- **Lazy Loading**: Images load only when visible
- **Parallel Processing**: Multiple sources checked simultaneously
## 🛠️ Tech Stack

### **Frontend**
- **React 19.1.1** - Latest React with concurrent features
- **Vite 7.1.7** - Lightning-fast build tool
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **JavaScript ES6+** - Modern JavaScript features

### **Build & Deployment**
- **PostCSS** - CSS post-processing
- **ESLint** - Code quality and consistency
- **Vercel** - Production deployment platform

### **Logo Sources**
- **Simple Icons API** - Popular brand icons
- **DevIcons GitHub** - Developer tool icons
- **Iconify API** - Comprehensive icon library
- **Icons8 API** - High-quality icon service
- **Clearbit API** - Company logo service

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0+ 
- npm 8.0+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/logo-finder.git
   cd logo-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## � Project Structure

```
logo-finder/
├── public/
│   └── vite.svg                 # App favicon
├── src/
│   ├── hooks/
│   │   └── useDebounce.js       # Custom debouncing hook
│   ├── services/
│   │   └── logoService.js       # Logo fetching logic
│   ├── App.jsx                  # Main app component
│   ├── index.css                # Global Tailwind styles
│   └── main.jsx                 # App entry point
├── docs/
│   ├── FEATURES.md              # Detailed features documentation
│   └── screenshots/             # App screenshots
├── .gitignore                   # Git ignore rules
├── eslint.config.js             # ESLint configuration
├── index.html                   # HTML template
├── package.json                 # Dependencies and scripts
├── postcss.config.js            # PostCSS configuration
├── README.md                    # This file
├── tailwind.config.js           # Tailwind configuration
├── vercel.json                  # Vercel deployment config
└── vite.config.js               # Vite configuration
```

## 🎯 Usage

### Basic Search
1. Type a brand, framework, or tool name in the search box
2. View real-time results from multiple sources
3. Click download button to save logo to your device

### Advanced Search Tips
- **Frameworks**: react, vue, angular, svelte
- **Languages**: javascript, python, java, typescript
- **Tools**: github, figma, docker, vscode
- **Databases**: mongodb, postgresql, mysql, redis

### Download Formats
- **SVG**: Perfect for web and print (scalable)
- **PNG**: Great for presentations and documents

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **[Simple Icons](https://simpleicons.org/)** - SVG icons for popular brands
- **[DevIcons](https://devicons.github.io/devicon/)** - Developer tool icons
- **[Iconify](https://iconify.design/)** - Unified icon framework
- **[Icons8](https://icons8.com/)** - Professional icon library
- **[Vercel](https://vercel.com/)** - Deployment and hosting platform
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

<div align="center">

**Made with ❤️ by [Abhinav Bansal](https://github.com/yourusername)**

⭐ **Star this repo if you find it useful!** ⭐

</div>

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Simple Icons](https://simpleicons.org/) for brand icons
- [DevIcons](https://devicons.github.io/devicon/) for developer tool icons
- [Iconify](https://iconify.design/) for comprehensive icon library
- [Icons8](https://icons8.com/) for high-quality icons
- [Vercel](https://vercel.com/) for hosting platform
