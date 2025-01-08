"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHome, FaHashtag, FaBookmark, FaUser } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import "./globals.css";
import { createApi } from "unsplash-js"; // Unsplash API ile fotoğraf almak için kullanılır
import postsData from "../src/data/post_dataset.json"; // JSON dosyasından post verilerini alır
import { Post } from "./types"; // Post tipini burada kullanıyoruz

// Unsplash API'yi başlatır
const unsplash = createApi({
  accessKey: "EjbDtCDS0TUBnWllhd57GdVR7gI5wIQbGaGbRDhVSsc"
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [unsplashImages, setUnsplashImages] = useState<string[]>([]);
  const [userProfile, setUserProfile] = useState({
    username: "DefaultUser", // Varsayılan kullanıcı adı
    profileImage: "https://via.placeholder.com/50" // Varsayılan profil resmi
  });

  useEffect(() => {
    // İlk kullanıcıyı örnek olarak çekiyoruz (isteğe bağlı olarak başka bir yöntemle değiştirilebilir)
    const userData = postsData.posts[1]; // `postsData` içindeki ilk postu çekiyoruz
    if (userData) {
      setUserProfile({
        username: userData.username,
        profileImage: "https://via.placeholder.com/50" // Profil resmini de buradan çekebilirsiniz
      });
    }

    const fetchProfileImage = async () => {
      try {
        const response = await unsplash.photos.getRandom({ count: 1 });
        if (response.response && Array.isArray(response.response)) {
          setUnsplashImages(response.response.map((photo) => photo.urls.small));
        }
      } catch (error) {
        console.error("Unsplash API error:", error);
      }
    };

    fetchProfileImage();
  }, []);

  return (
    <html lang='en'>
      <head>
        <title>Doggo Task App</title>
      </head>
      <body>
        <div className='container'>
          <nav className='navbar'>
            <ul className='ul-list'>
              <li className='li-list'>
                <Link href='/' legacyBehavior>
                  <a className='link'>
                    <FaHome className='icon' />
                    Home
                  </a>
                </Link>
              </li>
              <li className='li-list'>
                <Link href='/ExplorePage' legacyBehavior>
                  <a className='link'>
                    <FaHashtag className='icon' />
                    Explore
                  </a>
                </Link>
              </li>
              <li className='li-list'>
                <Link href='/BookmarksPage' legacyBehavior>
                  <a className='link'>
                    <FaBookmark className='icon' />
                    Bookmarks
                  </a>
                </Link>
              </li>
              <li className='li-list'>
                <Link href='/ProfilePage' legacyBehavior>
                  <a className='link'>
                    <FaUser className='icon' />
                    Profile
                  </a>
                </Link>
              </li>
            </ul>
            <button className='new-post-button'>New Post</button>

            <Link href='/ProfilePage' legacyBehavior>
              <button className='profile-button'>
                <img
                  src={unsplashImages[0] || userProfile.profileImage}
                  alt='Profile'
                  style={{
                    borderRadius: "50%",
                    marginRight: "0.5rem",
                    width: "50px",
                    height: "50px"
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/50"; // Fallback profil resmi
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>{userProfile.username}</div>
                  <div
                    style={{
                      color: "gray",
                      fontSize: "0.8rem",
                      justifyContent: "start"
                    }}>
                    @{userProfile.username}
                  </div>{" "}
                </div>

                <FontAwesomeIcon
                  icon={faEllipsisH}
                  className='three-dots-icon'
                />
              </button>
            </Link>
          </nav>

          <main style={{ flex: 1, padding: "20px" }}>{children}</main>
        </div>
      </body>
    </html>
  );
};

export default Layout;
