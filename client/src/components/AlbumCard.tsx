import React from "react";
import { Link } from "wouter";
import { Album } from "@shared/schema";

interface AlbumCardProps {
  album: Album;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  return (
    <div className="album-card bg-navy/40 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl border border-navy/50">
      <div className="relative group album-hover">
        <div className="aspect-square bg-dark/60 overflow-hidden">
          <svg
            className="w-full h-full object-cover text-orange/20"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M50 20C33.431 20 20 33.431 20 50s13.431 30 30 30 30-13.431 30-30S66.569 20 50 20zm0 5c13.807 0 25 11.193 25 25S63.807 75 50 75 25 63.807 25 50s11.193-25 25-25z"
              fill="currentColor"
            />
            <circle cx="50" cy="50" r="20" fill="currentColor" opacity="0.5" />
          </svg>
        </div>
        <div className="album-overlay absolute inset-0 bg-gradient-to-t from-dark/90 to-transparent opacity-0 transition-opacity duration-300 flex items-end justify-center p-4">
          <button className="bg-orange text-dark rounded-full w-12 h-12 flex items-center justify-center hover:bg-orange/90 transition-colors mb-4">
            <i className="fas fa-play"></i>
          </button>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 orbitron text-orange">
          {album.title.toUpperCase()}
        </h3>
        <p className="text-sm mb-4 text-light/70">
          Dedicated to {album.dedicatedTo}
        </p>
        <p className="mb-4">{album.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-light/60 text-sm">
            {album.trackCount} Tracks • {album.releaseYear}
          </span>
          <Link
            href={`/album/${album.id}`}
            className="text-orange hover:text-orange/80 transition-colors text-sm font-semibold"
          >
            Learn More <i className="fas fa-arrow-right ml-1"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
