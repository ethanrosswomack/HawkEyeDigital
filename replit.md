# HawkEye Digital - Hawk Eye The Rapper Website

## Overview
This is a full-stack web application for Hawk Eye The Rapper, featuring:
- **Artist Portfolio**: Showcasing music, lyrics, merchandise, and blog content
- **Live Streaming**: WebSocket-based live streaming functionality
- **Content Management**: Albums, tracks, blog posts, and merchandise
- **Newsletter**: Email subscription system

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling and development server
- **Wouter** for client-side routing
- **TanStack Query** for data fetching and caching
- **shadcn/ui** components (Radix UI primitives)
- **Tailwind CSS** for styling
- **Framer Motion** for animations

### Backend
- **Express.js** server with TypeScript
- **PostgreSQL** database with Drizzle ORM (Neon)
- **WebSocket** (ws library) for live streaming on `/ws` path
- **CSV Parser** for data import functionality
- **Database Storage** layer for persistent data

### Key Features
- Album and track browsing
- Lyrics display
- Merchandise store
- Blog/Articles section
- Vision/About page
- Newsletter subscription
- Live streaming capability (WebSocket on `/ws`)

## Project Structure
```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   └── ui/       # shadcn/ui components
│   │   ├── pages/        # Page components (routes)
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utilities and data
│   │   ├── App.tsx       # Main app component
│   │   └── main.tsx      # Entry point
│   └── index.html
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes and WebSocket setup
│   ├── vite.ts           # Vite dev server integration
│   ├── storage.ts        # Data storage layer
│   └── csvParser.ts      # CSV import functionality
├── shared/               # Shared types and schemas
│   └── schema.ts         # Zod schemas
└── attached_assets/      # Content and media files

```

## Development

### Running Locally
```bash
npm install
npm run dev
```
The server runs on port 5000 and serves both the API and the frontend.

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - TypeScript type checking
- `npm run db:push` - Push database schema (if using database)

## API Endpoints

### Albums
- `GET /api/albums` - Get all albums
- `GET /api/albums/:id` - Get album by ID
- `GET /api/albums/:albumId/tracks` - Get tracks for an album

### Tracks
- `GET /api/tracks/:id` - Get track by ID

### Blog
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/:id` - Get blog post by ID

### Merchandise
- `GET /api/merch` - Get all merchandise items
- `GET /api/merch/:id` - Get merchandise item by ID

### Newsletter
- `POST /api/subscribe` - Subscribe to newsletter (body: { email: string })

### Data Import
- `POST /api/import-csv` - Import data from CSV (body: { csvUrl: string })
- `POST /api/import-sample-data` - Import sample data

## WebSocket Live Streaming

The application includes WebSocket support for live streaming functionality:
- **Endpoint**: `ws://localhost:5000/ws`
- **Features**: 
  - Real-time viewer count
  - Live chat/messages
  - Connection status updates

### WebSocket Message Types
- `info` - Welcome/information messages
- `message` - Chat messages
- `viewers` - Viewer count updates

## Recent Changes
- **2025-10-11**: Rebuilt site from git repository
  - Installed Node.js 20 and all dependencies
  - Fixed WebSocket conflict between custom live streaming and Vite HMR
  - Updated WebSocket server to use `noServer: true` with manual upgrade handling
  - Fixed React Hook violation in Lyrics page by using `useQueries` instead of mapping `useQuery`
  - Resolved all TypeScript type errors and LSP diagnostics
  - Verified all pages load correctly (Home, Music, Lyrics, Vision, Merch, Blog)
  - Server running successfully on port 5000 with HMR working properly

- **2025-10-11**: Database Integration Complete
  - Set up PostgreSQL database with Replit's Neon integration
  - Created DatabaseStorage class using Drizzle ORM
  - Imported complete dataset from CSV files:
    - 7 albums (Singles Arsenal, Full Disclosure, Behold A Pale Horse, Milabs, Mixtape Sessions, Shadow Banned, Sun Tzu Reckoning)
    - 99 unique tracks mapped to albums
    - 45 merchandise items
    - 2 blog posts
  - All API endpoints now serve from PostgreSQL database
  - Site fully operational with real data
  - Note: Media URLs (audio, images) are placeholders pending real asset URLs

## Configuration

### Vite Configuration
- Custom aliases: `@` (client/src), `@shared` (shared), `@assets` (attached_assets)
- Build output: `dist/public`
- Development server configured with HMR and allowed hosts

### Important Notes
- WebSocket server for live streaming is on `/ws` path to avoid HMR conflicts
- Vite HMR uses root WebSocket path for hot reload functionality
- Server uses `noServer: true` for custom WebSocket to allow Vite HMR to work properly

## Deployment

Your site is **ready to deploy**! The deployment configuration is set up for Autoscale deployment (ideal for web apps).

### How to Deploy on Replit

1. **Click the "Publish" button** in your Replit workspace
2. **Choose "Autoscale"** deployment type (recommended for your site)
   - Automatically scales with traffic
   - You only pay when users are visiting
   - Perfect for web applications with a database
3. **Configure settings** (if prompted):
   - Machine power: Start with the default
   - Environment variables: Your `DATABASE_URL` is already set
4. **Click "Publish"** to go live!

Your site will be available at a public Replit URL that you can share or connect to a custom domain.

### Deployment Configuration
- **Build command**: `npm run build` (builds frontend + backend)
- **Run command**: `npm start` (production server)
- **Deployment type**: Autoscale (auto-scales based on traffic)
- **Database**: PostgreSQL is configured and will work in production

### ⚠️ Important: Initialize Production Database

After deploying, your production database will be empty. You need to populate it with data:

**To populate your production database:**
1. After deployment, visit your deployed site URL
2. Add `/api/init-database` to the URL
3. Use a tool like Postman, or run this command in your browser console:
   ```javascript
   fetch('/api/init-database', { method: 'POST' })
     .then(r => r.json())
     .then(console.log)
   ```
4. This will import all 7 albums, 99 tracks, 45 merchandise items, and blog posts
5. Your site will then be fully functional!

**Or use curl from terminal:**
```bash
curl -X POST https://your-deployed-url.replit.app/api/init-database
```

## Browser Compatibility
- Modern browsers with ES6+ support
- WebSocket support required for live streaming features
