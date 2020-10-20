import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import formatISO from 'date-fns/formatISO';
import subYears from 'date-fns/subYears';

import Pagging from '../../components/pagging';
import Thumbnail from '../../components/thumbnail';
import { fetchComics, paginateComics } from '../../store/comics/actions';
import rootStore from '../../store';

import './index.css';

type ResultSet = {
  grid: any[][],
  length: number,
  pages: number,
  isLoading: boolean,
  count: number,
  page: number,
  query: {
    characters: string,
  }
};

const ROWS = 10;
const COLUMNS = 10;

const select = (store: any): ResultSet => {
  const {
    total, count, offset, limit,
  } = store.comics.meta;
  const page = offset / limit;
  const selected = store.comics.comics[page] || [];
  const { query, isLoading } = store.comics;
  const { length } = store.comics.comics;

  const grid = [];
  for (let row = 0; row < ROWS; row += 1) {
    grid.push([
      ...selected.slice(row * COLUMNS, (row * COLUMNS) + COLUMNS),
    ]);
  }

  let pages = 0;
  try {
    pages = total / count;
  } catch (error) {
    pages = 0;
  }

  return {
    grid,
    length,
    pages,
    isLoading,
    count,
    query,
    page,
  };
};

const Grid: React.FC = () => {
  const dispatch = useDispatch();
  const {
    page, grid, pages, isLoading,
  } = useSelector<any, ResultSet>(select);
  const [selectedPage, setSelectedPage] = useState(0);

  useEffect(() => {
    const now = new Date();
    const dateRange = [formatISO(subYears(now, 2), { representation: 'date' }), formatISO(now, { representation: 'date' })];
    dispatch(fetchComics({
      limit: ROWS * COLUMNS,
      offset: 0,
      characters: '',
      dateRange: dateRange.join(','),
    }));
  }, [dispatch]);

  useEffect(() => { setSelectedPage(page); }, [page]);

  return (
    <div className="grid">

      {isLoading === false ? grid.map((row, index) => (
        <div key={`row-${index.toString()}`} className="row">
          {row.map((col) => (
            <div key={col.id} className="col">
              <Thumbnail
                title={col.title}
                alt={col.title}
                url={col.thumbnail.path}
                variant="portrait_medium"
                extension={col.thumbnail.extension}
                creators={col.creators.items}
              />
            </div>
          ))}
        </div>
      )) : <p>loading...</p>}

      {pages > 0 && isLoading === false && (
      <div className="fixed-bottom d-flex justify-content-center">
        <Pagging
          page={selectedPage}
          pages={Math.floor(pages)}
          onChange={(nextPage) => {
            const limit = ROWS * COLUMNS;
            const { comics } = rootStore.getState();
            setSelectedPage(nextPage);

            if (!comics.comics[nextPage]) {
              dispatch(fetchComics({
                limit,
                offset: limit * nextPage,
                characters: comics.query.characters,
              }));
            } else {
              dispatch(paginateComics({
                limit,
                offset: limit * nextPage,
                characters: comics.query.characters,
              }));
            }
          }}
        />
      </div>
      )}

    </div>
  );
};

export default Grid;
