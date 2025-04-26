import React, { useState, useEffect } from 'react';
import H5AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { Track } from '@shared/schema';

interface AudioPlayerProps {
  tracks: Track[];
  initialTrackIndex?: number;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  tracks, 
  initialTrackIndex = 0 
}) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(initialTrackIndex);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  useEffect(() => {
    if (tracks && tracks.length > 0 && currentTrackIndex < tracks.length) {
      setCurrentTrack(tracks[currentTrackIndex]);
    }
  }, [tracks, currentTrackIndex]);

  const handleClickNext = () => {
    setCurrentTrackIndex((currentTrackIndex + 1) % tracks.length);
  };

  const handleClickPrevious = () => {
    setCurrentTrackIndex((currentTrackIndex - 1 + tracks.length) % tracks.length);
  };

  const handleEnded = () => {
    handleClickNext();
  };

  if (!currentTrack) {
    return <div className="p-4 text-light">Loading tracks...</div>;
  }

  return (
    <div className="bg-navy/30 rounded-lg overflow-hidden shadow-lg">
      <div className="p-4 flex flex-col space-y-4">
        <div className="flex items-center">
          {currentTrack.imageUrl ? (
            <img 
              src={currentTrack.imageUrl} 
              alt={`${currentTrack.title} cover`} 
              className="w-16 h-16 object-cover rounded-md mr-4"
            />
          ) : (
            <div className="w-16 h-16 bg-navy/50 rounded-md mr-4 flex items-center justify-center">
              <i className="fas fa-music text-orange text-xl"></i>
            </div>
          )}
          <div>
            <h3 className="text-lg font-bold text-orange">{currentTrack.title}</h3>
            <p className="text-light/70 text-sm">
              Track {currentTrackIndex + 1} of {tracks.length}
            </p>
          </div>
        </div>
        
        <div className="rhap_container p-2">
          <audio
            controls
            src={currentTrack.audioUrl || ''}
            onEnded={handleEnded}
            className="w-full mb-2"
          />
          <div className="flex justify-between items-center mt-2">
            <button 
              onClick={handleClickPrevious}
              className="px-3 py-1 bg-navy hover:bg-navy/80 text-orange rounded-md transition-colors"
            >
              Previous
            </button>
            <div className="text-light/70 text-sm">
              {currentTrack.trackNumber} of {tracks.length}
            </div>
            <button 
              onClick={handleClickNext}
              className="px-3 py-1 bg-navy hover:bg-navy/80 text-orange rounded-md transition-colors"
            >
              Next
            </button>
          </div>
        </div>
        
        {currentTrack.lyrics && (
          <div className="mt-4">
            <h4 className="text-md font-bold text-light mb-2">Lyrics</h4>
            <div className="bg-navy/20 p-4 rounded-md max-h-60 overflow-y-auto">
              <p className="whitespace-pre-line text-light/80">{currentTrack.lyrics}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;