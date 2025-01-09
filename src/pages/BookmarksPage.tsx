"use client"; // Bu satır, Next.js'in bu bileşenin sadece istemci tarafında çalıştırılması gerektiğini belirtir.

import { useState, useEffect } from "react"; // React'in state ve effect hook'ları
import Link from "next/link"; // Sayfalar arası geçiş için Next.js Link bileşeni
import Image from "next/image"; // Performanslı resim işleme için Next.js Image bileşeni
import { createApi } from "unsplash-js"; // Unsplash API'den resim almak için kullanılan kütüphane
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // FontAwesome ikon bileşenleri
import {
  faComment, // Yorum ikon
  faRetweet, // Yeniden paylaşım ikon
  faHeart, // Beğeni ikon
  faUpload, // Paylaşım ikon
  faImage, // Görsel ekleme ikon
  faGrin, // Emoji ekleme ikon
  faPoll, // Anket ekleme ikon
  faCalendarAlt, // Takvim ikon
  faLaughBeam, // Eğlence ifadesi ikon
  faEllipsisH // Üç nokta (diğer seçenekler) ikon
} from "@fortawesome/free-solid-svg-icons"; // Sabit ikonlar
import SearchBox from "../components/SearchBox"; // Arama kutusu bileşenini içeri aktarır
import postsData from "../data/post_dataset.json"; // JSON formatındaki gönderi verilerini içeri aktarır
import icon from "../assets/icon.png"; // Uygulamanın simgesi
import "../../app/globals.css"; // Global CSS dosyası
import "../styles/HomePage.css"; // Sayfaya özel CSS dosyası
import Layout from "@/app/layout"; // Sayfanın genel yerleşim tasarımı

// Post yapısının veri tipini tanımlar
interface Post {
  id: string; // Gönderi kimliği
  username: string; // Gönderi sahibinin kullanıcı adı
  content: string; // Gönderi içeriği
  timestamp: string; // Gönderinin zaman bilgisi
  likes: number; // Gönderi beğeni sayısı
  reposts: number; // Gönderi paylaşım sayısı
  tags: string[]; // Gönderiye eklenmiş etiketler
  images: string[]; // Gönderiye ait resimler
  comments: any[]; // Gönderi yorumları
}

// Veritabanından gelen gönderileri temsil eden yapı
interface Data {
  posts: Post[]; // Gönderi listesi
}

// Fallback resim URL'lerini tanımlar
const fallbackImages = ["https://via.placeholder.com/150"]; // Gönderi resimleri için
const profileImages = ["https://via.placeholder.com/50"]; // Profil resimleri için

// Unsplash API'sini başlatır
const unsplash = createApi({
  accessKey: "uO1U414qXKPrM8i3sGQDrrBHyDxaJH_NUd4xZmwRVjw" // API erişim anahtarı
});

// Sayfanın ana bileşeni
const BookmarksPage = () => {
  // Durum değişkenleri
  const [posts, setPosts] = useState<Post[]>((postsData as Data).posts); // Tüm gönderileri saklar
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts); // Filtrelenmiş gönderileri saklar
  const [images, setImages] = useState<string[]>([]); // Gönderi resimlerini saklar
  const [isClient, setIsClient] = useState(false); // Sayfanın istemci tarafında çalıştığını belirler

  // Sayfa yüklendiğinde resimleri çeker ve durumu günceller
  useEffect(() => {
    setIsClient(true); // İstemci tarafı işaretlenir

    const fetchImages = async () => {
      try {
        const response = await unsplash.photos.getRandom({
          count: posts.length // Gönderi sayısı kadar resim çekilir
        });

        if (response.errors) {
          console.error("Error fetching images from Unsplash", response.errors);
          return;
        }

        if (response.response) {
          const urls = Array.isArray(response.response)
            ? response.response.map((photo) => photo.urls.small) // Küçük boyutlu resim URL'lerini çeker
            : [response.response.urls.small];
          setImages(urls); // Resimleri durum değişkenine atar
        }
      } catch (error) {
        console.error("Failed to fetch images from Unsplash", error); // Hata durumunda loglama
      }
    };

    fetchImages(); // Resim çekme işlemini başlatır
  }, [posts.length]); // Gönderi sayısı değiştiğinde yeniden çalıştırılır

  // Sayfa istemci tarafında değilse boş döndürür
  if (!isClient) {
    return null;
  }

  return (
    <Layout>
      {" "}
      {/* Genel sayfa yerleşimini saran bileşen */}
      <div className='homepage-container'>
        <div className='homepage-header'>
          <h1>Bookmarks</h1> {/* Sayfa başlığı */}
          <Image src={icon} alt='Icon' width={50} height={50} />{" "}
          {/* Sayfa ikonu */}
        </div>
        <hr /> {/* Yatay çizgi */}
        <SearchBox posts={posts} onFilteredPosts={setFilteredPosts} />{" "}
        {/* Arama kutusu */}
        <div className='post-input-container'>
          <img
            src={images[0] || profileImages[0]} // İlk resim veya varsayılan profil resmi
            alt='Profile'
            className='profile-image'
          />
          <div className='post-input-wrapper'>
            <input
              type='text'
              placeholder="  What's happening?" // Post yazma alanı
              className='post-input'
              style={{ backgroundColor: "white" }}
            />
            <div className='actions'>
              <div className='action-icons'>
                {" "}
                {/* Post aksiyon ikonları */}
                <FontAwesomeIcon
                  icon={faImage}
                  className='action-icon'
                  style={{ color: "#ff8700" }}
                />
                <FontAwesomeIcon
                  icon={faGrin}
                  className='action-icon'
                  style={{ color: "#ff8700" }}
                />
                <FontAwesomeIcon
                  icon={faPoll}
                  className='action-icon'
                  style={{ color: "#ff8700" }}
                />
                <FontAwesomeIcon
                  icon={faLaughBeam}
                  className='action-icon'
                  style={{ color: "#ff8700" }}
                />
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className='action-icon'
                  style={{ color: "#ff8700" }}
                />
              </div>
              <button className='post-button'>Post</button>{" "}
              {/* Gönderi paylaşım butonu */}
            </div>
          </div>
        </div>
        <div>
          {" "}
          {/* Gönderileri render eder */}
          {filteredPosts.map((post, index) => (
            <div key={post.id} className='post'>
              <div className='post-header'>
                <img
                  src={images[index] || profileImages[0]} // Post'a ait resim
                  alt={`${post.username} Profile`}
                  className='profile-image'
                />
                <div className='post-header-text'>
                  <FontAwesomeIcon
                    icon={faEllipsisH}
                    className='three-dots-icon'
                  />
                  <h3>{post.username}</h3> {/* Kullanıcı adı */}
                  <span className='username-info'>
                    @{post.username} .5m
                  </span>{" "}
                  {/* Kullanıcı adı ve zaman bilgisi */}
                </div>
              </div>
              <p>{post.content}</p> {/* Gönderi içeriği */}
              {images[index] ? (
                <img
                  src={images[index]}
                  alt='Post Image'
                  className='post-image'
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = fallbackImages[0];
                  }}
                />
              ) : null}
              <div className='post-actions'>
                {" "}
                {/* Aksiyon ikonları */}
                <FontAwesomeIcon icon={faComment} className='action-icon' />
                <FontAwesomeIcon icon={faRetweet} className='action-icon' />
                <FontAwesomeIcon icon={faHeart} className='action-icon' />
                <FontAwesomeIcon icon={faUpload} className='action-icon' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default BookmarksPage;
