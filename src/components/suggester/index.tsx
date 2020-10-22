/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import React, {
  HTMLAttributes, Ref, useCallback, useEffect, useReducer, useRef, useState,
} from 'react';

import './index.css';

interface Props extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> {
  /**
   * Show the "loading..." item for `true` or not for `false`.
   */
  loading?: boolean;

  /**
   * The ref to input field.
   */
  inputRef?: Ref<HTMLInputElement>;

  /**
   * An async callback fired when the input field is changed.
   * Used to make async calls.
   */
  onChange: (value: string) => Promise<unknown[]>;

  /**
   * An optional callback fired when a `onChange` promise response is rejected.
   */
  onError?: (error: unknown) => void;

  /**
   * This callback prop render an dropdown item.
   * The returned values is used to find an value when tip.
   */
  renderItem: (item: unknown) => string;

  /**
   * An optional callback prop fired when select an dropdown option is selected.
   */
  onSelectItem?: (item: unknown) => void;

  /**
   * An optional `children` as ReactNode or render prop function passing the filtered suggestions.
   */
  children?: ((suggestions: unknown[]) => React.ReactNode) | React.ReactNode;
}

type ListAction = {
  type: 'PUT',
  values?: unknown[],
}
type ListReducer = (list: unknown[], action: ListAction) => unknown[]
const reducer = (list: unknown[], action: ListAction): unknown[] => {
  switch (action.type) {
    case 'PUT':
      if (action.values) {
        return [...action.values];
      }
      return list;
    default: return list;
  }
};

const initializer = (): unknown[] => [];

/**
 * A dropdown list of suggestions by search string component.
 */
const Suggester: React.FC<Props> = ({
  loading,
  renderItem,
  onChange,
  onSelectItem,
  children,
  onError,
  ...rest
}: Props) => {
  const inputRef = useRef<HTMLInputElement>();
  const dropdownRef = useRef<HTMLDivElement>();
  const [search, setSearch] = useState('');
  const [list, setList] = useReducer<ListReducer, unknown>(reducer, [], initializer);
  const [suggestions, setSuggestions] = useState<unknown[]>([]);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  const putValues = (values: unknown[]) => {
    setList({ type: 'PUT', values });
  };

  const render = useCallback(renderItem, []);
  const select = useCallback(onSelectItem, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setSearch(value);
    onChange(value).then(putValues).catch(onError);
    if (value.length > 0) {
      setSuggestions([
        ...list.filter((item) => render(item)
          .toLocaleLowerCase().startsWith(value.toLocaleLowerCase())),
      ]);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      setDropdownIsOpen(false);
    }
  };

  useEffect(() => {
    if (list.length) {
      setDropdownIsOpen(true);
      setSuggestions([
        ...list.filter((item) => render(item)
          .toLocaleLowerCase()
          .startsWith(search.toLocaleLowerCase())),
      ]);
    } else {
      setDropdownIsOpen(false);
    }
  }, [list, render, search]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current
        && !inputRef.current.contains(event.target)
        && dropdownRef.current
        && !dropdownRef.current.contains(event.target)) {
        setDropdownIsOpen(false);
      } else {
        setDropdownIsOpen(true);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputRef, dropdownRef]);

  return (
    <>
      <input
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.setSelectionRange(0, search.length);
          }
          setDropdownIsOpen(true);
          setSuggestions([
            ...list.filter((item) => render(item)
              .toLocaleLowerCase()
              .startsWith(search.toLocaleLowerCase())),
          ]);
        }}
        value={search}
        ref={inputRef}
      />
      {!children ? (
        <div ref={dropdownRef} className={`suggester-dropdown ${dropdownIsOpen ? 'visible' : 'invisible'}`}>
          <ul className="list-group">
            {loading ? <li className="list-group-item">loading...</li> : null}
            {!loading && suggestions.map((item: any) => (
              <li key={item.id} className="list-group-item">
                <button
                  className="btn btn-link"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    if (select) {
                      select(item);
                    }
                    setDropdownIsOpen(false);
                    setSearch(render(item));
                  }}
                >
                  {render(item)}
                </button>
              </li>
            ))}
            {!loading && !suggestions.length && search.length ? <li className="list-group-item">Nothing found</li> : null}
          </ul>
        </div>
      ) : null}
      {typeof children === 'function'
        && dropdownIsOpen
        ? children(suggestions) : null}
    </>
  );
};

export default Suggester;
