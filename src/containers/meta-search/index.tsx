import React from 'react';
import { useSelector } from 'react-redux';

type ResultSet = {
  pages: number,
  total: number,
  limit: number,
  count: number,
  isLoading: boolean,
  page: number,
};

const select = (store: any): ResultSet => {
  const {
    total, count, limit, offset,
  } = store.comics.meta;

  let pages = 0;
  try {
    pages = Math.ceil(total / (count + 1));
  } catch (error) {
    pages = 0;
  }

  const page = (offset / limit) + 1;

  return {
    pages, page, total, count, limit, isLoading: store.comics.isLoading,
  };
};

/**
 * This container component renders the meta data of the searched/fetched data.
 */
const MetaSearchData: React.FC = () => {
  const {
    page, pages, total, count, isLoading,
  } = useSelector<any, ResultSet>(select);
  return (
    <div id="search-meta-result" className={`d-flex justify-content-left p-3 ${isLoading ? 'invisible' : 'visible'}`}>
      <span>
        {(page * count) - count} - {page * count} of {total} results ({pages} pages)
      </span>
    </div>
  );
};

export default MetaSearchData;
