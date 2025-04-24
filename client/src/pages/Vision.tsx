import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const Vision: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-navy to-dark pt-20">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 orbitron text-light">
            ARTISTIC <span className="text-orange">VISION</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Music as a vehicle for change, exploration, and uncovering hidden truths —
            the philosophy behind Hawk Eye's artistic journey.
          </p>
          <div className="w-24 h-1 bg-orange mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-navy/30 p-6 rounded-lg border border-navy/50">
            <div className="h-16 w-16 bg-orange/20 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-search text-2xl text-orange"></i>
            </div>
            <h2 className="text-xl font-bold mb-3 orbitron text-orange">TRUTH SEEKING</h2>
            <p>
              At the core of my artistic expression is an unwavering commitment to
              seeking truth, even when that pursuit leads down challenging and
              controversial paths. Each album, each track is a step further into
              uncovering hidden realities and giving voice to perspectives that
              challenge established narratives.
            </p>
          </div>

          <div className="bg-navy/30 p-6 rounded-lg border border-navy/50">
            <div className="h-16 w-16 bg-orange/20 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-balance-scale text-2xl text-orange"></i>
            </div>
            <h2 className="text-xl font-bold mb-3 orbitron text-orange">JUSTICE</h2>
            <p>
              My music aims to shine a spotlight on systemic issues like inequality,
              government transparency, and the fight for marginalized voices. I
              believe that art has a responsibility to address these issues and
              inspire action toward a more just world. The pursuit of justice informs
              both the content and the purpose of my work.
            </p>
          </div>

          <div className="bg-navy/30 p-6 rounded-lg border border-navy/50">
            <div className="h-16 w-16 bg-orange/20 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-fist-raised text-2xl text-orange"></i>
            </div>
            <h2 className="text-xl font-bold mb-3 orbitron text-orange">BRAVERY</h2>
            <p>
              Creating art that challenges prevailing narratives requires courage.
              I draw inspiration from figures who risked everything to speak what
              they believed was true. Bravery isn't about being fearless; it's about
              moving forward despite fear. My music celebrates this spirit of
              courage in the face of opposition.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <div className="bg-navy/20 p-8 rounded-lg border border-navy/40">
            <h2 className="text-2xl font-bold mb-6 orbitron text-orange">THE MIXTAPE SESSIONS TRILOGY</h2>
            <p className="mb-6">
              The "Mixtape Sessions" trilogy represents my most comprehensive artistic statement on truth, justice, 
              bravery, and steadfastness. Each album is dedicated to a figure whose work and life embodied these values:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-navy/40 p-4 rounded-md">
                <h3 className="font-bold mb-2 text-light">Full Disclosure</h3>
                <p className="text-light/80 text-sm mb-2">Dedicated to Max Spiers</p>
                <p className="text-sm">
                  Explores the initial awakening to hidden truths and the revelatory journey
                  of uncovering what lies beneath the surface.
                </p>
              </div>
              
              <div className="bg-navy/40 p-4 rounded-md">
                <h3 className="font-bold mb-2 text-light">Behold a Pale Horse</h3>
                <p className="text-light/80 text-sm mb-2">Dedicated to Milton William Cooper</p>
                <p className="text-sm">
                  Examines the costs and consequences of broadcasting uncomfortable truths
                  and the steadfastness required to maintain one's position.
                </p>
              </div>
              
              <div className="bg-navy/40 p-4 rounded-md">
                <h3 className="font-bold mb-2 text-light">Milabs</h3>
                <p className="text-light/80 text-sm mb-2">Dedicated to Dr. Karla Turner</p>
                <p className="text-sm">
                  Delves into the most suppressed and challenging aspects of hidden reality,
                  giving voice to experiences often dismissed or ridiculed.
                </p>
              </div>
            </div>
            
            <p>
              Together, these albums create a narrative arc that mirrors the journey of awakening:
              from initial discovery, through the challenges of speaking out, to the most profound
              and personal confrontations with hidden realities.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold mb-6 orbitron text-orange">MUSICAL INFLUENCES & APPROACH</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Beyond Genre Boundaries</h3>
                <p>
                  My music draws from hip-hop's truth-telling tradition, spoken word's poetic depth,
                  and the visionary storytelling of artists who transcend conventional categories.
                  I believe that powerful messages require musical settings that break through
                  familiar patterns to create new spaces for thought.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-2">Lyrics as Primary Medium</h3>
                <p>
                  While production and beats provide the foundation, the lyrics are always the
                  focal point. Each verse is crafted to convey meaning on multiple levels -
                  from the immediately accessible to deeper layers that reveal themselves through
                  repeated listening and reflection.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-2">Sonic Architecture</h3>
                <p>
                  The production choices echo the themes of each track, using soundscapes that
                  evoke the emotional and conceptual territory being explored. From sparse,
                  haunting arrangements to dense, multi-layered compositions, the sound always
                  serves the message.
                </p>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-purple to-darkred rounded-xl blur-xl opacity-50"></div>
              <div className="relative z-10 bg-navy/30 rounded-lg p-8 border border-navy/50">
                <h3 className="text-xl font-bold mb-4 orbitron text-orange">ARTISTIC STATEMENT</h3>
                <p className="italic text-light/90 mb-6">
                  "My music exists to challenge perceptions, to question the accepted, and to give
                  voice to perspectives that are often silenced. I believe that art should 
                  not merely entertain, but transform - opening doors to new ways of seeing
                  and understanding our reality.
                </p>
                <p className="italic text-light/90">
                  In a world increasingly dominated by superficial content and algorithmically-determined
                  tastes, I choose to create work that demands engagement, that resists easy
                  categorization, and that honors the intelligence and curiosity of the listener.
                  This is music for those who seek more than distraction - it's for those who
                  seek truth, in all its complexity."
                </p>
                <div className="mt-6 text-right">
                  <p className="font-bold orbitron">— Hawk Eye The Rapper</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <div className="bg-navy/20 p-8 rounded-lg border border-navy/40">
            <h2 className="text-2xl font-bold mb-6 orbitron text-orange">CONSCIOUSNESS & SPIRITUALITY</h2>
            <p className="mb-6">
              Beyond social justice and political themes, my work explores the terrain of human
              consciousness and spiritual awakening. I'm fascinated by the deeper questions of
              existence, the nature of reality, and the potential for transformation through
              heightened awareness.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-3">Challenging Materialism</h3>
                <p>
                  Much of my music questions the materialist paradigm that dominates contemporary
                  thought. By exploring phenomenon and experiences that challenge conventional
                  understanding, I invite listeners to expand their conception of what is possible
                  and real.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3">Personal Transformation</h3>
                <p>
                  I believe that societal change begins with individual transformation. My music
                  aims to catalyze this process by removing barriers to perception and creating
                  space for new understandings to emerge. The personal journey of awakening is
                  inseparable from the larger collective movement toward truth.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <Link href="/#music">
            <Button className="px-8 py-4 bg-gradient-to-r from-purple to-darkred text-light font-semibold rounded-md hover:opacity-90 transition-opacity orbitron">
              EXPLORE THE MUSIC <i className="fas fa-headphones ml-2"></i>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Vision;
