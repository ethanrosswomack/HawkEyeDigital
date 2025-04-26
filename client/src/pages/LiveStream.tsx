import React from "react";
import LiveStream from "@/components/LiveStream";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const LiveStreamPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-navy to-dark pt-20">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold orbitron text-light mb-4">
            HAWK EYE <span className="text-orange">LIVE</span>
          </h1>
          <p className="text-light/70 max-w-3xl mx-auto">
            Join the live stream and interact directly with Hawk Eye. Get exclusive behind-the-scenes content, live performances, and participate in real-time Q&A sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <LiveStream />
          
          <div className="bg-navy/30 rounded-lg overflow-hidden shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 orbitron text-orange">
              UPCOMING STREAMS
            </h2>
            <Separator className="bg-navy/70 my-4" />
            
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold text-light">Album Release Party</h3>
                  <p className="text-light/70">
                    Celebrate the release of the new album with exclusive performances and behind-the-scenes content.
                  </p>
                  <p className="text-orange font-mono mt-2">May 15, 2025 - 8:00 PM EST</p>
                </div>
                <Button>
                  <i className="far fa-calendar-plus mr-2"></i> Add to Calendar
                </Button>
              </div>
              
              <Separator className="bg-navy/70" />
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold text-light">Listener Q&A Session</h3>
                  <p className="text-light/70">
                    Join Hawk Eye for an interactive Q&A about the lyrics and themes behind the music.
                  </p>
                  <p className="text-orange font-mono mt-2">May 30, 2025 - 7:00 PM EST</p>
                </div>
                <Button>
                  <i className="far fa-calendar-plus mr-2"></i> Add to Calendar
                </Button>
              </div>
              
              <Separator className="bg-navy/70" />
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold text-light">Studio Session Live</h3>
                  <p className="text-light/70">
                    Watch Hawk Eye work on new material live from the studio with special guest collaborators.
                  </p>
                  <p className="text-orange font-mono mt-2">June 10, 2025 - 9:00 PM EST</p>
                </div>
                <Button>
                  <i className="far fa-calendar-plus mr-2"></i> Add to Calendar
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-navy/30 rounded-lg overflow-hidden shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 orbitron text-orange">
              STREAM ARCHIVES
            </h2>
            <Separator className="bg-navy/70 my-4" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-navy/50 rounded-lg overflow-hidden group hover:bg-navy/60 transition-colors">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-navy/80 flex items-center justify-center">
                    <i className="fas fa-play-circle text-orange text-4xl opacity-80 group-hover:opacity-100 transition-opacity"></i>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-orange/90 text-dark py-1 px-2 text-xs rounded font-medium">
                    32:15
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-light group-hover:text-orange transition-colors">Truth Seeker Session #1</h3>
                  <p className="text-light/70 text-sm">April 10, 2025</p>
                </div>
              </div>
              
              <div className="bg-navy/50 rounded-lg overflow-hidden group hover:bg-navy/60 transition-colors">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-navy/80 flex items-center justify-center">
                    <i className="fas fa-play-circle text-orange text-4xl opacity-80 group-hover:opacity-100 transition-opacity"></i>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-orange/90 text-dark py-1 px-2 text-xs rounded font-medium">
                    48:23
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-light group-hover:text-orange transition-colors">Fan Meetup & Acoustic Set</h3>
                  <p className="text-light/70 text-sm">March 25, 2025</p>
                </div>
              </div>
              
              <div className="bg-navy/50 rounded-lg overflow-hidden group hover:bg-navy/60 transition-colors">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-navy/80 flex items-center justify-center">
                    <i className="fas fa-play-circle text-orange text-4xl opacity-80 group-hover:opacity-100 transition-opacity"></i>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-orange/90 text-dark py-1 px-2 text-xs rounded font-medium">
                    1:15:32
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-light group-hover:text-orange transition-colors">Deep Dive: Album Analysis</h3>
                  <p className="text-light/70 text-sm">March 15, 2025</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Button variant="outline" className="border-orange text-orange hover:text-orange hover:bg-orange/20">
                View All Archives
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStreamPage;