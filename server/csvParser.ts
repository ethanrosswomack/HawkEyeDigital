import fs from 'fs';
import { parse } from 'csv-parse/sync';
import axios from 'axios';
import { MerchItem, Track, Album, InsertMerchItem, InsertTrack, InsertAlbum } from '@shared/schema';
import { storage } from './storage';

interface CSVMerchItem {
  Reincarnated_Store: string;
  Type: string;
  Name: string;
  SKU: string;
  Categories: string;
  Regular_price: string;
  In_stock: string;
  Description: string;
  Image_alt: string;
  Image_back: string;
  Image_front: string;
  Image_side: string;
  Audio_URL: string;
  Video_URL: string;
  Kunaki_URL: string;
  Album_Back: string;
  Album_Side: string;
  Album_Disc: string;
}

/**
 * Fetches and parses the CSV data from a URL
 */
export async function fetchCSVData(url: string): Promise<CSVMerchItem[]> {
  try {
    const response = await axios.get(url);
    const csvData = response.data;
    
    // Parse CSV
    const records = parse(csvData, {
      columns: header => 
        header.map((column: string) => column.replace(/\./g, '_')),
      skip_empty_lines: true
    });
    
    return records;
  } catch (error) {
    console.error('Error fetching or parsing CSV:', error);
    throw error;
  }
}

/**
 * Processes merchandise items from CSV
 */
export async function processMerchItems(csvItems: CSVMerchItem[]): Promise<void> {
  const apparelItems = csvItems.filter(item => 
    item.Type === 'Apparel' || 
    item.Type === 'Posters' || 
    item.Type === 'Stickers' ||
    item.Type === 'Accessories'
  );
  
  for (const item of apparelItems) {
    const merchItem: InsertMerchItem = {
      name: item.Name,
      description: item.Description,
      price: parseFloat(item.Regular_price),
      sku: item.SKU,
      type: item.Type,
      category: item.Categories,
      inStock: parseInt(item.In_stock, 10),
      imageAlt: item.Image_alt,
      imageBack: item.Image_back,
      imageFront: item.Image_front,
      imageSide: item.Image_side,
      kunakiUrl: item.Kunaki_URL
    };
    
    try {
      await storage.createMerchItem(merchItem);
    } catch (error) {
      console.error(`Error adding merch item ${item.Name}:`, error);
    }
  }
}

/**
 * Processes album and track data from CSV
 */
export async function processAlbumAndTracks(csvItems: CSVMerchItem[]): Promise<void> {
  // Find all unique albums
  const albumTypes = ['Full Disclosure', 'Behold A Pale Horse', 'Milabs'];
  const albums = new Map<string, {
    title: string,
    dedicatedTo: string,
    description: string,
    coverImage: string,
    backImage: string,
    sideImage: string,
    discImage: string,
    releaseYear: string,
    tracks: CSVMerchItem[]
  }>();
  
  // Group tracks by album
  for (const item of csvItems) {
    if (albumTypes.includes(item.Type)) {
      const albumTitle = item.Type;
      
      if (!albums.has(albumTitle)) {
        // Create a new album entry
        let dedicatedPerson = "";
        if (albumTitle === "Full Disclosure") dedicatedPerson = "Max Spiers";
        else if (albumTitle === "Behold A Pale Horse") dedicatedPerson = "Milton William Cooper";
        else if (albumTitle === "Milabs") dedicatedPerson = "Dr. Karla Turner";
        
        let releaseYear = "";
        if (albumTitle === "Full Disclosure") releaseYear = "2023";
        else if (albumTitle === "Behold A Pale Horse") releaseYear = "2024";
        else if (albumTitle === "Milabs") releaseYear = "2025";
        
        albums.set(albumTitle, {
          title: albumTitle,
          dedicatedTo: dedicatedPerson,
          description: `${albumTitle} is the ${albums.size + 1}${getSuffix(albums.size + 1)} album in Hawk Eye's truth trilogy.`,
          coverImage: item.Image_front,
          backImage: item.Album_Back || "",
          sideImage: item.Album_Side || "",
          discImage: item.Album_Disc || "",
          releaseYear,
          tracks: []
        });
      }
      
      // Add the track to the album
      albums.get(albumTitle)?.tracks.push(item);
    }
  }
  
  // Now save albums and tracks to storage
  // Convert Map to array for easier async handling
  const albumEntries = Array.from(albums.entries());
  
  for (const [albumTitle, albumData] of albumEntries) {
    try {
      const albumInsert: InsertAlbum = {
        title: albumData.title,
        dedicatedTo: albumData.dedicatedTo,
        description: albumData.description,
        coverImage: albumData.coverImage,
        backImage: albumData.backImage,
        sideImage: albumData.sideImage,
        discImage: albumData.discImage,
        releaseYear: albumData.releaseYear,
        trackCount: albumData.tracks.length
      };
      
      const album = await storage.createAlbum(albumInsert);
      
      // Insert tracks for this album
      for (let i = 0; i < albumData.tracks.length; i++) {
        const track = albumData.tracks[i];
        const trackInsert: InsertTrack = {
          albumId: album.id,
          title: track.Name,
          duration: "3:45", // Default duration if not available
          trackNumber: i + 1,
          description: track.Description,
          audioUrl: track.Audio_URL,
          videoUrl: track.Video_URL,
          imageUrl: track.Image_front,
          sku: track.SKU
        };
        
        await storage.createTrack(trackInsert);
      }
    } catch (error) {
      console.error(`Error adding album ${albumData.title}:`, error);
    }
  }
}

/**
 * Gets ordinal suffix for a number (1st, 2nd, 3rd, etc.)
 */
function getSuffix(num: number): string {
  if (num === 1) return 'st';
  if (num === 2) return 'nd';
  if (num === 3) return 'rd';
  return 'th';
}

/**
 * Processes singles from CSV
 */
export async function processSingles(csvItems: CSVMerchItem[]): Promise<void> {
  const singles = csvItems.filter(item => item.Type === 'Single');
  
  // Create a singles album if we have singles
  if (singles.length > 0) {
    try {
      const singlesAlbum: InsertAlbum = {
        title: "Singles Collection",
        dedicatedTo: "The Fans",
        description: "Collection of Hawk Eye's standalone singles.",
        coverImage: singles[0].Image_front,
        backImage: "",
        sideImage: "",
        discImage: "",
        releaseYear: "2023-2025",
        trackCount: singles.length
      };
      
      const album = await storage.createAlbum(singlesAlbum);
      
      // Add each single as a track
      for (let i = 0; i < singles.length; i++) {
        const single = singles[i];
        const trackInsert: InsertTrack = {
          albumId: album.id,
          title: single.Name,
          duration: "3:30", // Default duration
          trackNumber: i + 1,
          description: single.Description,
          audioUrl: single.Audio_URL,
          videoUrl: single.Video_URL,
          imageUrl: single.Image_front,
          sku: single.SKU
        };
        
        await storage.createTrack(trackInsert);
      }
    } catch (error) {
      console.error('Error adding singles collection:', error);
    }
  }
}

/**
 * Main function to import all data from CSV
 */
export async function importCSVData(csvUrl: string): Promise<void> {
  try {
    const csvData = await fetchCSVData(csvUrl);
    
    // Process different types of items
    await processMerchItems(csvData);
    await processAlbumAndTracks(csvData);
    await processSingles(csvData);
    
    console.log('CSV data imported successfully');
  } catch (error) {
    console.error('Error importing CSV data:', error);
    throw error;
  }
}