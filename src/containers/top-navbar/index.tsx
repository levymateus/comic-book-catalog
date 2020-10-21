import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { fetchCharacter } from '../../api';
import Navbar from '../../components/navbar';
import Search from '../../components/search';
import { resetComics } from '../../store/comics/actions';

const TopNavbar: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSearch = async (search: string): Promise<void> => {
    if (search) {
      const character = await fetchCharacter({
        name: search,
        nameStartsWith: search,
      });
      if (character.data.results.length) {
        const characters = character.data.results.map((char) => char.id).join(',');
        history.replace(`/comics/${characters}`);
      } else {
        dispatch(resetComics());
      }
    } else {
      history.replace('/comics/');
    }
  };

  return (
    <Navbar fixedTop variant="dark">
      <a className="navbar-brand" href="/">Marvel comics</a>
      <div className="search-width d-flex justify-content-center">
        <Search handleSubmit={handleSearch} />
      </div>
    </Navbar>
  );
};

export default TopNavbar;
