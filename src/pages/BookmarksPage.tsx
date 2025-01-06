import Link from "next/link";

const BookmarksPage = () => {
  return (
    <div>
      <h1>Yer İmleri</h1>
      <Link href='/' legacyBehavior>
        <a>Anasayfa</a>
      </Link>
    </div>
  );
};

export default BookmarksPage;
