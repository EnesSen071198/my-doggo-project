// "use client" ifadesi, bu bileşenin istemci tarafında çalışacağını belirtir
"use client";

// Gerekli modüller ve kütüphaneler import ediliyor
import { useState } from "react"; // React'in useState Hook'u
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // FontAwesome bileşeni
import { faSearch } from "@fortawesome/free-solid-svg-icons"; // Arama ikonu
import "../../app/globals.css"; // Global CSS dosyası (isteğe bağlı)
import "../styles/SearchBox.css"; // SearchBox bileşeni için özel stil dosyası

// Gönderi (Post) tipini tanımlıyoruz
type Post = {
  id: string; // Gönderinin benzersiz kimliği
  username: string; // Gönderiyi yapan kullanıcının kullanıcı adı
  content: string; // Gönderinin içeriği
  timestamp: string; // Gönderinin oluşturulma zamanı
  likes: number; // Gönderinin aldığı beğeni sayısı
  reposts: number; // Gönderinin tekrar paylaşılma sayısı
  tags: string[]; // Gönderiye eklenen etiketler
  images: string[]; // Gönderiye eklenen görseller
  comments: any[]; // Gönderiye yapılan yorumlar (tipi özelleştirilebilir)
};

// SearchBox bileşeni tanımlanıyor
const SearchBox = ({
  posts, // Tüm gönderiler
  onFilteredPosts // Filtrelenmiş gönderiler için callback fonksiyonu
}: {
  posts: Post[]; // Gönderi tipi dizisi
  onFilteredPosts: (filteredPosts: Post[]) => void; // Filtrelenmiş gönderiler için fonksiyon tipi
}) => {
  const [searchTerm, setSearchTerm] = useState(""); // Arama terimi için state tanımlanıyor

  // Arama kutusunda bir değişiklik olduğunda çalışan fonksiyon
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value; // Arama kutusundaki değer
    setSearchTerm(value); // State'i güncelle

    // Gönderileri arama terimine göre filtrele
    const filteredPosts = posts.filter(
      (post) => post.content.toLowerCase().includes(value.toLowerCase()) // Arama terimi içeren gönderileri bul
    );

    onFilteredPosts(filteredPosts); // Filtrelenmiş gönderileri geri döndür
  };

  return (
    <div className='search-container'>
      {" "}
      {/* Arama kutusunun kapsayıcısı */}
      <input
        type='text' // Metin girişi
        value={searchTerm} // Arama terimi
        onChange={handleSearch} // Her değişiklikte handleSearch çağrılır
        placeholder='Search Posts' // Arama kutusundaki placeholder metni
        className='search-input' // CSS sınıfı
      />
      <FontAwesomeIcon icon={faSearch} className='search-icon' />{" "}
      {/* Arama ikonu */}
    </div>
  );
};

// SearchBox bileşeni dışa aktarılıyor
export default SearchBox;
