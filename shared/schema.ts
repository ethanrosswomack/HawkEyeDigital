import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Album table - to store album details
export const albums = pgTable("albums", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  dedicatedTo: text("dedicated_to").notNull(),
  description: text("description").notNull(),
  coverImage: text("cover_image"),
  releaseYear: text("release_year").notNull(),
  trackCount: integer("track_count").notNull(),
});

// Track table - to store track details
export const tracks = pgTable("tracks", {
  id: serial("id").primaryKey(),
  albumId: integer("album_id").notNull(),
  title: text("title").notNull(),
  duration: text("duration").notNull(),
  trackNumber: integer("track_number").notNull(),
  lyrics: text("lyrics"),
  description: text("description"),
});

// Blog table - to store blog posts
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  publishDate: text("publish_date").notNull(),
});

// Merchandise table - to store merchandise items
export const merchItems = pgTable("merch_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  imageUrl: text("image_url"),
  category: text("category").notNull(),
});

// Newsletter subscriptions
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  subscribedAt: text("subscribed_at").notNull(),
});

// Define insert schemas
export const insertAlbumSchema = createInsertSchema(albums).omit({ id: true });
export const insertTrackSchema = createInsertSchema(tracks).omit({ id: true });
export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({ id: true });
export const insertMerchItemSchema = createInsertSchema(merchItems).omit({ id: true });
export const insertSubscriberSchema = createInsertSchema(subscribers).omit({ id: true });

// Define types
export type InsertAlbum = z.infer<typeof insertAlbumSchema>;
export type InsertTrack = z.infer<typeof insertTrackSchema>;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type InsertMerchItem = z.infer<typeof insertMerchItemSchema>;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;

export type Album = typeof albums.$inferSelect;
export type Track = typeof tracks.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type MerchItem = typeof merchItems.$inferSelect;
export type Subscriber = typeof subscribers.$inferSelect;
