Doggo Görevi

Bu projede Next.js kullanarak sıfırdan bir web uygulaması geliştirdik. Projede kullanılan dosya ve klasörlerin düzenlenmesi ile ilgili ayrıntılı bilgiler aşağıda yer almaktadır.

---

Proje Yapısı

    src klasörü içerisinde:

        assets: Projede kullanılan ikonlar ve medya dosyaları.

                Verilen projede kullanılan ikon burada bulunmaktadır. FontAwesome'da "sparkles" ikonu Pro sürümde olduğu için, Canva ile düzenlemeler yapılıp icon.png formatında yüklenmiştir.

        components: Projede kullanılan bileşenler.

                Arama çubuğu bileşeni için searchbox.tsx oluşturulmuştur.

        data: JSON formatında verilerin ve API bileşenlerinin bulunduğu klasör.

                post_dataset.json ve unsplash.js bileşenleri burada yer alır. Eğer JSON formatındaki resim verileri hatalıysa, Unsplash API kullanılarak yeni resimler çekilir.

        pages: Proje içerisindeki sayfa bileşenleri.

                Kategori bileşenleri: BookmarkPage, ExplorePage, HomePage, ProfilePage.

        styles: Projede kullanılan CSS dosyaları.

                İlgili bileşenlere uygun CSS dosyaları burada yer alır.

---

    Ana Dizinde Bulunan Dosyalar

        app klasöründe:

                page.tsx: Ana sayfa bileşeninin import edildiği dosya.

                types klasörü: TSX formatının verilerinin tiplerinin belirlendiği dosyalar.

                layout.tsx: Görevde verilen sitenin iskeletinin oluşturulduğu dosya. Aynı dizinde bulunan global.css ile görünüm tamamlanmıştır.

---

    Kullanılan Kütüphaneler

        Next.js: Projeyi oluşturmak için : npx create-next-app@latest my-doggo-project  -> cd my-doggo-project -> npm run dev

        React ve React DOM: React bileşenleri için : npm install react react-dom

        FontAwesome: İkonlar için kullanılmıştır : npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons unsplash-js

        Unsplash JS: Unsplash API kullanımı için : npm install unsplash-js

---

    Ek Bilgiler
        Projenin son hali ve nasıl göründüğünü anlatmak için çekilen video ve ekran görüntüleri, projenin ana dizininde oluşturulan "doggo-proje-done" dosyasına eklenmiştir.

---

    Açıklamalar ve Yorumlar
        Proje sonunda tüm TSX ve CSS dosyalarına yapay zeka kullanarak yorum satırları eklenmiştir. Bu sayede neyin ne olduğu ve nereden geldiği net bir şekilde anlaşılması amaçlanmıştır.

---

    Proje Sahibi Bilgileri
        Enes Şen
        enessen071198@gmail.com veya  infoenessen@gmail.com
        Linkedin : https://www.linkedin.com/in/enes--sen/
        Github : https://github.com/EnesSen071198
