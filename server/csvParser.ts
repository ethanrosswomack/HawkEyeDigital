import fs from 'fs';
import { parse } from 'csv-parse/sync';
import axios from 'axios';
import { MerchItem, Track, Album, InsertMerchItem, InsertTrack, InsertAlbum } from '@shared/schema';
import { storage } from './storage';

interface CSVMerchItem {
  Name: string;
  Type: string;
  Published: string;
  SKU: string;
  Categories: string;
  "Regular price": string;
  "In stock?": string;
  Images: string;
  Description: string;
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
    item.Type === 'simple' &&
    (item.Categories.includes('Apparel') || 
     item.Categories.includes('Posters') || 
     item.Categories.includes('Stickers') ||
     item.Categories.includes('Accessories'))
  );
  
  for (const item of apparelItems) {
    const merchItem: InsertMerchItem = {
      name: item.Name,
      description: item.Description || `Hawk Eye ${item.Name}`,
      price: parseFloat(item["Regular price"]) || 0,
      sku: item.SKU,
      type: item.Categories.split('>')[1]?.trim() || 'Merchandise',
      category: item.Categories.split('>')[0]?.trim() || 'Hawk Eye The Rapper',
      inStock: item["In stock?"] === '1' ? 1 : 0,
      imageAlt: `${item.Name} image`,
      imageBack: '',
      imageFront: item.Images || '',
      imageSide: '',
      kunakiUrl: ''
    };
    
    try {
      await storage.createMerchItem(merchItem);
      console.log(`Added merch item: ${item.Name}`);
    } catch (error) {
      console.error(`Error adding merch item ${item.Name}:`, error);
    }
  }
}

/**
 * Processes album and track data from CSV
 */
export async function processAlbumAndTracks(csvItems: CSVMerchItem[]): Promise<void> {
  // Define our trilogy albums
  const trilogyAlbums = [
    {
      title: "Full Disclosure",
      dedicatedTo: "Max Spiers",
      description: "First album in the Mixtape Sessions trilogy, exploring themes of truth and hidden knowledge.",
      coverImage: "https://via.placeholder.com/600x600.png?text=Full+Disclosure",
      releaseYear: "2023",
      tracks: [
        { title: "Truth Seekers", duration: "3:42", description: "Opening track about the search for knowledge" },
        { title: "Shadow Government", duration: "4:15", description: "Exposing hidden power structures" },
        { title: "Whistleblowers", duration: "3:37", description: "Tribute to those who speak out" },
        { title: "Project Looking Glass", duration: "4:28", description: "Referencing temporal viewing technology" },
        { title: "Breakaway Civilization", duration: "3:58", description: "On hidden advanced societies" }
      ]
    },
    {
      title: "Behold A Pale Horse",
      dedicatedTo: "Milton William Cooper",
      description: "Second album in the trilogy, named after Cooper's famous book, examining conspiracy and courage.",
      coverImage: "https://via.placeholder.com/600x600.png?text=Behold+A+Pale+Horse",
      releaseYear: "2024",
      tracks: [
        { title: "Hour of the Time", duration: "3:51", description: "Named after Cooper's radio show" },
        { title: "Mystery Babylon", duration: "4:07", description: "Ancient secret societies" },
        { title: "The Cooper Files", duration: "4:22", description: "Legacy of William Cooper" },
        { title: "Majestic Twelve", duration: "3:45", description: "On alleged secret committee" },
        { title: "Silent Weapons", duration: "4:11", description: "Information warfare in modern times" }
      ]
    },
    {
      title: "MILABS",
      dedicatedTo: "Dr. Karla Turner",
      description: "Final album in the trilogy exploring Military Abductions and alien contact phenomena.",
      coverImage: "https://via.placeholder.com/600x600.png?text=MILABS",
      releaseYear: "2025",
      tracks: [
        { title: "Screen Memory", duration: "3:48", description: "Implanted false memories" },
        { title: "Missing Time", duration: "4:03", description: "Unexplained time lapses" },
        { title: "Into The Light", duration: "3:36", description: "Transcending abduction experiences" },
        { title: "Taken", duration: "4:17", description: "Personal accounts of abduction survivors" },
        { title: "Secret Bases", duration: "3:59", description: "Underground facilities and experiments" }
      ]
    }
  ];
  
  // Add each album and its tracks to storage
  for (const albumData of trilogyAlbums) {
    try {
      const albumInsert: InsertAlbum = {
        title: albumData.title,
        dedicatedTo: albumData.dedicatedTo,
        description: albumData.description,
        coverImage: albumData.coverImage,
        backImage: "",
        sideImage: "",
        discImage: "",
        releaseYear: albumData.releaseYear,
        trackCount: albumData.tracks.length
      };
      
      const album = await storage.createAlbum(albumInsert);
      console.log(`Added album: ${albumData.title}`);
      
      // Insert tracks for this album
      for (let i = 0; i < albumData.tracks.length; i++) {
        const track = albumData.tracks[i];
        const trackInsert: InsertTrack = {
          albumId: album.id,
          title: track.title,
          duration: track.duration,
          trackNumber: i + 1,
          description: track.description,
          audioUrl: `https://audio.hawkeyerapper.com/${albumData.title.toLowerCase().replace(/ /g, '_')}/${track.title.toLowerCase().replace(/ /g, '_')}.mp3`,
          videoUrl: "",
          imageUrl: albumData.coverImage,
          sku: `HE-${albumData.title.substring(0, 2).toUpperCase()}-${i+1}`
        };
        
        await storage.createTrack(trackInsert);
        console.log(`Added track: ${track.title} to ${albumData.title}`);
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
  // Define our singles collection
  const singles = [
    { title: "Hawk's Nest Anthem", duration: "3:33", description: "The official anthem of the Hawk's Nest online community" },
    { title: "Shadow Banned", duration: "3:18", description: "Commentary on digital censorship and suppression" },
    { title: "Digital Warrior", duration: "4:02", description: "Dedication to online truth seekers and researchers" }
  ];
  
  try {
    const singlesAlbum: InsertAlbum = {
      title: "Singles Collection",
      dedicatedTo: "The Fans",
      description: "Collection of Hawk Eye's standalone singles.",
      coverImage: "https://via.placeholder.com/600x600.png?text=Singles+Collection",
      backImage: "",
      sideImage: "",
      discImage: "",
      releaseYear: "2023-2025",
      trackCount: singles.length
    };
    
    const album = await storage.createAlbum(singlesAlbum);
    console.log(`Added album: Singles Collection`);
    
    // Add each single as a track
    for (let i = 0; i < singles.length; i++) {
      const single = singles[i];
      const trackInsert: InsertTrack = {
        albumId: album.id,
        title: single.title,
        duration: single.duration,
        trackNumber: i + 1,
        description: single.description,
        audioUrl: `https://audio.hawkeyerapper.com/singles/${single.title.toLowerCase().replace(/ /g, '_')}.mp3`,
        videoUrl: "",
        imageUrl: "https://via.placeholder.com/600x600.png?text=Hawk+Eye+Single",
        sku: `HE-SG-${i+1}`
      };
      
      await storage.createTrack(trackInsert);
      console.log(`Added single: ${single.title}`);
    }
  } catch (error) {
    console.error('Error adding singles collection:', error);
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