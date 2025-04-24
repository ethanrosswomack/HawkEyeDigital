import React from "react";
import { Link } from "wouter";
import { BlogPost as BlogPostType } from "@shared/schema";

interface BlogPostProps {
  post: BlogPostType;
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <div className="bg-navy/30 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
      <div className="relative overflow-hidden h-60">
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
  );
};

export default BlogPost;
