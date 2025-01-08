"use client"; // Bu satır, Next.js 13'te sayfa bileşeninin sadece istemci tarafında çalışması gerektiğini belirtir.

import { useState, useEffect } from "react"; // React'ten 'useState' ve 'useEffect' hook'larını içeri aktarır
import { createApi } from "unsplash-js"; // Unsplash API ile fotoğraf almak için kullanılır
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // FontAwesome ikonlarını kullanmak için
import {
  faComment,
  faRetweet,
  faHeart,
  faUpload,
  faEllipsisH
} from "@fortawesome/free-solid-svg-icons"; // Çeşitli FontAwesome ikonlarını içe aktarır
import postsData from "../data/post_dataset.json"; // JSON dosyasından post verilerini alır
import "../styles/ProfilePage.css"; // Profil sayfası için stil
import Layout from "../../app/layout";
// Post verisinin yapısını tanımlar
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

// Unsplash API'yi başlatır
const unsplash = createApi({
  accessKey: "EjbDtCDS0TUBnWllhd57GdVR7gI5wIQbGaGbRDhVSsc"
});

const ProfilePage = () => {
  const [posts, setPosts] = useState<Post[]>((postsData as Data).posts);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [images, setImages] = useState<string[]>([]); // Postlar için resimleri tutan durum değişkeni
  const [isClient, setIsClient] = useState(false); // İstemci tarafı olup olmadığını kontrol etmek için

  useEffect(() => {
    setIsClient(true); // İlk render'da istemci tarafında çalıştığını belirtir

    const fetchImages = async () => {
      try {
        const response = await unsplash.photos.getRandom({
          count: posts.length // Alınacak fotoğraf sayısı, post sayısına eşit
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

    fetchImages(); // 'fetchImages' fonksiyonu çağrılır
  }, [posts.length]);

  if (!isClient) {
    return null; // Sayfa istemci tarafında render edilene kadar hiçbir şey döndürülmez
  }

  return (
    <Layout>
      <div className='profile-container'>
        <div className='profile-header'></div>
        <hr />
        <div className='profile-content'>
          <div className='profile-post-input-container'>
            <img
              src={images[0] || "https://via.placeholder.com/50"}
              alt='Profile'
              className='profile-profile-image'
            />
          </div>

          <div>
            {filteredPosts.map((post: Post, index: number) => (
              <div key={post.id} className='profile-post'>
                <div className='profile-post-header'>
                  <div className='profile-post-header-text'>
                    <FontAwesomeIcon
                      icon={faEllipsisH}
                      className='profile-three-dots-icon'
                    />
                    <h3>{post.username}</h3>
                    <span className='profile-username-info'>
                      @{post.username} .5m
                    </span>
                  </div>
                </div>
                <p>{post.content}</p>
                {images[index] ? (
                  <img
                    src={images[index]}
                    alt='Post Image'
                    className='profile-post-image'
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/150"; // Fallback image
                    }}
                  />
                ) : null}

                <div className='profile-post-actions'>
                  <FontAwesomeIcon
                    icon={faComment}
                    className='profile-action-icon'
                  />
                  <FontAwesomeIcon
                    icon={faRetweet}
                    className='profile-action-icon'
                  />
                  <FontAwesomeIcon
                    icon={faHeart}
                    className='profile-action-icon'
                  />
                  <FontAwesomeIcon
                    icon={faUpload}
                    className='profile-action-icon'
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
