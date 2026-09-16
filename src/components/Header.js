import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Github, Linkedin, Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (item) => {
    if (item.id === 'blogs') {
      navigate('/blogs');
      setIsMobileMenuOpen(false);
    } else {
      scrollToSection(item.id);
    }
  };

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'blogs', label: 'Blogs' },

  ];

  return (
    <>
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <button
                onClick={() => {
                  navigate('/');
                  setTimeout(() => {
                    const element = document.getElementById('home');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100);
                }}
                className="text-xl font-bold text-green-600 hover:text-green-700 transition-colors"
              >
                Faisal AlMutairi
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className="text-gray-700 hover:text-green-600 transition-colors font-medium"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-green-600 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className="block w-full text-left text-gray-700 hover:text-green-600 transition-colors py-2"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div id="home" className="relative min-h-screen flex items-center justify-center bg-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Name and Title */}
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-green-600">
            Faisal AlMutairi
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-800">
            Full-Stack Developer
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Software Engineering Student (Final Semester) at Jeddah University
          </p>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
 
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
              <MapPin className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Jeddah, Saudi Arabia</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://x.com/_21fl" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-gray-50 px-6 py-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5 text-gray-900 group-hover:text-gray-700 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-label="X">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">@_21FL</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/ifaisal-swe/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-gray-50 px-6 py-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            >
              <Linkedin className="w-5 h-5 text-gray-900 group-hover:text-gray-700 transition-colors" />
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">LinkedIn</span>
            </a>
            <a 
              href="https://github.com/ifaisal1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-gray-50 px-6 py-3 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            >
              <Github className="w-5 h-5 text-gray-900 group-hover:text-gray-700 transition-colors" />
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">GitHub</span>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => scrollToSection('about')}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer hover:scale-110 transition-transform"
          aria-label="Scroll to about section"
        >
          <div className="w-6 h-10 border-2 border-green-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-green-600 rounded-full mt-2 animate-pulse"></div>
          </div>
        </button>
      </div>
      </div>
    </>
  );
};

export default Header;
