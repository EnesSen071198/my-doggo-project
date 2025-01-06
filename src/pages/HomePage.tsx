"use client";
// src/fontawesome.d.ts
declare module "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
import { useState, useEffect } from "react";
import SearchBox from "../components/SearchBox";
import postsData from "../data/post_dataset.json";
import { createApi } from "unsplash-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faRetweet,
  faHeart,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

interface Post {
  id: string;
  username: string;
  content: string;
  timestamp: string;
  likes: number;
  reposts: number;
  tags: string[];
  images: string[];
  comments: any[];
}

interface Data {
  posts: Post[];
}

const fallbackImages = ["https://via.placeholder.com/150"];
const profileImages = ["https://via.placeholder.com/50"]; // Example profile image

const unsplash = createApi({
  accessKey: "uO1U414qXKPrM8i3sGQDrrBHyDxaJH_NUd4xZmwRVjw",
});

const HomePage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [posts, setPosts] = useState<Post[]>((postsData as Data).posts);
  const [images, setImages] = useState<string[]>([]);

  const handleSearch = (value: string) => {
    const data = (postsData as Data).posts.map((post: Post) => post.content);
    const results = data.filter((item: string) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(results);
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await unsplash.photos.getRandom({
          count: posts.length,
        });
        if (response.response) {
          const urls = Array.isArray(response.response)
            ? response.response.map(
                (photo: { urls: { small: string } }) => photo.urls.small
              )
            : [response.response.urls.small];
          setImages(urls);
        }
      } catch (error) {
        console.error("Failed to fetch images from Unsplash", error);
      }
    };

    fetchImages();
  }, [posts.length]);

  return (
    <div style={{ padding: "50px 100px" }}>
      <h1>Home</h1>
      <hr />
      <SearchBox onSearch={handleSearch} />

      <div>
        {posts.map((post: Post, index: number) => (
          <div key={post.id} className='post'>
            <div className='post-header'>
              <img
                src={images[index]}
                alt={`${post.username} Profile`}
                className='profile-image'
              />
              <div className='post-header-text'>
                <h3>{post.username}</h3>
                <span>{new Date(post.timestamp).toLocaleString()}</span>
              </div>
            </div>
            <p>{post.content}</p>
            {images[index] ? (
              <img
                src={images[index]}
                alt='Post Image'
                className='post-image'
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  const fallbackIndex =
                    index < fallbackImages.length ? index : 0;
                  console.error("Image failed to load: ", target.src);
                  target.onerror = null; // Prevents infinite loop if fallback image fails
                  target.src = fallbackImages[fallbackIndex]; // Use fallback image URL
                }}
              />
            ) : null}
            <div className='post-footer'>
              <span>{post.likes} Likes</span>
              <span>{post.reposts} Reposts</span>
            </div>
            <div className='post-tags'>
              {post.tags.map((tag, index) => (
                <span key={index} className='tag'>
                  {tag}
                </span>
              ))}
            </div>
            <div className='post-actions'>
              <FontAwesomeIcon icon={faComment} className='action-icon' />
              <FontAwesomeIcon icon={faRetweet} className='action-icon' />
              <FontAwesomeIcon icon={faHeart} className='action-icon' />
              <FontAwesomeIcon icon={faUpload} className='action-icon' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
