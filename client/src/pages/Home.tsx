import React from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import AlbumCard from "../components/AlbumCard";
import LyricCard from "../components/LyricCard";
import BlogPost from "../components/BlogPost";
import { Album, Track, BlogPost as BlogPostType } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const Home: React.FC = () => {
  const { toast } = useToast();
  const [email, setEmail] = React.useState("");

  // Fetch albums
  const { data: albums, isLoading: isLoadingAlbums } = useQuery<Album[]>({
    queryKey: ["/api/albums"],
  });

  // Fetch featured tracks for the lyrics section
  const { data: featuredTracks, isLoading: isLoadingTracks } = useQuery<Track[]>({
    queryKey: ["/api/albums/3/tracks"], // Assuming Milabs album has ID 3
    enabled: !!albums,
  });

  // Fetch blog posts
  const { data: blogPosts, isLoading: isLoadingBlogPosts } = useQuery<BlogPostType[]>({
    queryKey: ["/api/blog"],
  });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    try {
      await apiRequest("POST", "/api/subscribe", { email });
      
      toast({
        title: "Subscribed!",
        description: "You have successfully joined the Hawk Eye newsletter.",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "There was an error subscribing to the newsletter. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="pt-24 md:pt-0 min-h-screen bg-gradient-to-b from-navy to-dark flex items-center">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 orbitron">
                <span className="text-light">HAWK EYE</span>
                <span className="block text-orange">THE RAPPER</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-light/80">
                The Voice of a Generation Seeking Truth and Transformation
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#music">
                  <Button className="inline-block px-6 py-3 bg-orange text-dark font-semibold rounded-md hover:bg-orange/90 transition-colors orbitron">
                    EXPLORE MUSIC
                  </Button>
                </Link>
                <Link href="#latest">
                  <Button variant="outline" className="inline-block px-6 py-3 bg-transparent border-2 border-orange text-orange font-semibold rounded-md hover:bg-orange/10 transition-colors orbitron">
                    LATEST RELEASE
                  </Button>
                </Link>
              </div>
              <div className="flex space-x-4 mt-8">
                <a
                  href="https://spotify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light hover:text-orange transition-colors"
                  aria-label="Spotify"
                >
                  <i className="fab fa-spotify text-2xl"></i>
                </a>
                <a
                  href="https://music.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light hover:text-orange transition-colors"
                  aria-label="Apple Music"
                >
                  <i className="fab fa-apple text-2xl"></i>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light hover:text-orange transition-colors"
                  aria-label="YouTube"
                >
                  <i className="fab fa-youtube text-2xl"></i>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light hover:text-orange transition-colors"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram text-2xl"></i>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light hover:text-orange transition-colors"
                  aria-label="Twitter"
                >
                  <i className="fab fa-twitter text-2xl"></i>
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple via-darkred to-orange rounded-full blur-xl opacity-70 animate-pulse"></div>
                <img
                  src="https://omniversal.cloud/symbols/hawk_emblem/hawk_emblem_red_transparent.png"
                  alt="Hawk Eye The Rapper"
                  className="relative rounded-lg w-full max-w-md object-contain shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Release Section */}
      <section id="latest" className="py-20 bg-gradient-to-b from-dark to-navy">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 orbitron text-light">
              LATEST <span className="text-orange">RELEASE</span>
            </h2>
            <div className="w-24 h-1 bg-orange mx-auto"></div>
          </div>

          {isLoadingAlbums || !albums ? (
            <div className="flex justify-center">
              <div className="w-12 h-12 border-4 border-orange rounded-full border-t-transparent animate-spin"></div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="md:w-1/2 order-2 md:order-1">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 orbitron text-orange">
                  {albums[2]?.title.toUpperCase()}
                </h3>
                <p className="text-lg mb-6">{albums[2]?.description}</p>

                <div className="space-y-4 mb-8">
                  {isLoadingTracks ? (
                    <div className="flex justify-center">
                      <div className="w-8 h-8 border-2 border-orange rounded-full border-t-transparent animate-spin"></div>
                    </div>
                  ) : (
                    featuredTracks?.slice(0, 4).map((track, index) => (
                      <div key={track.id} className="flex items-center">
                        <span className="w-10 text-center text-orange">
                          {String(track.trackNumber).padStart(2, "0")}
                        </span>
                        <span className="flex-1 border-b border-light/20 mx-4"></span>
                        <span className="text-light">{track.title}</span>
                        <span className="ml-4 text-light/60">{track.duration}</span>
                      </div>
                    ))
                  )}
                  <div className="flex items-center">
                    <span className="w-10 text-center text-orange">...</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button className="inline-flex items-center px-6 py-3 bg-orange text-dark font-semibold rounded-md hover:bg-orange/90 transition-colors orbitron">
                    <i className="fas fa-play mr-2"></i> LISTEN NOW
                  </Button>
                  <Button
                    variant="outline"
                    className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-light text-light font-semibold rounded-md hover:bg-light/10 transition-colors orbitron"
                  >
                    <i className="fas fa-book mr-2"></i> LYRICS
                  </Button>
                </div>
              </div>

              <div className="md:w-1/2 order-1 md:order-2 flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-radial from-purple to-transparent rounded-full blur-xl opacity-70"></div>
                  <div className="rounded-lg shadow-2xl relative z-10 max-w-md bg-navy/50 aspect-square flex items-center justify-center p-8">
                    <img 
                      src="https://omniversal.cloud/symbols/hawk_emblem/hawk_emblem_red_solid.png"
                      alt="Hawk Eye Album Emblem"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Mixtape Sessions Trilogy */}
      <section id="music" className="py-20 bg-dark">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 orbitron text-light">
              THE MIXTAPE <span className="text-orange">SESSIONS</span> TRILOGY
            </h2>
            <p className="text-xl max-w-3xl mx-auto">
              A powerful trilogy exploring the perilous quest for Truth, Justice,
              Bravery, and Steadfastness — each album dedicated to a figure who
              challenged established narratives.
            </p>
            <div className="w-24 h-1 bg-orange mx-auto mt-6"></div>
          </div>

          {isLoadingAlbums ? (
            <div className="flex justify-center">
              <div className="w-12 h-12 border-4 border-orange rounded-full border-t-transparent animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {albums?.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
            <Link href="/discography">
              <Button className="inline-block px-8 py-4 bg-gradient-to-r from-purple to-darkred text-light font-semibold rounded-md hover:opacity-90 transition-opacity orbitron">
                EXPLORE FULL DISCOGRAPHY <i className="fas fa-music ml-2"></i>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Lyrics Section */}
      <section id="lyrics" className="py-20 bg-gradient-to-b from-navy to-dark">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 orbitron text-light">
              LYRIC <span className="text-orange">ARCHIVES</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto">
              Explore the meaning behind the words. Dive into detailed annotations and
              breakdowns of Hawk Eye's message-driven lyrics.
            </p>
            <div className="w-24 h-1 bg-orange mx-auto mt-6"></div>
          </div>

          {isLoadingTracks || isLoadingAlbums || !albums ? (
            <div className="flex justify-center">
              <div className="w-12 h-12 border-4 border-orange rounded-full border-t-transparent animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTracks?.slice(0, 3).map((track) => (
                <LyricCard
                  key={track.id}
                  track={track}
                  albumTitle={albums.find(a => a.id === track.albumId)?.title || ""}
                />
              ))}
            </div>
          )}

          <div className="mt-12">
            <div className="bg-navy/20 backdrop-blur-sm rounded-lg p-8 border border-navy/40">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3">
                  <h3 className="text-2xl font-bold mb-4 orbitron text-orange">
                    LYRIC BOOK
                  </h3>
                  <p className="mb-6">
                    Access the complete collection of Hawk Eye's lyrics, organized by
                    album and track number, with extensive annotations.
                  </p>
                  <Button className="inline-block px-6 py-3 bg-orange text-dark font-semibold rounded-md hover:bg-orange/90 transition-colors orbitron">
                    DOWNLOAD PDF <i className="fas fa-download ml-2"></i>
                  </Button>
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
      </section>

      {/* Vision & Philosophy */}
      <section id="vision" className="py-20 bg-dark">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 orbitron text-light">
              ARTISTIC <span className="text-orange">VISION</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto">
              Music as a vehicle for change, exploration, and uncovering hidden truths —
              the philosophy behind Hawk Eye's artistic journey.
            </p>
            <div className="w-24 h-1 bg-orange mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-purple to-darkred rounded-xl blur-xl opacity-50"></div>
                <div className="rounded-lg shadow-2xl relative z-10 bg-navy/30 aspect-video flex items-center justify-center p-8">
                  <img
                    src="https://omniversal.cloud/symbols/hawk_emblem/hawk_emblem_black_white.png"
                    alt="Hawk Eye Vision Symbol"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 orbitron text-orange">
                  TRUTH SEEKING
                </h3>
                <p>
                  At the core of my artistic expression is an unwavering commitment to
                  seeking truth, even when that pursuit leads down challenging and
                  controversial paths. Each album, each track is a step further into
                  uncovering hidden realities and giving voice to perspectives that
                  challenge established narratives.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 orbitron text-orange">
                  SOCIAL JUSTICE
                </h3>
                <p>
                  My music aims to shine a spotlight on systemic issues like inequality,
                  government transparency, and the fight for marginalized voices. I
                  believe that art has a responsibility to address these issues and
                  inspire action toward a more just world.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 orbitron text-orange">
                  CONSCIOUSNESS & SPIRITUALITY
                </h3>
                <p>
                  Beyond social justice, my work explores themes of human consciousness
                  and spiritual awakening. I'm fascinated by the deeper questions of
                  existence, the nature of reality, and the potential for transformation
                  through heightened awareness.
                </p>
              </div>

              <div className="pt-4">
                <Link href="/vision">
                  <Button className="inline-block px-6 py-3 bg-gradient-to-r from-purple to-darkred text-light font-semibold rounded-md hover:opacity-90 transition-opacity orbitron">
                    READ FULL MANIFESTO <i className="fas fa-file-alt ml-2"></i>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog/Updates Section */}
      <section id="blog" className="py-20 bg-dark">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 orbitron text-light">
              BLOG & <span className="text-orange">UPDATES</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto">
              Dive deeper into the mind behind the music. Articles, lyric breakdowns,
              and thought pieces.
            </p>
            <div className="w-24 h-1 bg-orange mx-auto mt-6"></div>
          </div>

          {isLoadingBlogPosts ? (
            <div className="flex justify-center">
              <div className="w-12 h-12 border-4 border-orange rounded-full border-t-transparent animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts?.slice(0, 3).map((post) => (
                <BlogPost key={post.id} post={post} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/blog">
              <Button className="inline-block px-8 py-4 bg-gradient-to-r from-purple to-darkred text-light font-semibold rounded-md hover:opacity-90 transition-opacity orbitron">
                EXPLORE ALL ARTICLES <i className="fas fa-newspaper ml-2"></i>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-b from-navy to-dark">
        <div className="container mx-auto px-4 md:px-6">
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-purple via-darkred to-orange p-0.5">
              <div className="bg-dark/95 p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 orbitron text-light">
                      JOIN THE <span className="text-orange">RESISTANCE</span>
                    </h2>
                    <p className="mb-6">
                      Subscribe to receive updates on new releases, tour dates, merch
                      drops, and exclusive content directly to your inbox.
                    </p>
                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
                      <Input
                        type="email"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 px-4 py-3 bg-navy/50 border border-navy text-light rounded-md focus:outline-none focus:ring-2 focus:ring-orange"
                      />
                      <Button 
                        type="submit"
                        className="px-6 py-3 bg-orange text-dark font-semibold rounded-md hover:bg-orange/90 transition-colors orbitron whitespace-nowrap"
                      >
                        SUBSCRIBE
                      </Button>
                    </form>
                    <p className="mt-4 text-light/60 text-sm">
                      No spam, unsubscribe at any time. Your data will be handled
                      according to our privacy policy.
                    </p>
                  </div>
                  <div className="flex justify-center md:justify-end">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-tr from-orange to-purple rounded-full blur-md opacity-70"></div>
                      <div className="relative bg-dark rounded-full p-6">
                        <img
                          src="https://omniversal.cloud/symbols/hawk_emblem/hawk_emblem_neongreen_black.png"
                          alt="Hawk Eye Logo"
                          className="w-40 h-40 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
