// "use client" Next.js'in istemci tarafında çalışacağını belirtir
"use client";

// Gerekli modüller ve kütüphaneler import ediliyor
import Link from "next/link"; // Sayfa geçişleri için Link bileşeni
import { useEffect, useState } from "react"; // React'ten Hook'lar
import { FaHome, FaHashtag, FaBookmark, FaUser } from "react-icons/fa"; // FontAwesome ikonları
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // FontAwesome bileşeni
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons"; // Üç nokta simgesi
import "./globals.css"; // Global CSS dosyası
import { createApi } from "unsplash-js"; // Unsplash API'si için kullanılır
import postsData from "../src/data/post_dataset.json"; // JSON dosyasından veri alınır
import { Post } from "./types"; // Post veri tipi tanımlanır

// Unsplash API'si başlatılıyor
const unsplash = createApi({
  accessKey: "uO1U414qXKPrM8i3sGQDrrBHyDxaJH_NUd4xZmwRVjw" // API anahtarı
});

// Layout bileşeni, tüm sayfa düzenini oluşturur
const Layout = ({ children }: { children: React.ReactNode }) => {
  // Unsplash'ten alınan görüntüler için state
  const [unsplashImages, setUnsplashImages] = useState<string[]>([]);

  // Kullanıcı profil bilgileri için state
  const [userProfile, setUserProfile] = useState({
    username: "DefaultUser", // Varsayılan kullanıcı adı
    profileImage: "https://via.placeholder.com/50" // Varsayılan profil resmi
  });

  // Sayfa yüklendiğinde çalışacak olan useEffect
  useEffect(() => {
    // İlk kullanıcı verilerini alıyoruz
    const userData = postsData.posts[1]; // JSON'dan ilk post verisi alınıyor
    if (userData) {
      setUserProfile({
        username: userData.username, // Kullanıcı adı güncelleniyor
        profileImage: "https://via.placeholder.com/50" // Profil resmi (isteğe bağlı)
      });
    }

    // Unsplash API'sinden rastgele bir profil resmi alınıyor
    const fetchProfileImage = async () => {
      try {
        const response = await unsplash.photos.getRandom({ count: 1 }); // Rastgele 1 fotoğraf al
        if (response.response && Array.isArray(response.response)) {
          setUnsplashImages(response.response.map((photo) => photo.urls.small)); // Fotoğraf URL'lerini kaydet
        }
      } catch (error) {
        console.error("Unsplash API error:", error); // Hata durumunda konsola yazdır
      }
    };

    fetchProfileImage(); // Fonksiyonu çağır
  }, []); // Boş bağımlılık dizisi ile sadece ilk yüklemede çalışır

  // Bileşenin HTML çıktısı
  return (
    <html lang='en'>
      {" "}
      {/* Dil ayarı */}
      <head>
        <title>Doggo Task App</title> {/* Sayfa başlığı */}
      </head>
      <body>
        <div className='container'>
          {" "}
          {/* Ana kapsayıcı */}
          <nav className='navbar'>
            {" "}
            {/* Yan navigasyon */}
            <ul className='ul-list'>
              {" "}
              {/* Menü listesi */}
              <li className='li-list'>
                {" "}
                {/* Ana sayfa linki */}
                <Link href='/' legacyBehavior>
                  <a className='link'>
                    <FaHome className='icon' /> {/* Ev ikonu */}
                    Home
                  </a>
                </Link>
              </li>
              <li className='li-list'>
                {" "}
                {/* Keşfet linki */}
                <Link href='/ExplorePage' legacyBehavior>
                  <a className='link'>
                    <FaHashtag className='icon' /> {/* Hashtag ikonu */}
                    Explore
                  </a>
                </Link>
              </li>
              <li className='li-list'>
                {" "}
                {/* Yer imleri linki */}
                <Link href='/BookmarksPage' legacyBehavior>
                  <a className='link'>
                    <FaBookmark className='icon' /> {/* Yer imi ikonu */}
                    Bookmarks
                  </a>
                </Link>
              </li>
              <li className='li-list'>
                {" "}
                {/* Profil linki */}
                <Link href='/ProfilePage' legacyBehavior>
                  <a className='link'>
                    <FaUser className='icon' /> {/* Kullanıcı ikonu */}
                    Profile
                  </a>
                </Link>
              </li>
            </ul>
            <button className='new-post-button'>New Post</button>{" "}
            {/* Yeni gönderi butonu */}
            <Link href='/ProfilePage' legacyBehavior>
              <button className='profile-button'>
                {" "}
                {/* Profil butonu */}
                <img
                  src={unsplashImages[0] || userProfile.profileImage} // Profil resmi kaynağı
                  alt='Profile' // Alternatif metin
                  style={{
                    borderRadius: "50%", // Yuvarlak profil resmi
                    marginRight: "0.5rem", // Sağ boşluk
                    width: "50px", // Genişlik
                    height: "50px" // Yükseklik
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/50"; // Resim yüklenemezse varsayılan resim
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {" "}
                  {/* Kullanıcı bilgileri */}
                  <div>{userProfile.username}</div> {/* Kullanıcı adı */}
                  <div
                    style={{
                      color: "gray", // Yazı rengi
                      fontSize: "0.8rem", // Yazı boyutu
                      justifyContent: "start" // Başlangıca hizalama
                    }}>
                    @{userProfile.username}
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faEllipsisH} // Üç nokta simgesi
                  className='three-dots-icon'
                />
              </button>
            </Link>
          </nav>
          <main style={{ flex: 1, padding: "20px" }}>{children}</main>{" "}
          {/* Ana içerik */}
        </div>
      </body>
    </html>
  );
};

// Layout bileşenini dışa aktar
export default Layout;
