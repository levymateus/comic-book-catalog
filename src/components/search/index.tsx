import React, { HTMLAttributes, useRef } from 'react';
import { SearchIcon } from '../icons';

import './index.css';

interface Props extends HTMLAttributes<HTMLElement>{
  // eslint-disable-next-line no-unused-vars
  handleSubmit?: (searchValue: string) => void
}

const Search: React.FC<Props> = ({ handleSubmit, className }) => {
  const inputRef = useRef<HTMLInputElement>();
  return (
    <form
      className={`search-form form-inline my-2 my-lg-0 ${className || ''}`}
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(inputRef.current.value);
      }}
    >
      <div className="search-form-container input-group">
        <input
          className="form-control"
          type="search"
          placeholder="Search by character name"
          aria-label="Search"
          name="search"
          ref={inputRef}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" type="button" id="button-addon2"> <SearchIcon /></button>
        </div>
      </div>
    </form>
  );
};

export default Search;
