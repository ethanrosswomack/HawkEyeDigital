// This file can be used to define constants and shared data across the application

// Social media links
export const socialLinks = {
  spotify: "https://spotify.com",
  appleMusic: "https://music.apple.com",
  youTube: "https://youtube.com",
  instagram: "https://instagram.com",
  twitter: "https://twitter.com",
};

// Navigation links
export const navLinks = [
  { name: "Home", path: "/#home" },
  { name: "Music", path: "/#music" },
  { name: "Lyrics", path: "/lyrics" },
  { name: "Vision", path: "/vision" },
  { name: "Merch", path: "/merch" },
  { name: "Blog", path: "/blog" },
];

// Footer navigation sections
export const footerLinks = {
  navigation: [
    { name: "Home", path: "/#home" },
    { name: "Music", path: "/#music" },
    { name: "Lyrics", path: "/lyrics" },
    { name: "Vision", path: "/vision" },
    { name: "Merch", path: "/merch" },
    { name: "Blog", path: "/blog" },
  ],
  explore: [
    { name: "Full Discography", path: "/#music" },
    { name: "Lyric Archives", path: "/lyrics" },
    { name: "Vision Manifesto", path: "/vision" },
    { name: "Press Kit", path: "#" },
    { name: "Tour Dates", path: "#" },
    { name: "Contact", path: "#" },
  ],
  legal: [
    { name: "Privacy Policy", path: "#" },
    { name: "Terms of Service", path: "#" },
    { name: "Copyright Info", path: "#" },
    { name: "License Terms", path: "#" },
  ],
};

// Album information
export const albums = [
  {
    id: 1,
    title: "Full Disclosure",
    dedicatedTo: "Max Spiers",
    releaseYear: "2023",
    trackCount: 15,
  },
  {
    id: 2,
    title: "Behold a Pale Horse",
    dedicatedTo: "Milton William Cooper",
    releaseYear: "2024",
    trackCount: 12,
  },
  {
    id: 3,
    title: "Milabs",
    dedicatedTo: "Dr. Karla Turner",
    releaseYear: "2025",
    trackCount: 13,
  },
];

// Vision page philosophy sections
export const philosophySections = [
  {
    title: "TRUTH SEEKING",
    icon: "fa-search",
    content: "At the core of my artistic expression is an unwavering commitment to seeking truth, even when that pursuit leads down challenging and controversial paths. Each album, each track is a step further into uncovering hidden realities and giving voice to perspectives that challenge established narratives."
  },
  {
    title: "JUSTICE",
    icon: "fa-balance-scale",
    content: "My music aims to shine a spotlight on systemic issues like inequality, government transparency, and the fight for marginalized voices. I believe that art has a responsibility to address these issues and inspire action toward a more just world."
  },
  {
    title: "BRAVERY",
    icon: "fa-fist-raised",
    content: "Creating art that challenges prevailing narratives requires courage. I draw inspiration from figures who risked everything to speak what they believed was true. Bravery isn't about being fearless; it's about moving forward despite fear."
  },
  {
    title: "CONSCIOUSNESS & SPIRITUALITY",
    icon: "fa-brain",
    content: "Beyond social justice, my work explores themes of human consciousness and spiritual awakening. I'm fascinated by the deeper questions of existence, the nature of reality, and the potential for transformation through heightened awareness."
  },
];
