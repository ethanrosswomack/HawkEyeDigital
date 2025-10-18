# 🎵 Hawk Eye The Rapper - Complete Website Package

This archive contains the complete website with database export for local development.

## 📦 What's Inside

### Complete Application
- ✅ Full React + Express website
- ✅ PostgreSQL database with all content
- ✅ 7 Albums with 99 tracks and complete lyrics
- ✅ 45 Merchandise items
- ✅ Blog posts and content
- ✅ Live streaming WebSocket setup
- ✅ All source code and configuration

### Files Included
- `database-export.sql` - Complete database with all your data
- `LOCAL_SETUP.md` - Detailed setup instructions
- `.env.example` - Environment configuration template
- All source code (client/, server/, shared/, scripts/)
- Configuration files (package.json, tsconfig.json, vite.config.ts, etc.)
- Asset files (attached_assets/ with CSV data)

## 🚀 Quick Start

### 1. Extract the Archive
```bash
tar -xzf hawkeye-website-complete.tar.gz
cd hawkeye-website-complete
```

### 2. Install Node.js Dependencies
```bash
npm install
```

### 3. Set Up PostgreSQL Database
Create a PostgreSQL database and import the data:
```bash
# Create database
createdb hawkeye_site

# Import data
psql hawkeye_site < database-export.sql
```

### 4. Configure Environment
Copy `.env.example` to `.env` and update with your database credentials:
```bash
cp .env.example .env
# Edit .env with your database connection details
```

### 5. Start Development Server
```bash
npm run dev
```

Visit http://localhost:5000 to see your site!

## 📖 Full Documentation

See `LOCAL_SETUP.md` for complete setup instructions, troubleshooting, and details about the project structure.

## 🔑 Key Features

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Live Streaming**: WebSocket integration
- **UI Components**: shadcn/ui (Radix UI)
- **Routing**: Wouter (lightweight React router)

## 📝 Important Notes

1. **Audio Files**: The database contains placeholder MP3 URLs. You'll need to add your actual audio file URLs.
2. **Images**: Album covers and product images use placeholders. Replace with real images.
3. **WebSocket**: Live streaming functionality is ready to use on `/ws` path.

## 🛠️ Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Run production server
npm run check    # TypeScript type checking
npm run db:push  # Push database schema changes
```

## 📊 Database Content

Your database export includes:
- **Albums**: 7 complete albums
  - Singles Arsenal
  - Full Disclosure
  - Behold A Pale Horse
  - Milabs
  - Mixtape Sessions
  - Shadow Banned
  - Sun Tzu Reckoning
- **Tracks**: 99 unique tracks with full lyrics
- **Merchandise**: 45 store items with descriptions and pricing
- **Blog Posts**: 2 sample blog posts

## 🆘 Need Help?

- Check `LOCAL_SETUP.md` for detailed setup instructions
- Review `DATABASE_INTEGRATION_REPORT.md` for data structure
- See `replit.md` for project architecture details

## 🚀 Ready to Deploy?

When you're ready to go live:
1. Build the project: `npm run build`
2. Deploy to your favorite hosting platform
3. Set up your production database
4. Update environment variables for production

---

**Created**: October 2025  
**Platform**: Built on Replit, ready for local development  
**Database**: PostgreSQL 16 compatible
