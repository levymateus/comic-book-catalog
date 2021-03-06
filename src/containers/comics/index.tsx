import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import formatISO from 'date-fns/formatISO';
import subYears from 'date-fns/subYears';
import { useHistory, useParams } from 'react-router';

import Pagging from '../../components/pagging';
import Thumbnail from '../../components/thumbnail';
import { fetchComics, paginateComics } from '../../store/comics/actions';
import rootStore from '../../store';

import './index.css';
import Error from '../error';
import { NotFound } from '../../components/not-found';
import DataProvider from '../../components/data-provider';

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

/**
 * This container component only renders a grid of fetched and storef comics.
 */
const Comics: React.FC = () => {
  const { characters } = useParams<{ characters: string }>();
  const dispatch = useDispatch();
  const {
    page, grid, pages, isLoading, count,
  } = useSelector<any, ResultSet>(select);
  const errorCode = useSelector<any, number>((store) => store.comics.errorCode);
  const [selectedPage, setSelectedPage] = useState(0);
  const history = useHistory();

  useEffect(() => {
    if (characters) {
      dispatch(fetchComics({
        limit: ROWS * COLUMNS,
        offset: 0,
        characters,
      }));
    } else {
      const now = new Date();
      const start = formatISO(subYears(now, 2), { representation: 'date' });
      const end = formatISO(now, { representation: 'date' });
      const dateRange = [start, end];
      dispatch(fetchComics({
        limit: ROWS * COLUMNS,
        offset: 0,
        characters: '',
        dateRange: dateRange.join(','),
      }));
    }
  }, [dispatch, characters]);

  useEffect(() => { setSelectedPage(page); }, [page]);

  if (errorCode) {
    return <Error errorCode={errorCode} />;
  }

  return (
    <div className={`${isLoading || count <= 1 ? 'grid wrap' : 'grid'}`}>

      {!isLoading && count <= 1 && (<NotFound />)}

      {isLoading === false && count > 1 ? grid.map((row, index) => (
        <div key={`row-${index.toString()}`} className="row">
          {row.map((col) => (
            <div key={col.id} className="col">
              <Thumbnail
                title={col.title}
                alt={col.title}
                url={col.thumbnail.path}
                variant="portrait_xlarge"
                extension={col.thumbnail.extension}
                creators={col.creators.items}
                onClick={(): void => history.replace(`/comic/${col.id}`)}
              />
            </div>
          ))}
        </div>
      )) : null}

      {isLoading && (
      <div className="d-flex justify-content-center">
        <div className="spinner-grow" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      )}

      <div className="fixed-bottom d-flex justify-content-center footer">
        <DataProvider>
          <a href="http://marvel.com">Data provided by Marvel. © 2020 MARVEL</a>
        </DataProvider>
        {pages > 0 && isLoading === false && (
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
        )}
      </div>

    </div>
  );
};

export default Comics;
