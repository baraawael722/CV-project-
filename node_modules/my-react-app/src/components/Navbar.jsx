import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'scrolled bg-white/10 backdrop-blur-md shadow-sm border-b border-white/10 py-4' : 'bg-transparent py-6'
      }`}
      style={{ WebkitBackdropFilter: isScrolled ? 'blur(8px)' : 'none' }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between">
          {/* Logo - Left side */}
          <div className="flex items-center gap-3">
            {/* Compass SVG Logo - Light Blue */}
            <div className={`transition-all duration-300 ${
              isScrolled ? 'w-10 h-10' : 'w-12 h-12'
            }`}>
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Outer circle - Light Blue */}
                <circle cx="50" cy="50" r="45" fill="#60a5fa" opacity="0.9" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="white" strokeWidth="2" />
                
                {/* Compass points */}
                <g stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  {/* North */}
                  <line x1="50" y1="15" x2="50" y2="30" />
                  <polygon points="50,10 45,20 50,18 55,20" fill="white" />
                  
                  {/* South */}
                  <line x1="50" y1="70" x2="50" y2="85" />
                  
                  {/* East */}
                  <line x1="70" y1="50" x2="85" y2="50" />
                  
                  {/* West */}
                  <line x1="15" y1="50" x2="30" y2="50" />
                  
                  {/* Diagonal lines */}
                  <line x1="68" y1="32" x2="78" y2="22" opacity="0.7" />
                  <line x1="68" y1="68" x2="78" y2="78" opacity="0.7" />
                  <line x1="32" y1="32" x2="22" y2="22" opacity="0.7" />
                  <line x1="32" y1="68" x2="22" y2="78" opacity="0.7" />
                </g>
                
                {/* Center dot */}
                <circle cx="50" cy="50" r="5" fill="white" />
              </svg>
            </div>
            
            {/* Brand Name */}
            <span className={`font-bold transition-all duration-300 ${
              isScrolled 
                ? 'text-gray-800 text-xl' 
                : 'text-gray-800 text-2xl'
            }`}>
              JobCompass
            </span>
          </div>

          {/* Navigation Links - Center */}
          <div className="hidden md:flex items-center gap-12">
            <a 
              href="#" 
              className={`nav-link font-semibold transition-all duration-300 ${
                isScrolled 
                  ? 'text-base' 
                  : 'text-2xl'
              }`}
            >
              Home
            </a>
            <a 
              href="#" 
              className={`nav-link font-semibold transition-all duration-300 ${
                isScrolled 
                  ? 'text-base' 
                  : 'text-2xl'
              }`}
            >
              About Us
            </a>
            <a 
              href="#" 
              className={`nav-link font-semibold transition-all duration-300 ${
                isScrolled 
                  ? 'text-base' 
                  : 'text-2xl'
              }`}
            >
              Jobs
            </a>
            <a 
              href="#" 
              className={`nav-link font-semibold transition-all duration-300 ${
                isScrolled 
                  ? 'text-base' 
                  : 'text-2xl'
              }`}
            >
            Features
            </a>
          </div>

          {/* Buttons - Right side */}
          <div className="flex items-center gap-4">
            {/* Login button - styled like Get Started with hover shadow */}
            <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
