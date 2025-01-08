import Link from "next/link";
import { FaHome, FaHashtag, FaBookmark, FaUser } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons"; // Adding the icon for three dots
import "./globals.css"; // Eğer CSS dosyanız varsa
import postsData from "../src/data/post_dataset.json";

export const metadata = {
  title: "My Doggo Project",
  description: "Enes Sen Doggo Project"
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const userProfile = {
    username: "YourUsername", // Replace this with the actual username from your data
    profileImage: "https://via.placeholder.com/50" // Replace this with the actual image URL from your data
  };

  return (
    <html lang='en'>
      <head>
        <title>My Next.js App</title>
      </head>
      <body>
        <div className='container'>
          <nav className='navbar'>
            <ul className='ul-list'>
              <li className='li-list'>
                <Link href='/' legacyBehavior>
                  <a className='link'>
                    <FaHome className='icon' />
                    Home
                  </a>
                </Link>
              </li>
              <li className='li-list'>
                <Link href='/ExplorePage' legacyBehavior>
                  <a className='link'>
                    <FaHashtag className='icon' />
                    Explore
                  </a>
                </Link>
              </li>
              <li className='li-list'>
                <Link href='/BookmarksPage' legacyBehavior>
                  <a className='link'>
                    <FaBookmark className='icon' />
                    Bookmarks
                  </a>
                </Link>
              </li>
              <li className='li-list'>
                <Link href='/ProfilePage' legacyBehavior>
                  <a className='link'>
                    <FaUser className='icon' />
                    Profile
                  </a>
                </Link>
              </li>
            </ul>
            <button
              style={{
                backgroundColor: "#e56d18",
                color: "white",
                padding: "0.5rem 4rem",
                borderRadius: "10rem",
                border: "none",
                cursor: "pointer",
                marginTop: "6rem"
              }}>
              New Post
            </button>

            <Link href='/ProfilePage' legacyBehavior>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.5rem 1rem",
                  borderRadius: "10rem",
                  border: "none",
                  cursor: "pointer",
                  marginTop: "3rem",
                  position: "relative",
                  backgroundColor: "transparent" // Background color removed
                }}>
                <img
                  src={userProfile.profileImage}
                  alt='Profile'
                  style={{ borderRadius: "50%", marginRight: "0.5rem" }}
                />
                {userProfile.username}
                <FontAwesomeIcon
                  icon={faEllipsisH}
                  className='three-dots-icon'
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    color: "#ddd"
                  }}
                />
              </button>
            </Link>
          </nav>
          <main style={{ flex: 1, padding: "20px" }}>{children}</main>
        </div>
      </body>
    </html>
  );
};

export default Layout;
