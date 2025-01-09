"use client"; // Bu satır, Next.js 13'te sayfa bileşeninin sadece istemci tarafında çalışması gerektiğini belirtir.

import { useState, useEffect } from "react"; // React'ten 'useState' ve 'useEffect' hook'larını içeri aktarır
import Link from "next/link"; // Next.js link bileşeni
import Image from "next/image"; // Next.js image bileşeni
import { createApi } from "unsplash-js"; // Unsplash API ile fotoğraf almak için kullanılır
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // FontAwesome ikonlarını kullanmak için
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
} from "@fortawesome/free-solid-svg-icons"; // Çeşitli FontAwesome ikonlarını içe aktarır
import SearchBox from "../components/SearchBox"; // Arama kutusu bileşenini içe aktarır
import postsData from "../data/post_dataset.json"; // JSON dosyasından post verilerini alır
import icon from "../assets/icon.png"; // Uygulama ikonu
import "../../app/globals.css"; // Global CSS dosyasını içe aktarır
import "../styles/HomePage.css";

// Post verisinin yapısını tanımlar
interface Post {
  id: string; // Post ID'si
  username: string; // Kullanıcı adı
  content: string; // Post içeriği
  timestamp: string; // Zaman damgası
  likes: number; // Beğeni sayısı
  reposts: number; // Yeniden paylaşım sayısı
  tags: string[]; // Post etiketleri
  images: string[]; // Post resimleri
  comments: any[]; // Post yorumları
}

// Veritabanındaki postları tutan bir veri yapısı tanımlar
interface Data {
  posts: Post[]; // Postlar listesi
}

// Düşük çözünürlüklü bir placeholder resmini belirler
const fallbackImages = ["https://via.placeholder.com/150"];
// Profil resimleri için placeholder
const profileImages = ["https://via.placeholder.com/50"];

// Unsplash API'yi başlatır
const unsplash = createApi({
  accessKey: "uO1U414qXKPrM8i3sGQDrrBHyDxaJH_NUd4xZmwRVjw" // Unsplash API anahtarı
});

const HomePage = () => {
  // Postları ve filtrelenmiş postları tutan durum değişkenlerini oluşturur
  const [posts, setPosts] = useState<Post[]>((postsData as Data).posts);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts); // Filtrelenmiş postlar
  const [images, setImages] = useState<string[]>([]); // Postlar için resimleri tutan durum değişkeni
  const [isClient, setIsClient] = useState(false); // İstemci tarafı olup olmadığını kontrol etmek için

  // 'useEffect' hook'u ile sayfa yüklenirken resimler alınır
  useEffect(() => {
    setIsClient(true); // İlk render'da istemci tarafında çalıştığını belirtir

    const fetchImages = async () => {
      try {
        // Unsplash API'den rastgele fotoğraflar alınır
        const response = await unsplash.photos.getRandom({
          count: posts.length // Alınacak fotoğraf sayısı, post sayısına eşit
        });

        if (response.errors) {
          console.error("Error fetching images from Unsplash", response.errors);
          return;
        }

        // Fotoğraf URL'lerini alır ve durum değişkenine ekler
        if (response.response) {
          const urls = Array.isArray(response.response)
            ? response.response.map(
                (photo: { urls: { small: string } }) => photo.urls.small
              )
            : [response.response.urls.small];
          setImages(urls); // Resimleri 'images' durum değişkenine atar
        }
      } catch (error) {
        console.error("Failed to fetch images from Unsplash", error); // Hata yönetimi
      }
    };

    fetchImages(); // 'fetchImages' fonksiyonu çağrılır
  }, [posts.length]); // Post sayısı değiştiğinde yeniden çalışır

  if (!isClient) {
    return null; // Sayfa istemci tarafında render edilene kadar hiçbir şey döndürülmez
  }

  return (
    <div className='homepage-container'>
      <div className='homepage-header'>
        <h1>Home</h1> {/* Sayfa başlığı */}
        <Image src={icon} alt='Icon' width={50} height={50} />{" "}
        {/* Uygulama ikonu */}
      </div>
      <hr /> {/* Yatay çizgi */}
      <SearchBox posts={posts} onFilteredPosts={setFilteredPosts} />{" "}
      {/* Arama kutusu bileşeni */}
      <div className='post-input-container'>
        <img
          src={images[0] || profileImages[0]} // İlk resim varsa kullan, yoksa profil resmi kullan
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
              {/* Aşağıdaki ikonlar post içerisine eklenebilecek aksiyonları temsil eder */}
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
            <button className='post-button'>Post</button> {/* Paylaş butonu */}
          </div>
        </div>
      </div>
      {/* Filtrelenmiş postlar render ediliyor */}
      <div>
        {filteredPosts.map((post: Post, index: number) => (
          <div key={post.id} className='post'>
            <div className='post-header'>
              <img
                src={images[index] || profileImages[0]} // Her post için resim
                alt={`${post.username} Profile`}
                className='profile-image'
              />
              <div className='post-header-text'>
                <FontAwesomeIcon
                  icon={faEllipsisH}
                  className='three-dots-icon'
                />{" "}
                {/* Üç nokta ikonu */}
                <h3>{post.username}</h3> {/* Kullanıcı adı */}
                <span className='username-info'>@{post.username} .5m</span>{" "}
                {/* Kullanıcı ismi ve zaman bilgisi */}
              </div>
            </div>
            <p>{post.content}</p> {/* Post içeriği */}
            {images[index] ? (
              <img
                src={images[index]}
                alt='Post Image'
                className='post-image'
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  const fallbackIndex =
                    index < fallbackImages.length ? index : 0;
                  target.onerror = null; // Sonsuz döngüyü engeller
                  target.src = fallbackImages[fallbackIndex]; // Fallback resmini kullanır
                }}
              />
            ) : null}
            {/* Postun aksiyon ikonları */}
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
