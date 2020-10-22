import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router';
import { getComic } from '../../api';

import './index.css';

interface Params { id: string; }

const OnSale = (comic: any): React.ReactNode | null => {
  const date = comic.dates.find((d: any) => d.type === 'onsaleDate');
  if (date) {
    return (
      <div className="col">
        <h4 className="text-capitalize">
          On Sale:
        </h4>
        <h5>{format(new Date(date.date), 'PPP')}</h5>
      </div>
    );
  }
  return null;
};

const ComicPrice = (comic: any): React.ReactNode | null => {
  const price = comic.prices.find((p: any) => p.type === 'printPrice');
  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  if (price) {
    return (
      <div className="col">
        <h4 className="text-capitalize">
          Print Price:
        </h4>
        <h5>{currency.format(price.price as number)}</h5>
      </div>
    );
  }
  return null;
};

const Characters = (comic: any): React.ReactNode | null => {
  if (comic.characters.returned) {
    return (
      <div className="col">
        <h4 className="text-capitalize">Characters:</h4>
        <h5 className="text-capitalize">
          {comic.characters.items.map((char) => char.name).join(', ')}
        </h5>
      </div>
    );
  }
  return null;
};

const Comic: React.FC = () => {
  const [comic, setComic] = useState<any>();
  const { id } = useParams<Params>();

  useEffect(() => {
    getComic(id).then((data) => {
      if (data && data.code === 200) {
        setComic(data.data.results[0]);
      }
    });
  }, [id]);

  return (
    <>
      {comic ? (
        <div className="container comic py-5">
          <div className="row">
            {comic.images.length > 0 ? (
              <div className="col">
                <img
                  src={`${comic.images[0].path}.${comic.images[0].extension}`}
                  alt={comic.title}
                />
              </div>
            ) : null}
            <div className="col">

              <div className="row py-4">
                <div className="col">
                  <h1>{comic.title}</h1>
                </div>
              </div>

              <div className="row py-4">
                {Characters(comic)}
              </div>

              <div className="row row-cols-2 py-4">

                {comic.creators.items.slice(0, 4).map((creator) => (
                  <div key={creator.name} className="col py-4">
                    <h4 className="text-capitalize">{creator.role}:</h4>
                    <h5>{creator.name}</h5>
                  </div>

                ))}
              </div>

              <div className="row py-4">
                <div className="col">
                  {comic.description}
                </div>
              </div>

              <div className="row py-4">
                {OnSale(comic)}
                {ComicPrice(comic)}
              </div>

            </div>
          </div>

        </div>
      ) : (
        <div className=" d-flex justify-content-center wrap align-items-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Comic;
