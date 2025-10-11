import { 
  albums, type Album, type InsertAlbum,
  tracks, type Track, type InsertTrack,
  blogPosts, type BlogPost, type InsertBlogPost,
  merchItems, type MerchItem, type InsertMerchItem,
  subscribers, type Subscriber, type InsertSubscriber,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Album operations
  getAlbums(): Promise<Album[]>;
  getAlbumById(id: number): Promise<Album | undefined>;
  createAlbum(album: InsertAlbum): Promise<Album>;

  // Track operations
  getTracksByAlbumId(albumId: number): Promise<Track[]>;
  getTrackById(id: number): Promise<Track | undefined>;
  createTrack(track: InsertTrack): Promise<Track>;

  // Blog operations
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;

  // Merchandise operations
  getMerchItems(): Promise<MerchItem[]>;
  getMerchItemById(id: number): Promise<MerchItem | undefined>;
  createMerchItem(merchItem: InsertMerchItem): Promise<MerchItem>;

  // Newsletter operations
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
}

export class MemStorage implements IStorage {
  private albums: Map<number, Album>;
  private tracks: Map<number, Track>;
  private blogPosts: Map<number, BlogPost>;
  private merchItems: Map<number, MerchItem>;
  private subscribers: Map<number, Subscriber>;
  
  private albumId: number;
  private trackId: number;
  private blogPostId: number;
  private merchItemId: number;
  private subscriberId: number;

  constructor() {
    this.albums = new Map();
    this.tracks = new Map();
    this.blogPosts = new Map();
    this.merchItems = new Map();
    this.subscribers = new Map();
    
    this.albumId = 1;
    this.trackId = 1;
    this.blogPostId = 1;
    this.merchItemId = 1;
    this.subscriberId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  // Album operations
  async getAlbums(): Promise<Album[]> {
    return Array.from(this.albums.values());
  }

  async getAlbumById(id: number): Promise<Album | undefined> {
    return this.albums.get(id);
  }

  async createAlbum(insertAlbum: InsertAlbum): Promise<Album> {
    const id = this.albumId++;
    const album = { ...insertAlbum, id };
    this.albums.set(id, album);
    return album;
  }

  // Track operations
  async getTracksByAlbumId(albumId: number): Promise<Track[]> {
    return Array.from(this.tracks.values()).filter(
      (track) => track.albumId === albumId
    );
  }

  async getTrackById(id: number): Promise<Track | undefined> {
    return this.tracks.get(id);
  }

  async createTrack(insertTrack: InsertTrack): Promise<Track> {
    const id = this.trackId++;
    const track = { ...insertTrack, id };
    this.tracks.set(id, track);
    return track;
  }

  // Blog operations
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.blogPostId++;
    const blogPost = { ...insertBlogPost, id };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  // Merchandise operations
  async getMerchItems(): Promise<MerchItem[]> {
    return Array.from(this.merchItems.values());
  }

  async getMerchItemById(id: number): Promise<MerchItem | undefined> {
    return this.merchItems.get(id);
  }

  async createMerchItem(insertMerchItem: InsertMerchItem): Promise<MerchItem> {
    const id = this.merchItemId++;
    const merchItem = { ...insertMerchItem, id };
    this.merchItems.set(id, merchItem);
    return merchItem;
  }

  // Newsletter operations
  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const id = this.subscriberId++;
    const subscriber = { ...insertSubscriber, id };
    this.subscribers.set(id, subscriber);
    return subscriber;
  }

  // Initialize with sample data based on Hawk Eye The Rapper's content
  private initializeData() {
    // Create albums
    const fullDisclosure = this.createAlbum({
      title: "Full Disclosure",
      dedicatedTo: "Max Spiers",
      description: "A 15-track journey exploring the power of revealing hidden truths and the cost of standing for justice, inspired by Max Spiers' dedication to uncovering the truth.",
      coverImage: "/albums/full-disclosure.jpg",
      releaseYear: "2023",
      trackCount: 15
    });

    const beholdAPaleHorse = this.createAlbum({
      title: "Behold a Pale Horse",
      dedicatedTo: "Milton William Cooper",
      description: "Inspired by Cooper's relentless drive to expose hidden truths, this album examines the courage required to question everything and remain steadfast.",
      coverImage: "/albums/behold-a-pale-horse.jpg",
      releaseYear: "2024",
      trackCount: 12
    });

    const milabs = this.createAlbum({
      title: "Milabs",
      dedicatedTo: "Dr. Karla Turner",
      description: "The concluding chapter of the truth-seeking trilogy, dedicated to the memory of Dr. Karla Turner. This 13-track album explores hidden realities, trauma, and the brave search for truth in the face of disbelief.",
      coverImage: "/albums/milabs.jpg",
      releaseYear: "2025",
      trackCount: 13
    });

    // Create tracks for Milabs
    this.createTrack({
      albumId: 3, // Milabs album ID
      title: "Screen Memory",
      duration: "4:21",
      trackNumber: 1,
      lyrics: "Through the shattered lens of memory, fragments rearrange themselves into a story I can't fully recall...",
      description: "This track introduces the theme of fragmented reality and manipulated perception."
    });

    this.createTrack({
      albumId: 3, // Milabs album ID
      title: "Uninvited Guests",
      duration: "3:47",
      trackNumber: 2,
      lyrics: "Shadows move against the laws of light, presence felt without permission sought...",
      description: "This track delves into the core abduction experience – the feeling of intrusion and helplessness."
    });

    this.createTrack({
      albumId: 3, // Milabs album ID
      title: "Missing Time",
      duration: "5:18",
      trackNumber: 3,
      lyrics: "Hours dissolve between heartbeats, the clock face mocks my confusion...",
      description: "Explores the disorienting experience of unexplained gaps in memory and consciousness."
    });

    this.createTrack({
      albumId: 3, // Milabs album ID
      title: "Shadow Government",
      duration: "4:55",
      trackNumber: 4,
      lyrics: "Behind the curtain of elected powers, the true directors never show their face...",
      description: "This track examines the concept of hidden power structures operating beyond public knowledge."
    });

    // Create tracks for Behold a Pale Horse
    this.createTrack({
      albumId: 2, // Behold a Pale Horse album ID
      title: "The Whisper Network",
      duration: "3:58",
      trackNumber: 1,
      lyrics: "Information travels underground, through networks built on trust and doubt, what the screens don't show, the whispers know...",
      description: "This track opens with the dissemination of hidden knowledge – the way information travels outside official channels."
    });

    this.createTrack({
      albumId: 2, // Behold a Pale Horse album ID
      title: "Redacted Lines",
      duration: "4:12",
      trackNumber: 2,
      lyrics: "Black bars hide the truths we're not meant to see, I'm reading between the lines to discover what they're concealing from me...",
      description: "This track tackles the theme of censorship, missing information, and the deliberate obscuring of facts."
    });

    // Create tracks for Full Disclosure
    this.createTrack({
      albumId: 1, // Full Disclosure album ID
      title: "The Awakening",
      duration: "5:21",
      trackNumber: 1,
      lyrics: "Eyes wide shut became eyes wide open, what once was hidden now plainly spoken, the veil is lifting, perceptions shifting...",
      description: "This track sets the stage for the journey, capturing the moment of questioning everything and seeking deeper truths."
    });

    this.createTrack({
      albumId: 1, // Full Disclosure album ID
      title: "Echoes in the Static",
      duration: "4:45",
      trackNumber: 2,
      lyrics: "Through the noise, voices emerge, carrying messages from beyond the surface reality we're told to accept...",
      description: "As the search deepens, you start picking up signals, clues, and whispers – but also interference."
    });
    
    this.createTrack({
      albumId: 1, // Full Disclosure album ID
      title: "The Story of Our Former Glory",
      duration: "5:37",
      trackNumber: 15,
      lyrics: "Straight flames when I float make the devil loose his hold on these people\nAll this evil better recall when I show cause I came to cause static\nPut Satan in a casket send his demons back to hell and wish him well\nI'm dogmatic once they rest in peace and all these wargames cease\n\nWe can finally be released from this matrix that keeps us flying to the truth\nYou can see it in the youth we're divine at our roots\nWe got all the attributes but that's another story\nFirst we gotta win this war see I've been fighting since before...",
      description: "A powerful track exploring spiritual warfare and humanity's forgotten divine origins. The lyrics suggest we are reincarnated spiritual warriors who came to Earth to protect it from negative forces."
    });

    // Create blog posts
    this.createBlogPost({
      title: "Decoding \"Screen Memory\": The Layers of Meaning",
      content: "An in-depth exploration of the opening track from \"Milabs,\" examining the symbolism behind fragmented memories and manipulated perception...",
      excerpt: "An in-depth exploration of the opening track from \"Milabs,\" examining the symbolism behind fragmented memories and manipulated perception.",
      category: "LYRIC BREAKDOWN",
      imageUrl: "/blog/screen-memory-analysis.jpg",
      publishDate: "April 18, 2025"
    });

    this.createBlogPost({
      title: "The Trilogy Completed: Interview with Hawk Eye",
      content: "A candid conversation about completing the Mixtape Sessions trilogy, the inspirations behind each album, and what's next on the horizon...",
      excerpt: "A candid conversation about completing the Mixtape Sessions trilogy, the inspirations behind each album, and what's next on the horizon.",
      category: "INTERVIEW",
      imageUrl: "/blog/trilogy-interview.jpg",
      publishDate: "March 30, 2025"
    });

    this.createBlogPost({
      title: "Truth Seeking in the Age of Disinformation",
      content: "Reflections on the challenges of pursuing truth in an era of deliberate confusion, censorship, and narrative manipulation...",
      excerpt: "Reflections on the challenges of pursuing truth in an era of deliberate confusion, censorship, and narrative manipulation.",
      category: "PHILOSOPHY",
      imageUrl: "/blog/truth-seeking.jpg",
      publishDate: "February 15, 2025"
    });

    // Create merchandise items
    this.createMerchItem({
      name: "Graffiti Eye Long Sleeve",
      description: "Black long-sleeve with graffiti-style eye design",
      price: 35.00,
      imageUrl: "/merch/graffiti-eye-long-sleeve.jpg",
      category: "Apparel"
    });

    this.createMerchItem({
      name: "Visionary Lyrics Hoodie",
      description: "Black hoodie with futuristic \"VISIONARY LYRICS\" text",
      price: 55.00,
      imageUrl: "/merch/visionary-lyrics-hoodie.jpg",
      category: "Apparel"
    });

    this.createMerchItem({
      name: "Phoenix Rebirth T-Shirt",
      description: "Black tee with stylized phoenix in a tech-inspired design",
      price: 30.00,
      imageUrl: "/merch/phoenix-rebirth-shirt.jpg",
      category: "Apparel"
    });

    this.createMerchItem({
      name: "Urban Camo Snapback",
      description: "Cap with urban digital camo pattern and hawk eye logo",
      price: 25.00,
      imageUrl: "/merch/urban-camo-snapback.jpg",
      category: "Accessories"
    });
  }
}

// Database storage implementation using PostgreSQL
export class DatabaseStorage implements IStorage {
  // Album operations
  async getAlbums(): Promise<Album[]> {
    return await db.select().from(albums);
  }

  async getAlbumById(id: number): Promise<Album | undefined> {
    const result = await db.select().from(albums).where(eq(albums.id, id));
    return result[0];
  }

  async createAlbum(insertAlbum: InsertAlbum): Promise<Album> {
    const result = await db.insert(albums).values(insertAlbum).returning();
    return result[0];
  }

  // Track operations
  async getTracksByAlbumId(albumId: number): Promise<Track[]> {
    return await db.select().from(tracks).where(eq(tracks.albumId, albumId));
  }

  async getTrackById(id: number): Promise<Track | undefined> {
    const result = await db.select().from(tracks).where(eq(tracks.id, id));
    return result[0];
  }

  async createTrack(insertTrack: InsertTrack): Promise<Track> {
    const result = await db.insert(tracks).values(insertTrack).returning();
    return result[0];
  }

  // Blog operations
  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts);
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return result[0];
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const result = await db.insert(blogPosts).values(insertBlogPost).returning();
    return result[0];
  }

  // Merchandise operations
  async getMerchItems(): Promise<MerchItem[]> {
    return await db.select().from(merchItems);
  }

  async getMerchItemById(id: number): Promise<MerchItem | undefined> {
    const result = await db.select().from(merchItems).where(eq(merchItems.id, id));
    return result[0];
  }

  async createMerchItem(insertMerchItem: InsertMerchItem): Promise<MerchItem> {
    const result = await db.insert(merchItems).values(insertMerchItem).returning();
    return result[0];
  }

  // Newsletter operations
  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const result = await db.insert(subscribers).values(insertSubscriber).returning();
    return result[0];
  }
}

// Use DatabaseStorage for production, MemStorage for fallback
export const storage = new DatabaseStorage();
