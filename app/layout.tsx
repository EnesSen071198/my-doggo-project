import Link from "next/link";
import { FaHome, FaHashtag, FaBookmark, FaUser } from "react-icons/fa";
import "./globals.css"; // Eğer CSS dosyanız varsa

export const metadata = {
  title: "My Next.js App",
  description: "A sample Next.js app with categorized pages.",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
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
          </nav>
          <main style={{ flex: 1, padding: "20px" }}>{children}</main>
        </div>
      </body>
    </html>
  );
};

export default Layout;
