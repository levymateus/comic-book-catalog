import React, { HTMLAttributes } from 'react';

const aphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

interface Props extends Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> {
  // eslint-disable-next-line no-unused-vars
  onClick?: (letter: string) => void;
}

const Alphabet: React.FC<Props> = ({ onClick, ...rest }) => (
  <div className="d-flex justify-content-left p-3 visible">
    {aphabet.map((letter) => (
      <button
      // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        onClick={(e): void => {
          e.preventDefault();
          if (onClick) { onClick(letter); }
        }}
        key={letter}
        type="button"
        className="btn btn-link"
      >
        {letter}
      </button>
    ))}
  </div>
);

export default Alphabet;
