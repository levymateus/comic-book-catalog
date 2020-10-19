/* eslint-disable no-unused-vars */
import React, {
  useState, useEffect, useCallback, HTMLAttributes,
} from 'react';

import './index.css';

interface Props extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  page: number;
  pages: number;
  onChange: (page: number) => void;
}

const initialState = [0, 1, 2];

const Pagging: React.FC<Props> = ({
  page, pages, onChange, className,
}) => {
  const [list, setList] = useState<number[]>(initialState);
  const lastPageValue = list[list.length - 1];
  const firstPageValue = list[0];

  const onChangeCallback = useCallback(onChange, []);

  const pagesList = useCallback(() => [
    ...list.map((value) => {
      if (value < pages) {
        return (
          <li
            key={`pagging-${value.toString()}`}
            className={`page-item ${value === page ? 'active' : ''}`}
          >
            <button
              type="button"
              className="page-link"
              onClick={(event) => {
                event.preventDefault();
                onChangeCallback(value);
              }}
            >
              {(value + 1).toString()}
              {value === page && <span className="sr-only">(current)</span>}
            </button>
          </li>
        );
      }
      return null;
    }),
  ], [list, pages, page, onChangeCallback]);

  useEffect(() => {
    if (page >= lastPageValue && page < pages) {
      setList((prevList) => [...prevList.map((_, index) => (lastPageValue + index)),
      ]);
    } else if (page <= firstPageValue && firstPageValue > 0 && (page + 1) < pages) {
      setList((prevList) => [...prevList.map((_, index) => (firstPageValue + index)),
      ]);
    }
  }, [page, pages, setList, lastPageValue, firstPageValue]);

  return (
    <nav aria-label="Page navigation" className={`pagging ${className || ''}`}>
      <ul className="pagination">
        <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
          <button
            type="button"
            className="page-link"
            aria-label="Previous"
            onClick={(event) => {
              event.preventDefault();
              if (page - 1 >= 0) {
                onChangeCallback(page - 1);
              }
            }}
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        {pagesList()}
        <li className={`page-item ${(page + 1) === pages ? 'disabled' : ''}`}>
          <button
            type="button"
            className="page-link"
            aria-label="Next"
            onClick={(event) => {
              event.preventDefault();
              if (page + 1 <= pages) {
                onChangeCallback(page + 1);
              }
            }}
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagging;
