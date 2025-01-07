"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { createApi } from "unsplash-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faRetweet,
  faHeart,
  faUpload,
  faImage,
  faGrin,
  faPoll,
  faCalendarAlt,
  faLaughBeam,
  faEllipsisH
} from "@fortawesome/free-solid-svg-icons";
import SearchBox from "../components/SearchBox";
import postsData from "../data/post_dataset.json";
import icon from "../assets/icon.png";

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
  accessKey: "EjbDtCDS0TUBnWllhd57GdVR7gI5wIQbGaGbRDhVSsc"
});

const ExplorePage = () => {
  const [posts, setPosts] = useState<Post[]>((postsData as Data).posts);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [images, setImages] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const fetchImages = async () => {
      try {
        const response = await unsplash.photos.getRandom({
          count: posts.length
        });

        if (response.errors) {
          console.error("Error fetching images from Unsplash", response.errors);
          return;
        }

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

  if (!isClient) {
    return null;
  }

  return (
    <div style={{ padding: "15px 120px" }} key={isClient ? "client" : "server"}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
        <h1>Explore </h1>
        <Image src={icon} alt='Icon' width={50} height={50} />
      </div>
      <hr />
      <SearchBox posts={posts} onFilteredPosts={setFilteredPosts} />

      <div style={{ display: "flex", marginTop: "1rem" }}>
        <img
          src={images[0] || profileImages[0]}
          alt='Profile'
          style={{
            borderRadius: "100%",
            marginRight: "-4rem",
            marginTop: "1rem"
          }}
          className='profile-image'
        />
        <div style={{ flex: 1, borderRight: "1px solid #ddd" }}>
          <input
            type='text'
            placeholder="  What's happening?"
            className='post-input'
            style={{
              width: "70%",
              padding: "1rem",
              marginBottom: "1rem",
              backgroundColor: "white",
              fontSize: "1.5rem",
              borderRight: " 1px solid #ddd"
            }}
          />
          <div className='actions'>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "7rem"
              }}>
              <FontAwesomeIcon icon={faImage} className='action-icon' />
              <FontAwesomeIcon icon={faGrin} className='action-icon' />
              <FontAwesomeIcon icon={faPoll} className='action-icon' />
              <FontAwesomeIcon icon={faLaughBeam} className='action-icon' />
              <FontAwesomeIcon icon={faCalendarAlt} className='action-icon' />
            </div>
            <button
              style={{
                backgroundColor: "#ff8700",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "10rem",
                border: "none",
                cursor: "pointer",
                marginRight: "2rem"
              }}>
              Post
            </button>
          </div>
        </div>
      </div>

      <div>
        {filteredPosts.map((post: Post, index: number) => (
          <div key={post.id} className='post' style={{ position: "relative" }}>
            <div className='post-header' style={{ position: "relative" }}>
              <img
                src={images[index] || profileImages[0]}
                alt={`${post.username} Profile`}
                className='profile-image'
              />
              <div className='post-header-text'>
                <FontAwesomeIcon
                  icon={faEllipsisH}
                  className='three-dots-icon'
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0"
                  }}
                />
                <h3>{post.username}</h3>
                <span className='username-info'>@{post.username} .5m</span>
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

export default ExplorePage;
