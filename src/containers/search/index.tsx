import React, { HTMLAttributes, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { SearchIcon } from '../../components/icons';

import './index.css';

import Suggester from '../../components/suggester';
import { fetchCharacter } from '../../api';
import { putError } from '../../store/comics/actions';

interface Props extends HTMLAttributes<HTMLElement>{
  // eslint-disable-next-line no-unused-vars
  handleSubmit?: (searchValue: string) => void
}

/**
 * This container search component containt the search logic of the application.
 */
const Search: React.FC<Props> = ({ handleSubmit, className }) => {
  const [search, setSeach] = useState('');
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

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
          onError={(): void => {
            dispatch(putError(-1));
          }}
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
