import React, { HTMLAttributes, useRef } from 'react';

interface Props extends HTMLAttributes<HTMLElement>{
  // eslint-disable-next-line no-unused-vars
  handleSubmit?: (searchValue: string) => void
}

const Search: React.FC<Props> = ({ handleSubmit, className }) => {
  const inputRef = useRef<HTMLInputElement>();
  return (
    <form
      className={`form-inline my-2 my-lg-0 ${className || ''}`}
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(inputRef.current.value);
      }}
    >
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        name="search"
        ref={inputRef}
      />
      <button
        className="btn btn-outline-success my-2 my-sm-0"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
