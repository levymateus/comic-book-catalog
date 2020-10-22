import React, { HTMLAttributes, useState } from 'react';
import { useHistory } from 'react-router';
import { SearchIcon } from '../../components/icons';

import './index.css';

import Suggester from '../../components/suggester';
import { fetchCharacter } from '../../api';

interface Props extends HTMLAttributes<HTMLElement>{
  // eslint-disable-next-line no-unused-vars
  handleSubmit?: (searchValue: string) => void
}

const Search: React.FC<Props> = ({ handleSubmit, className }) => {
  const [search, setSeach] = useState('');
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form
      id="search-form"
      className={`search-form form-inline my-2 my-lg-0 ${className || ''}`}
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(search);
      }}
    >
      <div className="search-form-container input-group">
        <Suggester
          loading={isLoading}
          onSelectItem={(item: any) => {
            history.replace(`/comics/${item.id}`);
          }}
          onError={(error): void => console.error(error)}
          className="form-control"
          placeholder="Search by character name"
          aria-label="Search"
          renderItem={(item: any) => item.name}
          onChange={(value: string) => new Promise<unknown[]>((resolve, reject) => {
            setSeach(value);
            if ((value.length === 1)) {
              setIsLoading(true);
              fetchCharacter({ nameStartsWith: value, limit: 100, offset: 0 }).then((data) => {
                if (data && data.code === 200) {
                  setIsLoading(false);
                  resolve(data.data.results);
                } else {
                  reject(data);
                }
              });
            }
          })}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" type="submit" id="button-addon2" form="search-form">
            <SearchIcon />
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
