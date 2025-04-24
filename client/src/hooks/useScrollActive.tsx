import { useState, useEffect } from "react";

/**
 * Custom hook to track which section is currently active based on scroll position
 * @returns The ID of the currently active section
 */
const useScrollActive = (): string => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      // Get all sections that have an ID
      const sections = document.querySelectorAll("section[id]");
      
      // If no sections, early return
      if (sections.length === 0) return;

      // Amount of buffer to consider a section in view
      const scrollBuffer = 100;
      const scrollPosition = window.scrollY + scrollBuffer;

      // Find the current section
      let current = "";
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          current = section.getAttribute("id") || "";
        }
      });
      
      setActiveSection(current);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    
    // Call once on mount to initialize
    handleScroll();
    
    // Cleanup function to remove event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return activeSection;
};

export default useScrollActive;
