import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from 'ws';
import { storage } from "./storage";
import { z } from "zod";
import { insertSubscriberSchema } from "@shared/schema";
import { importCSVData, processAlbumAndTracks, processSingles } from "./csvParser";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // Setup WebSocket server for live streaming with noServer to avoid conflicts with Vite HMR
  const wss = new WebSocketServer({ noServer: true });
  
  // Handle upgrade requests manually only for /ws path
  httpServer.on('upgrade', (request, socket, head) => {
    const pathname = new URL(request.url || '', `http://${request.headers.host}`).pathname;
    
    if (pathname === '/ws') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    }
    // Let other upgrade requests (like Vite HMR) pass through
  });
  
  // Track connected clients and viewer count
  let connectedClients = new Set();
  
  // WebSocket event handlers
  wss.on('connection', (ws) => {
    console.log('Client connected to WebSocket');
    
    // Add to connected clients
    connectedClients.add(ws);
    
    // Update viewer count for all clients
    const viewerCount = connectedClients.size;
    broadcastViewerCount(wss, viewerCount);
    
    // Send a welcome message
    ws.send(JSON.stringify({
      type: 'info',
      message: 'Welcome to Hawk Eye Live Stream',
      timestamp: new Date().toISOString()
    }));
    
    // Handle incoming messages
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message.toString());
        console.log('Received:', data);
        
        // Broadcast the message to all clients
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              type: data.type || 'message',
              sender: data.sender || 'Anonymous',
              content: data.content,
              timestamp: new Date().toISOString()
            }));
          }
        });
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    });
    
    // Handle disconnection
    ws.on('close', () => {
      console.log('Client disconnected from WebSocket');
      
      // Remove from connected clients
      connectedClients.delete(ws);
      
      // Update viewer count for all clients
      const viewerCount = connectedClients.size;
      broadcastViewerCount(wss, viewerCount);
    });
  });
  
  // Function to broadcast viewer count to all clients
  function broadcastViewerCount(wss: WebSocketServer, count: number) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'viewers',
          count: count,
          timestamp: new Date().toISOString()
        }));
      }
    });
  }

  // Import CSV data endpoint
  app.post("/api/import-csv", async (req, res) => {
    try {
      const { csvUrl } = req.body;
      
      if (!csvUrl) {
        return res.status(400).json({ message: "CSV URL is required" });
      }
      
      // Start the import process
      importCSVData(csvUrl)
        .then(() => {
          console.log('CSV import completed successfully');
        })
        .catch((error) => {
          console.error('CSV import failed:', error);
        });
      
      // Return a response immediately as import may take time
      res.status(202).json({ 
        message: "CSV import started", 
        status: "processing" 
      });
    } catch (error) {
      console.error('Error starting CSV import:', error);
      res.status(500).json({ message: "Failed to start CSV import" });
    }
  });
  
  // Import sample data directly without CSV
  app.post("/api/import-sample-data", async (req, res) => {
    try {
      // Start the import process
      await processAlbumAndTracks([]);
      await processSingles([]);
      
      // Return success response
      res.status(200).json({ 
        message: "Sample data imported successfully", 
        status: "completed" 
      });
    } catch (error) {
      console.error('Error importing sample data:', error);
      res.status(500).json({ message: "Failed to import sample data" });
    }
  });
  
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
