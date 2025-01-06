"use client";

import { useState } from "react";

const SearchBox = ({ onSearch }: { onSearch: (value: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <input
      type='text'
      value={searchTerm}
      onChange={handleSearch}
      placeholder='Ara...'
      className='border p-2 w-full'
      style={{ color: "black" }}
    />
  );
};

export default SearchBox;
