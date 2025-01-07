"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../../app/globals.css"; // Eğer CSS dosyanız varsa

const SearchBox = ({ onSearch }: { onSearch: (value: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
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
