import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Album, Track } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const Lyrics: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeAlbumId, setActiveAlbumId] = useState<string>("all");

  const { data: albums, isLoading: isLoadingAlbums } = useQuery<Album[]>({
    queryKey: ["/api/albums"],
  });

  // Fetch all tracks from all albums
  const albumIds = albums?.map(album => album.id) || [];
  const trackQueries = albumIds.map(id => ({
    queryKey: [`/api/albums/${id}/tracks`],
    enabled: albumIds.length > 0,
  }));

  const tracksResults = trackQueries.map(query => 
    useQuery<Track[]>(query)
  );

  const isLoadingTracks = tracksResults.some(result => result.isLoading);
  
  // Combine all tracks into a single array
  const allTracks = tracksResults.flatMap(result => result.data || []);

  const filteredTracks = allTracks.filter(track => {
    const matchesSearch = 
      track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (track.lyrics && track.lyrics.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesAlbum = activeAlbumId === "all" || track.albumId.toString() === activeAlbumId;
    
    return matchesSearch && matchesAlbum;
  });

  // Sort tracks by album and track number
  const sortedTracks = [...filteredTracks].sort((a, b) => {
    if (a.albumId !== b.albumId) {
      return a.albumId - b.albumId;
    }
    return a.trackNumber - b.trackNumber;
  });

  const getAlbumTitle = (albumId: number): string => {
    return albums?.find(album => album.id === albumId)?.title || "Unknown Album";
  };

  if (isLoadingAlbums || isLoadingTracks) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy to-dark pt-20">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 orbitron text-light">
            LYRIC <span className="text-orange">ARCHIVES</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Explore the meaning behind the words. Dive into detailed annotations and
            breakdowns of Hawk Eye's message-driven lyrics.
          </p>
          <div className="w-24 h-1 bg-orange mx-auto mt-6"></div>
        </div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-1/2">
              <Input
                type="text"
                placeholder="Search lyrics or titles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-navy/30 border border-navy/50 rounded-md"
              />
            </div>
            <div className="w-full md:w-auto">
              <Tabs value={activeAlbumId} onValueChange={setActiveAlbumId} className="w-full">
                <TabsList className="bg-navy/30 p-1 rounded-md">
                  <TabsTrigger value="all" className="data-[state=active]:bg-orange data-[state=active]:text-dark">
                    All Albums
                  </TabsTrigger>
                  {albums?.map((album) => (
                    <TabsTrigger
                      key={album.id}
                      value={album.id.toString()}
                      className="data-[state=active]:bg-orange data-[state=active]:text-dark"
                    >
                      {album.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {sortedTracks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl">No lyrics found matching your search.</p>
              {searchTerm && (
                <Button
                  className="mt-4 bg-orange text-dark"
                  onClick={() => setSearchTerm("")}
                >
                  Clear Search
                </Button>
              )}
            </div>
          ) : (
            sortedTracks.map((track) => (
              <div 
                key={track.id} 
                id={`track-${track.id}`}
                className="bg-navy/20 rounded-lg p-6 border border-navy/40 hover:border-orange/30 transition-colors"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-orange orbitron">{track.title}</h2>
                    <p className="text-light/70">
                      From the album "{getAlbumTitle(track.albumId)}" • Track {track.trackNumber} • {track.duration}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <Button variant="outline" className="border-orange/50 text-orange hover:bg-orange/10">
                      <i className="fas fa-play mr-2"></i> Play
                    </Button>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-navy/30 p-4 rounded-md">
                    <h3 className="font-bold mb-3 text-lg">Lyrics</h3>
                    <div className="whitespace-pre-line italic text-light/80">
                      {track.lyrics || "Lyrics not available."}
                    </div>
                  </div>
                  
                  <div className="bg-navy/30 p-4 rounded-md">
                    <h3 className="font-bold mb-3 text-lg">Analysis & Meaning</h3>
                    <p>{track.description}</p>
                    
                    <div className="mt-4 pt-4 border-t border-navy/40">
                      <h4 className="font-bold mb-2">Key Themes</h4>
                      <div className="flex flex-wrap gap-2">
                        {track.title.includes("Memory") && (
                          <span className="bg-purple/30 text-light/90 px-2 py-1 rounded-md text-xs">Perception</span>
                        )}
                        {track.title.includes("Shadow") && (
                          <span className="bg-darkred/30 text-light/90 px-2 py-1 rounded-md text-xs">Power Structures</span>
                        )}
                        {track.title.includes("Whisper") && (
                          <span className="bg-forest/30 text-light/90 px-2 py-1 rounded-md text-xs">Hidden Knowledge</span>
                        )}
                        {track.title.includes("Time") && (
                          <span className="bg-navy/50 text-light/90 px-2 py-1 rounded-md text-xs">Consciousness</span>
                        )}
                        <span className="bg-orange/30 text-light/90 px-2 py-1 rounded-md text-xs">Truth Seeking</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-right">
                  {(() => {
                    let url = "";
                    let text = "";
                    
                    if (track.albumId === 1) {
                      if (track.title === "The Story of Our Former Glory") {
                        url = "https://s3.omniversalmedia.app/The%20Mixtape%20Sessions/Full_Disclosure_LYRICS-HERE_BACKUP_Markdown/15_the_story_of_our_former_glory.md";
                        text = "Full Breakdown";
                      } else if (track.title === "Syntax") {
                        url = "https://s3.omniversalmedia.app/The%20Mixtape%20Sessions/Part%201%20-%20Full%20Disclosure/Mardown/13_syntax%20copy.md";
                        text = "Full Breakdown";
                      } else {
                        url = "https://s3.omniversalmedia.app/The%20Mixtape%20Sessions/Full_Disclosure_LYRICS-HERE_BACKUP_Markdown/";
                        text = "Album Lyrics";
                      }
                    } else if (track.albumId === 2) {
                      url = "https://s3.omniversalmedia.app/The%20Mixtape%20Sessions/Part%202%20-%20Behold%20A%20Pale%20Horse";
                      text = "Album Lyrics";
                    } else {
                      url = "https://s3.omniversalmedia.app/The%20Mixtape%20Sessions/Part%203%20-%20Milabs";
                      text = "Album Lyrics";
                    }
                    
                    return (
                      <a 
                        href={url}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-orange hover:text-orange/80 font-semibold flex items-center justify-end"
                      >
                        {text} <i className="fas fa-arrow-right ml-1"></i>
                      </a>
                    );
                  })()}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-12 bg-navy/20 backdrop-blur-sm rounded-lg p-8 border border-navy/40">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3">
              <h3 className="text-2xl font-bold mb-4 orbitron text-orange">
                LYRIC BOOK
              </h3>
              <p className="mb-6">
                Access the complete collection of Hawk Eye's lyrics, organized by
                album and track number, with extensive annotations.
              </p>
              <a 
                href="https://s3.omniversalmedia.app/The%20Mixtape%20Sessions/Mixtape_Sessions_Archive_ReportLab.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-orange text-dark font-semibold rounded-md hover:bg-orange/90 transition-colors orbitron"
              >
                DOWNLOAD PDF <i className="fas fa-download ml-2"></i>
              </a>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-navy/40 p-4 rounded-md">
                <h4 className="font-bold mb-2">Full Disclosure</h4>
                <ul className="space-y-1 text-sm">
                  <li>• The Awakening</li>
                  <li>• Echoes in the Static</li>
                  <li>• Gathering Shadows</li>
                  <li>• The Confrontation</li>
                  <li>• Moments of Doubt</li>
                </ul>
              </div>
              <div className="bg-navy/40 p-4 rounded-md">
                <h4 className="font-bold mb-2">Behold a Pale Horse</h4>
                <ul className="space-y-1 text-sm">
                  <li>• The Whisper Network</li>
                  <li>• Redacted Lines</li>
                  <li>• Secret Societies</li>
                  <li>• The Watcher's Burden</li>
                  <li>• Questioning Authority</li>
                </ul>
              </div>
              <div className="bg-navy/40 p-4 rounded-md">
                <h4 className="font-bold mb-2">Milabs</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Screen Memory</li>
                  <li>• Uninvited Guests</li>
                  <li>• Missing Time</li>
                  <li>• Shadow Government</li>
                  <li>• Psychic Scars</li>
                </ul>
              </div>
              <div className="bg-navy/40 p-4 rounded-md">
                <h4 className="font-bold mb-2">Singles & Features</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Visionary</li>
                  <li>• Omniversal</li>
                  <li>• No Chains</li>
                  <li>• Rebel Forever</li>
                  <li>• Galactic Dreams</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lyrics;
