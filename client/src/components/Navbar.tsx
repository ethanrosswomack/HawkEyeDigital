import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import useScrollActive from "../hooks/useScrollActive";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const activeSection = useScrollActive();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isHomePage = location === "/";

  const getLinkClass = (path: string) => {
    if (isHomePage) {
      return `nav-link text-light hover:text-orange transition-colors ${
        activeSection === path.substring(1) ? "active-nav" : ""
      }`;
    } else {
      return `nav-link text-light hover:text-orange transition-colors ${
        location.startsWith(path) ? "active-nav" : ""
      }`;
    }
  };

  return (
    <header className={`bg-dark/90 backdrop-blur-sm fixed w-full z-50 transition-all ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-10 w-10 relative">
              <svg
                className="rounded-full h-full w-full"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="50" cy="50" r="50" fill="#1E1E1E" />
                <path
                  d="M50 20C33.431 20 20 33.431 20 50s13.431 30 30 30 30-13.431 30-30S66.569 20 50 20zm0 5c13.807 0 25 11.193 25 25S63.807 75 50 75 25 63.807 25 50s11.193-25 25-25z"
                  fill="#FF8C00"
                />
                <circle cx="50" cy="50" r="10" fill="#4B0082" />
              </svg>
            </div>
            <span className="text-xl font-bold text-light orbitron">
              HAWK<span className="text-orange">EYE</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/#home" className={getLinkClass("/#home")}>
              Home
            </Link>
            <Link href="/#music" className={getLinkClass("/#music")}>
              Music
            </Link>
            <Link href="/lyrics" className={getLinkClass("/lyrics")}>
              Lyrics
            </Link>
            <Link href="/vision" className={getLinkClass("/vision")}>
              Vision
            </Link>
            <Link href="/merch" className={getLinkClass("/merch")}>
              Merch
            </Link>
            <Link href="/blog" className={getLinkClass("/blog")}>
              Blog
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-light focus:outline-none" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pt-4 pb-2">
            <div className="flex flex-col space-y-3">
              <Link href="/#home" onClick={closeMobileMenu} className="text-light hover:text-orange transition-colors py-2">
                Home
              </Link>
              <Link href="/#music" onClick={closeMobileMenu} className="text-light hover:text-orange transition-colors py-2">
                Music
              </Link>
              <Link href="/lyrics" onClick={closeMobileMenu} className="text-light hover:text-orange transition-colors py-2">
                Lyrics
              </Link>
              <Link href="/vision" onClick={closeMobileMenu} className="text-light hover:text-orange transition-colors py-2">
                Vision
              </Link>
              <Link href="/merch" onClick={closeMobileMenu} className="text-light hover:text-orange transition-colors py-2">
                Merch
              </Link>
              <Link href="/blog" onClick={closeMobileMenu} className="text-light hover:text-orange transition-colors py-2">
                Blog
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
