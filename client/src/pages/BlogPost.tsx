import React from "react";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { BlogPost as BlogPostType } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const BlogPost: React.FC = () => {
  const [, params] = useRoute("/blog/:id");
  const postId = params?.id ? parseInt(params.id, 10) : 0;

  const { data: blogPost, isLoading } = useQuery<BlogPostType>({
    queryKey: [`/api/blog/${postId}`],
    enabled: !!postId,
  });

  const { data: relatedPosts, isLoading: isLoadingRelated } = useQuery<BlogPostType[]>({
    queryKey: ["/api/blog"],
    enabled: !!blogPost,
  });

  // Get related posts that share the same category, excluding the current post
  const filteredRelatedPosts = relatedPosts?.filter(
    (post) => post.category === blogPost?.category && post.id !== blogPost?.id
  ).slice(0, 3);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Article not found</h2>
        <Link href="/blog">
          <Button>Back to Blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy to-dark pt-20">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="mb-6">
          <Link href="/blog" className="text-orange hover:text-orange/80 transition-colors">
            <i className="fas fa-arrow-left mr-2"></i> Back to Blog
          </Link>
        </div>

        <div className="bg-navy/20 rounded-lg overflow-hidden shadow-xl mb-12">
          <div className="h-60 md:h-80 bg-navy/50 flex items-center justify-center relative">
            <div 
              className={`absolute top-0 left-0 py-1 px-3 text-xs font-bold ${
                blogPost.category === "LYRIC BREAKDOWN" 
                  ? "bg-orange text-dark" 
                  : blogPost.category === "INTERVIEW"
                  ? "bg-purple text-light"
                  : "bg-darkred text-light"
              }`}
            >
              {blogPost.category}
            </div>
            <svg
              className="w-full h-full p-12 text-orange/20"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect
                x="20"
                y="20"
                width="60"
                height="60"
                rx="5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                x1="30"
                y1="35"
                x2="70"
                y2="35"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                x1="30"
                y1="45"
                x2="70"
                y2="45"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                x1="30"
                y1="55"
                x2="70"
                y2="55"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                x1="30"
                y1="65"
                x2="50"
                y2="65"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="p-6 md:p-10">
            <span className="text-light/60 text-sm">{blogPost.publishDate}</span>
            <h1 className="text-3xl md:text-4xl font-bold my-4 orbitron text-orange">
              {blogPost.title}
            </h1>
            
            <div className="mb-8">
              <div className="w-24 h-1 bg-orange"></div>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-xl font-semibold mb-6">{blogPost.excerpt}</p>
              
              <div className="whitespace-pre-line">{blogPost.content}</div>
              
              {/* Example of styled content sections */}
              <div className="bg-navy/30 p-6 rounded-lg my-8 border border-navy/50">
                <h2 className="text-xl font-bold mb-4">Key Insights</h2>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange rounded-full mr-3 mt-2"></div>
                    <span>The themes explored in this piece connect directly to the lyrical content of the album, providing deeper context for listeners.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange rounded-full mr-3 mt-2"></div>
                    <span>Understanding the inspiration behind the music helps to appreciate the complexity of the message being conveyed.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-orange rounded-full mr-3 mt-2"></div>
                    <span>The artistic process described here showcases the intentionality behind each creative decision.</span>
                  </li>
                </ul>
              </div>
              
              <Separator className="my-8 bg-navy/50" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-navy/70 flex items-center justify-center">
                    <i className="fas fa-pen text-orange"></i>
                  </div>
                  <div>
                    <p className="font-bold">Hawk Eye The Rapper</p>
                    <p className="text-light/60 text-sm">Artist & Author</p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <a
                    href="https://twitter.com/share?url="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-navy/50 rounded-full flex items-center justify-center hover:bg-orange/20 transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <i className="fab fa-twitter text-light"></i>
                  </a>
                  <a
                    href="https://www.facebook.com/sharer/sharer.php?u="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-navy/50 rounded-full flex items-center justify-center hover:bg-orange/20 transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <i className="fab fa-facebook-f text-light"></i>
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Link copied to clipboard");
                    }}
                    className="w-8 h-8 bg-navy/50 rounded-full flex items-center justify-center hover:bg-orange/20 transition-colors"
                    aria-label="Copy link"
                  >
                    <i className="fas fa-link text-light"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!isLoadingRelated && filteredRelatedPosts && filteredRelatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-8 orbitron text-light">RELATED <span className="text-orange">ARTICLES</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredRelatedPosts.map((post) => (
                <div key={post.id} className="bg-navy/30 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                  <div className="relative overflow-hidden h-48">
                    <div className="w-full h-full bg-navy/50 flex items-center justify-center overflow-hidden">
                      <svg
                        className="w-full h-full object-cover text-orange/20 transition-transform duration-500 group-hover:scale-105"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <rect
                          x="20"
                          y="20"
                          width="60"
                          height="60"
                          rx="5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <line
                          x1="30"
                          y1="35"
                          x2="70"
                          y2="35"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <line
                          x1="30"
                          y1="45"
                          x2="70"
                          y2="45"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <line
                          x1="30"
                          y1="55"
                          x2="70"
                          y2="55"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <div 
                      className={`absolute top-0 left-0 py-1 px-3 text-xs font-bold ${
                        post.category === "LYRIC BREAKDOWN" 
                          ? "bg-orange text-dark" 
                          : post.category === "INTERVIEW"
                          ? "bg-purple text-light"
                          : "bg-darkred text-light"
                      }`}
                    >
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-light/60 text-sm">{post.publishDate}</span>
                    <h3 className="text-xl font-bold my-2">{post.title}</h3>
                    <p className="mb-4">{post.excerpt}</p>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-orange hover:text-orange/80 transition-colors text-sm font-semibold"
                    >
                      Continue Reading <i className="fas fa-arrow-right ml-1"></i>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
