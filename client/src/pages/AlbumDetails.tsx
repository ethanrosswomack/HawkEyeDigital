import React from "react";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Album, Track } from "@shared/schema";
import { Button } from "@/components/ui/button";

const AlbumDetails: React.FC = () => {
  const [, params] = useRoute("/album/:id");
  const albumId = params?.id ? parseInt(params.id, 10) : 0;

  const { data: album, isLoading: isLoadingAlbum } = useQuery<Album>({
    queryKey: [`/api/albums/${albumId}`],
    enabled: !!albumId,
  });

  const { data: tracks, isLoading: isLoadingTracks } = useQuery<Track[]>({
    queryKey: [`/api/albums/${albumId}/tracks`],
    enabled: !!albumId,
  });

  if (isLoadingAlbum || isLoadingTracks) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Album not found</h2>
        <Link href="/#music">
          <Button>Back to Music</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy to-dark pt-20">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Album Cover */}
          <div className="md:w-1/3">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-radial from-purple to-transparent rounded-lg blur-xl opacity-70"></div>
              <div className="bg-navy/50 aspect-square rounded-lg overflow-hidden relative z-10 shadow-2xl flex items-center justify-center">
                <svg
                  className="w-full h-full p-8 text-orange/30"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" />
                  <circle cx="50" cy="50" r="35" fill="currentColor" opacity="0.2" />
                  <text x="50" y="55" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="Orbitron" fontWeight="bold">
                    {album.title.toUpperCase()}
                  </text>
                </svg>
              </div>
            </div>

            <div className="mt-8 bg-navy/30 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-4 orbitron text-orange">ALBUM INFO</h3>
              <div className="space-y-2">
                <p><span className="text-light/60">Release Year:</span> {album.releaseYear}</p>
                <p><span className="text-light/60">Dedicated To:</span> {album.dedicatedTo}</p>
                <p><span className="text-light/60">Track Count:</span> {album.trackCount}</p>
              </div>
              
              <div className="mt-6 space-x-4">
                <Button className="bg-orange text-dark hover:bg-orange/90">
                  <i className="fab fa-spotify mr-2"></i> SPOTIFY
                </Button>
                <Button variant="outline" className="border-light/30 hover:bg-light/5">
                  <i className="fab fa-apple mr-2"></i> APPLE MUSIC
                </Button>
              </div>
            </div>
          </div>
          
          {/* Album Details */}
          <div className="md:w-2/3">
            <div className="mb-6">
              <Link href="/#music" className="text-orange hover:text-orange/80 transition-colors">
                <i className="fas fa-arrow-left mr-2"></i> Back to Albums
              </Link>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 orbitron text-orange">
              {album.title.toUpperCase()}
            </h1>
            
            <div className="mb-8">
              <div className="w-24 h-1 bg-orange"></div>
            </div>
            
            <div className="mb-8">
              <p className="text-xl mb-4">Dedicated to {album.dedicatedTo}</p>
              <p className="text-light/80">{album.description}</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6 orbitron">TRACK LISTING</h2>
              <div className="space-y-4">
                {tracks?.map((track) => (
                  <div key={track.id} className="flex items-center border-b border-navy/30 pb-3">
                    <span className="w-10 text-center text-orange">
                      {String(track.trackNumber).padStart(2, "0")}
                    </span>
                    <div className="flex-1 ml-4">
                      <h3 className="font-bold">{track.title}</h3>
                      <p className="text-light/60 text-sm">{track.description}</p>
                    </div>
                    <span className="text-light/60">{track.duration}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-2 orbitron">ABOUT THE ALBUM</h2>
              
              <div className="bg-navy/20 p-6 rounded-lg">
                <h3 className="font-bold text-xl mb-4">The Story Behind the Music</h3>
                <p className="mb-4">
                  {album.title} is part of the "Mixtape Sessions" trilogy, a collection of albums exploring the themes of 
                  Truth, Justice, Bravery, and Steadfastness. Each album in the trilogy is dedicated to a figure who challenged
                  established narratives and sought to bring hidden knowledge to light.
                </p>
                <p>
                  This album specifically honors the work and legacy of {album.dedicatedTo}, whose commitment to 
                  {album.title === "Full Disclosure" 
                    ? " uncovering what he believed to be the truth, regardless of personal cost, became a powerful symbol of the relentless pursuit of knowledge."
                    : album.title === "Behold a Pale Horse"
                    ? " exposing what he saw as hidden truths and government secrets serves as the core inspiration, examining the courage required to question everything."
                    : " researching and documenting the experiences of individuals claiming abduction by non-human entities provides the inspiration for exploring these hidden realities."
                  }
                </p>
              </div>
              
              <div className="text-center mt-8">
                <Link href="/lyrics">
                  <Button className="px-8 py-4 bg-gradient-to-r from-purple to-darkred text-light font-semibold rounded-md hover:opacity-90 transition-opacity orbitron">
                    EXPLORE LYRICS & MEANINGS <i className="fas fa-book-open ml-2"></i>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetails;
