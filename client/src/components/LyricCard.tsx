import React from "react";
import { Link } from "wouter";
import { Track } from "@shared/schema";

interface LyricCardProps {
  track: Track;
  albumTitle: string;
}

const LyricCard: React.FC<LyricCardProps> = ({ track, albumTitle }) => {
  return (
    <div className="bg-navy/30 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-navy/50">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 orbitron text-orange">
          {track.title}
        </h3>
        <p className="text-sm mb-4 text-light/70">
          From the album "{albumTitle}"
        </p>
        <p className="italic text-light/80 mb-4">
          "{track.lyrics && track.lyrics.length > 80
            ? `${track.lyrics.substring(0, 80)}...`
            : track.lyrics}"
        </p>
        <p className="mb-4">{track.description}</p>
        <Link
          href={`/lyrics#track-${track.id}`}
          className="text-orange hover:text-orange/80 transition-colors text-sm font-semibold"
        >
          Full Breakdown <i className="fas fa-arrow-right ml-1"></i>
        </Link>
      </div>
    </div>
  );
};

export default LyricCard;
