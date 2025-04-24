import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BlogPost as BlogPostType } from "@shared/schema";
import BlogPost from "../components/BlogPost";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: blogPosts, isLoading } = useQuery<BlogPostType[]>({
    queryKey: ["/api/blog"],
  });

  const filteredPosts = blogPosts?.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      activeCategory === "all" || 
      post.category.toLowerCase() === activeCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  // Extract unique categories from blog posts
  const categories = blogPosts
    ? ["all", ...new Set(blogPosts.map((post) => post.category.toLowerCase()))]
    : ["all"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy to-dark pt-20">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 orbitron text-light">
            BLOG & <span className="text-orange">UPDATES</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Dive deeper into the mind behind the music. Articles, lyric breakdowns,
            and thought pieces.
          </p>
          <div className="w-24 h-1 bg-orange mx-auto mt-6"></div>
        </div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-1/2">
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-navy/30 border border-navy/50 rounded-md"
              />
            </div>
            <div className="w-full md:w-auto">
              <Tabs
                value={activeCategory}
                onValueChange={setActiveCategory}
                className="w-full"
              >
                <TabsList className="bg-navy/30 p-1 rounded-md">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="data-[state=active]:bg-orange data-[state=active]:text-dark capitalize"
                    >
                      {category === "all" ? "All Categories" : category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-orange rounded-full border-t-transparent animate-spin"></div>
          </div>
        ) : filteredPosts && filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogPost key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-navy/20 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">No Articles Found</h2>
            <p className="text-light/70 mb-6">
              No articles match your current search criteria.
            </p>
            {searchTerm && (
              <Button
                className="bg-orange text-dark"
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </Button>
            )}
          </div>
        )}

        <div className="mt-16 bg-navy/20 p-8 rounded-lg border border-navy/40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4 orbitron text-orange">
                FEATURED ARTICLES
              </h2>
              <p className="mb-6">
                Explore in-depth breakdowns of lyrics, interviews, and philosophical pieces that
                delve into the themes running through Hawk Eye's music.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange rounded-full mr-3"></div>
                  <span className="text-light/80">The Philosophy Behind the Mixtape Sessions Trilogy</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange rounded-full mr-3"></div>
                  <span className="text-light/80">Analyzing the Symbolism in "Screen Memory"</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange rounded-full mr-3"></div>
                  <span className="text-light/80">The Influences: From Hip-Hop to Visionary Art</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange rounded-full mr-3"></div>
                  <span className="text-light/80">Truth Seeking Through Music: An Artist's Journey</span>
                </li>
              </ul>
            </div>
            <div>
              <div className="bg-navy/40 p-6 rounded-lg border border-navy/60">
                <h3 className="font-bold text-xl mb-4 text-orange">SUBSCRIBE TO THE BLOG</h3>
                <p className="mb-4">
                  Get notified when new articles, lyric breakdowns, and interviews are published.
                </p>
                <form className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 bg-navy/50 border border-navy rounded-md"
                  />
                  <Button className="w-full px-6 py-3 bg-orange text-dark font-semibold rounded-md hover:bg-orange/90 transition-colors orbitron">
                    SUBSCRIBE TO BLOG UPDATES
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
