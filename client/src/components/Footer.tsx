import React from "react";
import { Link } from "wouter";

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark py-12 border-t border-navy/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
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
            </div>
            <p className="text-light/70 mb-6">
              Music as a vehicle for change, exploration, and uncovering hidden
              truths.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light hover:text-orange transition-colors"
                aria-label="Spotify"
              >
                <i className="fab fa-spotify text-xl"></i>
              </a>
              <a
                href="https://music.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light hover:text-orange transition-colors"
                aria-label="Apple Music"
              >
                <i className="fab fa-apple text-xl"></i>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light hover:text-orange transition-colors"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube text-xl"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light hover:text-orange transition-colors"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light hover:text-orange transition-colors"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-orange orbitron">
              NAVIGATION
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#home" className="text-light/70 hover:text-orange transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#music" className="text-light/70 hover:text-orange transition-colors">
                  Music
                </Link>
              </li>
              <li>
                <Link href="/lyrics" className="text-light/70 hover:text-orange transition-colors">
                  Lyrics
                </Link>
              </li>
              <li>
                <Link href="/vision" className="text-light/70 hover:text-orange transition-colors">
                  Vision
                </Link>
              </li>
              <li>
                <Link href="/merch" className="text-light/70 hover:text-orange transition-colors">
                  Merch
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-light/70 hover:text-orange transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-orange orbitron">
              EXPLORE
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#music" className="text-light/70 hover:text-orange transition-colors">
                  Full Discography
                </Link>
              </li>
              <li>
                <Link href="/lyrics" className="text-light/70 hover:text-orange transition-colors">
                  Lyric Archives
                </Link>
              </li>
              <li>
                <Link href="/vision" className="text-light/70 hover:text-orange transition-colors">
                  Vision Manifesto
                </Link>
              </li>
              <li>
                <Link href="#" className="text-light/70 hover:text-orange transition-colors">
                  Press Kit
                </Link>
              </li>
              <li>
                <Link href="#" className="text-light/70 hover:text-orange transition-colors">
                  Tour Dates
                </Link>
              </li>
              <li>
                <Link href="#" className="text-light/70 hover:text-orange transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-orange orbitron">
              LEGAL
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-light/70 hover:text-orange transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-light/70 hover:text-orange transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-light/70 hover:text-orange transition-colors">
                  Copyright Info
                </Link>
              </li>
              <li>
                <Link href="#" className="text-light/70 hover:text-orange transition-colors">
                  License Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy/30 mt-12 pt-8 text-center">
          <p className="text-light/60">
            &copy; {new Date().getFullYear()} Hawk Eye Media. All rights reserved.
          </p>
          <p className="text-light/40 text-sm mt-2">
            Design by{" "}
            <a
              href="#"
              className="hover:text-orange transition-colors"
            >
              Omniversal Media
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
