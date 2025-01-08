"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../../app/globals.css"; // Eğer CSS dosyanız varsa
import "../styles/SearchBox.css";
// Define the Post type
type Post = {
  id: string;
  username: string;
  content: string;
  timestamp: string;
  likes: number;
  reposts: number;
  tags: string[];
  images: string[];
  comments: any[];
};

const SearchBox = ({
  posts,
  onFilteredPosts
}: {
  posts: Post[];
  onFilteredPosts: (filteredPosts: Post[]) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filter posts based on search term
    const filteredPosts = posts.filter((post) =>
      post.content.toLowerCase().includes(value.toLowerCase())
    );

    onFilteredPosts(filteredPosts);
  };

  return (
    <div className='search-container'>
      <input
        type='text'
        value={searchTerm}
        onChange={handleSearch}
        placeholder='Search Posts'
        className='search-input'
      />
      <FontAwesomeIcon icon={faSearch} className='search-icon' />
    </div>
  );
};

export default SearchBox;
