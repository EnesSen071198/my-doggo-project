// types.ts

// Yorum (Comment) tipi tanımlanıyor
export interface Comment {
  username: string; // Yorumu yapan kullanıcının kullanıcı adı
  content: string; // Yorumun içeriği
  timestamp: string; // Yorumun yapıldığı zaman damgası
}

// Gönderi (Post) tipi tanımlanıyor
export interface Post {
  id: string; // Gönderinin benzersiz kimliği
  username: string; // Gönderiyi yapan kullanıcının kullanıcı adı
  content: string; // Gönderinin içeriği
  timestamp: string; // Gönderinin oluşturulduğu zaman damgası
  likes: number; // Gönderinin aldığı beğeni sayısı
  reposts: number; // Gönderinin tekrar paylaşıldığı (repost) sayısı
  tags: string[]; // Gönderiye eklenen etiketler (tag) listesi
  images: string[]; // Gönderiye eklenen görsellerin URL'lerini içeren liste
  comments: Comment[]; // Gönderiye yapılan yorumların listesi
}
