import { db } from '../server/db';
import { albums, tracks, merchItems, blogPosts } from '../shared/schema';
import { writeFileSync } from 'fs';

async function exportDatabase() {
  console.log('Exporting database to SQL file...');
  
  let sql = `-- Hawk Eye The Rapper Database Export
-- Generated: ${new Date().toISOString()}
-- This file contains all data from the production database

-- Clear existing data
TRUNCATE TABLE blog_posts, merch_items, tracks, albums RESTART IDENTITY CASCADE;

-- Insert Albums
`;

  // Export albums
  const allAlbums = await db.select().from(albums);
  for (const album of allAlbums) {
    sql += `INSERT INTO albums (id, title, "dedicatedTo", description, "releaseYear", "trackCount", "coverImage") VALUES (${album.id}, ${escapeSQL(album.title)}, ${escapeSQL(album.dedicatedTo)}, ${escapeSQL(album.description)}, ${escapeSQL(album.releaseYear)}, ${album.trackCount}, ${escapeSQL(album.coverImage)});\n`;
  }

  sql += `\n-- Insert Tracks\n`;
  // Export tracks
  const allTracks = await db.select().from(tracks);
  for (const track of allTracks) {
    sql += `INSERT INTO tracks (id, "albumId", title, lyrics, duration, "audioUrl", "trackNumber") VALUES (${track.id}, ${track.albumId}, ${escapeSQL(track.title)}, ${escapeSQL(track.lyrics)}, ${escapeSQL(track.duration)}, ${escapeSQL(track.audioUrl)}, ${track.trackNumber});\n`;
  }

  sql += `\n-- Insert Merchandise\n`;
  // Export merchandise
  const allMerch = await db.select().from(merchItems);
  for (const merch of allMerch) {
    sql += `INSERT INTO merch_items (id, name, description, price, category, "imageUrl", "inStock") VALUES (${merch.id}, ${escapeSQL(merch.name)}, ${escapeSQL(merch.description)}, ${merch.price}, ${escapeSQL(merch.category)}, ${escapeSQL(merch.imageUrl)}, ${merch.inStock});\n`;
  }

  sql += `\n-- Insert Blog Posts\n`;
  // Export blog posts
  const allPosts = await db.select().from(blogPosts);
  for (const post of allPosts) {
    sql += `INSERT INTO blog_posts (id, title, content, excerpt, category, "imageUrl", "publishDate") VALUES (${post.id}, ${escapeSQL(post.title)}, ${escapeSQL(post.content)}, ${escapeSQL(post.excerpt)}, ${escapeSQL(post.category)}, ${escapeSQL(post.imageUrl)}, ${escapeSQL(post.publishDate)});\n`;
  }

  sql += `\n-- Reset sequences
SELECT setval('albums_id_seq', (SELECT MAX(id) FROM albums));
SELECT setval('tracks_id_seq', (SELECT MAX(id) FROM tracks));
SELECT setval('merch_items_id_seq', (SELECT MAX(id) FROM merch_items));
SELECT setval('blog_posts_id_seq', (SELECT MAX(id) FROM blog_posts));
`;

  writeFileSync('database-export.sql', sql);
  console.log('✅ Database exported to database-export.sql');
  
  console.log(`\nExported:`);
  console.log(`- ${allAlbums.length} albums`);
  console.log(`- ${allTracks.length} tracks`);
  console.log(`- ${allMerch.length} merchandise items`);
  console.log(`- ${allPosts.length} blog posts`);
}

function escapeSQL(value: string | null | undefined): string {
  if (value === null || value === undefined) {
    return 'NULL';
  }
  // Escape single quotes and wrap in quotes
  return `'${value.replace(/'/g, "''").replace(/\\/g, '\\\\')}'`;
}

exportDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Export failed:', error);
    process.exit(1);
  });
