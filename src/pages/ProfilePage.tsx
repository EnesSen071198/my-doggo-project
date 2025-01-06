import Link from "next/link";

const ProfilePage = () => {
  return (
    <div>
      <h1>Profil</h1>
      <Link href='/' legacyBehavior>
        <a>Anasayfa</a>
      </Link>
    </div>
  );
};

export default ProfilePage;
