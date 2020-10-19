import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchCharacter } from '../../api';

import Navbar from '../../components/navbar';
import Search from '../../components/search';
import { fetchComics, resetComics } from '../../store/comics/actions';

const TopNavbar: React.FC = () => {
  const dispatch = useDispatch();

  const handleSearch = async (search: string): Promise<void> => {
    const character = await fetchCharacter({
      name: search,
      nameStartsWith: search,
    });
    if (character.data.results.length) {
      const characters = character.data.results.map((char) => char.id).join(',');
      dispatch(fetchComics({ limit: 100, offset: 0, characters }));
    } else {
      dispatch(resetComics());
    }
  };

  return (
    <Navbar fixedTop variant="dark">
      <div className="full-width d-flex justify-content-center">
        <Search handleSubmit={handleSearch} />
      </div>
    </Navbar>
  );
};

export default TopNavbar;
