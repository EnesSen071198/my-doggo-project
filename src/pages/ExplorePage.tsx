import Link from "next/link";

const ExplorePage = () => {
  return (
    <div>
      <h1>Keşfet</h1>
      <Link href='/' legacyBehavior>
        <a>Anasayfa</a>
      </Link>
    </div>
  );
};

export default ExplorePage;
