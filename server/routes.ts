import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertSubscriberSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // API endpoints for albums
  app.get("/api/albums", async (req, res) => {
    const albums = await storage.getAlbums();
    res.json(albums);
  });

  app.get("/api/albums/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid album ID" });
    }

    const album = await storage.getAlbumById(id);
    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    res.json(album);
  });

  // API endpoints for tracks
  app.get("/api/albums/:albumId/tracks", async (req, res) => {
    const albumId = parseInt(req.params.albumId, 10);
    if (isNaN(albumId)) {
      return res.status(400).json({ message: "Invalid album ID" });
    }

    const album = await storage.getAlbumById(albumId);
    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    const tracks = await storage.getTracksByAlbumId(albumId);
    res.json(tracks);
  });

  app.get("/api/tracks/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid track ID" });
    }

    const track = await storage.getTrackById(id);
    if (!track) {
      return res.status(404).json({ message: "Track not found" });
    }

    res.json(track);
  });

  // API endpoints for blog posts
  app.get("/api/blog", async (req, res) => {
    const blogPosts = await storage.getBlogPosts();
    res.json(blogPosts);
  });

  app.get("/api/blog/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid blog post ID" });
    }

    const blogPost = await storage.getBlogPostById(id);
    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.json(blogPost);
  });

  // API endpoints for merchandise
  app.get("/api/merch", async (req, res) => {
    const merchItems = await storage.getMerchItems();
    res.json(merchItems);
  });

  app.get("/api/merch/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid merchandise ID" });
    }

    const merchItem = await storage.getMerchItemById(id);
    if (!merchItem) {
      return res.status(404).json({ message: "Merchandise item not found" });
    }

    res.json(merchItem);
  });

  // API endpoint for newsletter subscription
  app.post("/api/subscribe", async (req, res) => {
    try {
      const subscriberData = insertSubscriberSchema.parse({
        email: req.body.email,
        subscribedAt: new Date().toISOString()
      });
      
      const subscriber = await storage.createSubscriber(subscriberData);
      res.status(201).json({ message: "Successfully subscribed", subscriber });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid email address" });
      }
      res.status(500).json({ message: "Failed to subscribe" });
    }
  });

  return httpServer;
}
