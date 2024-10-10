import React from 'react';

const SearchBar = ({ placeholder, onSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="flex justify-center mt-4" onSubmit={handleSubmit}>
      <input
        type="text"
        className="border border-gray-300 p-2 w-1/2"
        placeholder={placeholder}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
