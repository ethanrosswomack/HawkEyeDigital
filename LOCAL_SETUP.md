# Hawk Eye The Rapper - Local Development Setup

This package contains the complete website with database export for local development.

## Prerequisites

Before you begin, make sure you have installed:
- **Node.js** (version 20 or higher) - [Download here](https://nodejs.org/)
- **PostgreSQL** (version 16 recommended) - [Download here](https://www.postgresql.org/download/)
- **Git** (optional, for version control)

## Setup Instructions

### 1. Extract the Files
Unzip this package to your desired location on your computer.

### 2. Install Dependencies
Open a terminal in the project directory and run:
```bash
npm install
```

### 3. Set Up PostgreSQL Database

**Create a new database:**
```bash
# Open PostgreSQL command line (psql)
psql -U postgres

# Create a new database
CREATE DATABASE hawkeye_site;

# Exit psql
\q
```

**Import the database:**
```bash
# Import the database export
psql -U postgres -d hawkeye_site < database-export.sql
```

### 4. Configure Environment Variables

Create a `.env` file in the project root with your database connection:

```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/hawkeye_site
NODE_ENV=development
```

Replace `your_password` with your PostgreSQL password.

### 5. Push Database Schema (if needed)

If you make any schema changes, run:
```bash
npm run db:push
```

### 6. Start Development Server

Run the development server:
```bash
npm run dev
```

The site will be available at: **http://localhost:5000**

## What's Included

### Database Content
- ✅ 7 Albums (Singles Arsenal, Full Disclosure, Behold A Pale Horse, Milabs, Mixtape Sessions, Shadow Banned, Sun Tzu Reckoning)
- ✅ 99 Tracks with complete lyrics
- ✅ 45 Merchandise items
- ✅ 2 Blog posts

### Project Structure
```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom hooks
│   │   └── lib/          # Utilities
├── server/                # Express backend
│   ├── index.ts          # Server entry
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Database layer
│   └── db.ts             # Database connection
├── shared/               # Shared types/schemas
├── scripts/              # Import scripts
└── attached_assets/      # CSV data files
```

## Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - TypeScript type checking
- `npm run db:push` - Push database schema changes

## Troubleshooting

### Database Connection Issues
If you get database connection errors:
1. Make sure PostgreSQL is running
2. Check your DATABASE_URL in `.env`
3. Verify your PostgreSQL username and password

### Port Already in Use
If port 5000 is in use, you can change it in `server/index.ts`

### Missing Dependencies
Run `npm install` again to ensure all packages are installed

## Important Notes

- **Audio Files**: MP3 URLs are currently placeholders. You'll need to add real audio file URLs.
- **Images**: Product and album images use placeholder URLs. Replace with actual images.
- **WebSocket**: Live streaming uses WebSocket on `/ws` path

## Need Help?

- Check `replit.md` for detailed project documentation
- Review `DATABASE_INTEGRATION_REPORT.md` for data structure details
- All API endpoints are documented in the main README

## Production Deployment

When ready to deploy:
```bash
npm run build
npm start
```

The production server will run on port 5000.
