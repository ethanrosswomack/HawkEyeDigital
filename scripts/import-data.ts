import { db } from '../server/db';
import { albums, tracks, merchItems, blogPosts } from '../shared/schema';
import { parse } from 'csv-parse/sync';
import { readFileSync } from 'fs';
import { join } from 'path';

interface UnifiedCatalogRow {
  track_id: string;
  title: string;
  extension: string;
  s3_url: string;
  collection_folder: string;
  album_folder: string;
  SKU: string;
  type: string;
  Description: string;
  audio_url: string;
  image_url: string;
  video_url: string;
  price: string;
  in_stock: string;
  categories: string;
  content_type: string;
}

interface StoreRow {
  Name: string;
  Type: string;
  Published: string;
  SKU: string;
  Categories: string;
  'Regular price': string;
  'In stock?': string;
  Images: string;
  Description: string;
}

// Album configurations based on the data structure
const albumConfigs = [
  {
    title: "Singles Arsenal",
    dedicatedTo: "The Voice of a Generation",
    description: "Early singles and standalone tracks showcasing Hawk Eye's versatile style and lyrical prowess.",
    releaseYear: "2018",
    trackCount: 7,
    coverImage: "https://via.placeholder.com/600x600.png?text=Singles+Arsenal",
  },
  {
    title: "Full Disclosure",
    dedicatedTo: "A Tribute to Tupac Shakur",
    description: "An introspective journey through truth, consciousness, and the legacy of hip-hop legends.",
    releaseYear: "2019",
    trackCount: 15,
    coverImage: "https://via.placeholder.com/600x600.png?text=Full+Disclosure",
  },
  {
    title: "Behold A Pale Horse",
    dedicatedTo: "Inspired by William Cooper",
    description: "A deep exploration of conspiracy, truth, and awakening in the modern world.",
    releaseYear: "2020",
    trackCount: 11,
    coverImage: "https://via.placeholder.com/600x600.png?text=Behold+A+Pale+Horse",
  },
  {
    title: "Milabs",
    dedicatedTo: "Honoring Dr. Karla Turner",
    description: "Uncovering hidden truths about military abductions and consciousness manipulation.",
    releaseYear: "2021",
    trackCount: 13,
    coverImage: "https://via.placeholder.com/600x600.png?text=Milabs",
  },
  {
    title: "Mixtape Sessions",
    dedicatedTo: "The Journey Continues",
    description: "Raw, unfiltered bars from the archive, showcasing evolution and growth.",
    releaseYear: "2021",
    trackCount: 4,
    coverImage: "https://via.placeholder.com/600x600.png?text=Mixtape+Sessions",
  },
  {
    title: "Shadow Banned",
    dedicatedTo: "The Censored Truth",
    description: "Hard-hitting tracks addressing censorship, control, and resistance in the digital age.",
    releaseYear: "2022",
    trackCount: 13,
    coverImage: "https://via.placeholder.com/600x600.png?text=Shadow+Banned",
  },
  {
    title: "Sun Tzu Reckoning",
    dedicatedTo: "The Art of War in Hip-Hop",
    description: "Strategic lyricism inspired by ancient warfare philosophy and modern battles.",
    releaseYear: "2023",
    trackCount: 1,
    coverImage: "https://via.placeholder.com/600x600.png?text=Sun+Tzu+Reckoning",
  }
];

// Map track names to albums based on the CSV structure
function getAlbumForTrack(title: string, trackId: string): number {
  const titleLower = title.toLowerCase();
  const idLower = trackId.toLowerCase();
  
  // Singles Arsenal (first 7 tracks in CSV pattern)
  if (idLower.includes('will_you_listen') || idLower.includes('psyops') || 
      idLower.includes('incantations') || idLower.includes('mind_kontrol') ||
      idLower.includes('return_of_kings') || idLower.includes('politicians') ||
      idLower.includes('the_vow')) {
    return 1;
  }
  
  // Full Disclosure
  if (idLower.includes('swordfish') || idLower.includes('mic_check') || 
      idLower.includes('shakur') || idLower.includes('last_one_left') ||
      titleLower.includes('full disclosure') || idLower.includes('lifted') ||
      idLower.includes('fuck_society') || idLower.includes('ashes') ||
      idLower.includes('haunted') || idLower.includes('monumental') ||
      idLower.includes('trafficked') || idLower.includes('hocus_pocus') ||
      idLower.includes('syntax') || idLower.includes('stay_real') ||
      idLower.includes('former_glory')) {
    return 2;
  }
  
  // Behold A Pale Horse
  if (idLower.includes('warning_shots') || titleLower.includes('behold a pale horse') ||
      idLower.includes('kamikaze') || idLower.includes('whistleblower') ||
      idLower.includes('superstitions') || idLower.includes('scripture') ||
      idLower.includes('menace_to_society') || idLower.includes('semi-automatic') ||
      idLower.includes('reverse_this_curse') || idLower.includes('10_kt') ||
      idLower.includes('celebrated_throughout_time')) {
    return 3;
  }
  
  // Milabs
  if (idLower.includes('soft_disclosure') || idLower.includes('abreactions') ||
      idLower.includes('eyes_wide_open') || idLower.includes('delta_squad') ||
      idLower.includes('implants') || idLower.includes('illuminati') ||
      idLower.includes('07_fema') || idLower.includes('08_the_antidote') ||
      idLower.includes('09_avalanche') || idLower.includes('10_artificial') ||
      idLower.includes('11_legion') || idLower.includes('12_when_my_elites') ||
      idLower.includes('13_reincarnated')) {
    return 4;
  }
  
  // Mixtape Sessions
  if (idLower.includes('malicious') || idLower.includes('gang_shit') ||
      idLower.includes('motherfucking_problem') || idLower.includes('im_him')) {
    return 5;
  }
  
  // Shadow Banned
  if (idLower.includes('psychological_warfare') || idLower.includes('down_the_rabbit') ||
      idLower.includes('domestic_terrorist') || idLower.includes('relentless') ||
      idLower.includes('never_heard_of_me') || idLower.includes('spiteful_poetry') ||
      idLower.includes('devils_in_the_details') || idLower.includes('the_game') ||
      idLower.includes('shadow_is_rising') || idLower.includes('when_shit_gets_real') ||
      idLower.includes('synthesis') || idLower.includes('invokation') ||
      idLower.includes('krystal_klear')) {
    return 6;
  }
  
  // Sun Tzu
  if (idLower.includes('sun_tzu') || idLower.includes('sunbook')) {
    return 7;
  }
  
  // Default to Singles Arsenal if unknown
  return 1;
}

export async function importAlbums() {
  console.log('Importing albums...');
  
  for (const config of albumConfigs) {
    await db.insert(albums).values(config);
  }
  
  console.log(`✓ Imported ${albumConfigs.length} albums`);
}

export async function importTracks() {
  console.log('Importing tracks from unified catalog...');
  
  const csvPath = join(process.cwd(), 'attached_assets', 'hawk_ars_unified_catalog_1760201967922.csv');
  const csvContent = readFileSync(csvPath, 'utf-8');
  
  const records: UnifiedCatalogRow[] = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
  });
  
  // Filter to only actual tracks (md/ipynb with real titles, not compilation files)
  const trackRecords = records.filter(r => 
    (r.extension === 'md' || r.extension === 'ipynb') && 
    r.title && 
    !r.title.toLowerCase().includes('arsenal') &&
    !r.title.toLowerCase().includes('compilation') &&
    !r.title.toLowerCase().includes('archive') &&
    !r.title.toLowerCase().includes('synopsis') &&
    r.track_id !== '_🦅HAWKEYETHERAPPER_TheVoiceofaGeneratio'
  );
  
  // Group by track_id to get unique tracks (avoid duplicates from md/ipynb)
  const uniqueTracks = new Map<string, UnifiedCatalogRow>();
  trackRecords.forEach(track => {
    if (!uniqueTracks.has(track.track_id)) {
      uniqueTracks.set(track.track_id, track);
    }
  });
  
  let trackNumber = 1;
  const tracksToInsert = [];
  
  for (const [trackId, track] of uniqueTracks) {
    const albumId = getAlbumForTrack(track.title, trackId);
    
    tracksToInsert.push({
      albumId,
      title: track.title,
      duration: "3:30", // Placeholder duration
      trackNumber: trackNumber++,
      lyrics: track.s3_url, // Store S3 URL for lyrics
      description: track.Description || `Track from Hawk Eye the Rapper`,
      audioUrl: track.audio_url || null,
      videoUrl: track.video_url || null,
      imageUrl: track.image_url || null,
      sku: track.SKU || null,
    });
  }
  
  if (tracksToInsert.length > 0) {
    await db.insert(tracks).values(tracksToInsert);
  }
  
  console.log(`✓ Imported ${tracksToInsert.length} unique tracks`);
}

export async function importMerch() {
  console.log('Importing merchandise...');
  
  const csvPath = join(process.cwd(), 'attached_assets', 'storecsvcontent.txt');
  const fileContent = readFileSync(csvPath, 'utf-8');
  
  // Extract CSV from RTF format - find the actual CSV content
  const csvStart = fileContent.indexOf('Name,Type,Published');
  if (csvStart === -1) {
    console.error('Could not find CSV content in store file');
    return;
  }
  
  // Extract and clean the CSV content
  const csvContent = fileContent
    .substring(csvStart)
    .replace(/\\/g, '')  // Remove RTF backslashes
    .replace(/\}/g, '')  // Remove RTF braces
    .trim();
  
  const records: StoreRow[] = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
  });
  
  const merchToInsert = records.map(item => ({
    name: item.Name,
    description: item.Description,
    price: parseFloat(item['Regular price']) || 0,
    sku: item.SKU,
    type: item.Type,
    category: item.Categories.split(' > ').pop() || 'Merchandise',
    inStock: item['In stock?'] === '1' ? 1 : 0,
    imageFront: item.Images,
    imageAlt: null,
    imageBack: null,
    imageSide: null,
    kunakiUrl: null,
  }));
  
  if (merchToInsert.length > 0) {
    await db.insert(merchItems).values(merchToInsert);
  }
  
  console.log(`✓ Imported ${merchToInsert.length} merchandise items`);
}

export async function importBlogPosts() {
  console.log('Importing blog posts...');
  
  const samplePosts = [
    {
      title: "The Voice of a Generation",
      content: "Hawk Eye the Rapper emerges as a powerful voice for truth and consciousness in hip-hop...",
      excerpt: "Introducing Hawk Eye - bringing conscious lyricism to the forefront",
      category: "News",
      imageUrl: "https://via.placeholder.com/800x400.png?text=Blog+Post",
      publishDate: new Date().toISOString(),
    },
    {
      title: "Shadow Banned Album Release",
      content: "The groundbreaking Shadow Banned album tackles censorship and digital control...",
      excerpt: "Exploring themes of censorship in the new Shadow Banned album",
      category: "Releases",
      imageUrl: "https://via.placeholder.com/800x400.png?text=Shadow+Banned",
      publishDate: new Date(Date.now() - 86400000).toISOString(),
    }
  ];
  
  await db.insert(blogPosts).values(samplePosts);
  
  console.log(`✓ Imported ${samplePosts.length} blog posts`);
}

async function main() {
  try {
    console.log('🚀 Starting data import...\n');
    
    await importAlbums();
    await importTracks();
    await importMerch();
    await importBlogPosts();
    
    console.log('\n✅ Data import complete!');
    console.log('\nSummary:');
    console.log('- Albums: 7 complete albums imported');
    console.log('- Tracks: All unique tracks mapped to albums');
    console.log('- Merchandise: All store items imported');
    console.log('- Blog: Sample posts created');
    console.log('\n📝 Note: Audio/image URLs are placeholders - real media URLs need to be added');
    
    process.exit(0);
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
}

main();
