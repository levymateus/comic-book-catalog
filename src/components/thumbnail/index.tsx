import React, { HTMLAttributes, useCallback, useState } from 'react';

import './index.css';

interface Creator {
  name: string;
  resourceURI: string;
  role: string;
}

interface Props extends HTMLAttributes<HTMLImageElement> {
  /**
   * The thumbnail title text.
   */
  title: string;

  /**
   * The thumbnail image url.
   */
  url: string;

  /**
   * The `alt` text of the thumbnail image.
    */
  alt: string;

  /**
   * Size of thumbnail image respectively.
    * 50x75px (portrait_small),
    * 100x150px (portrait_medium),
    * 150x225px (portrait_xlarge),
    * 168x252px (portrait_fantastic),
    * 300x450px (portrait_uncanny),
    * 216x324px (portrait_incredible)
   */
  variant: 'portrait_small' | 'portrait_medium' | 'portrait_xlarge' | 'portrait_fantastic' | 'portrait_uncanny' | 'portrait_incredible';

  /**
   * The image extension.
   */
  extension: string;

  /**
   * An list of comic creators.
   */
  creators: Creator[];
}

const Thumbnail: React.FC<Props> = ({
  title, url, alt, variant, extension, creators, ...rest
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const creatorsText = useCallback(() => {
    if (creators.length > 3) {
      return (
        <div className="tumbnail-comic-creator">
          {`${creators.map((creator) => creator.name).slice(0, 3).join(', ')} and more`}
        </div>
      );
    }
    return (
      <div className="tumbnail-comic-creator">
        {`${creators.map((creator) => creator.name).join(', ')}`}
      </div>
    );
  }, [creators]);

  return (
    <div className="thumbnail">
      <div className="thumbnail-container ">
        <img
            // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
          onLoad={() => setIsLoading(false)}
          src={`${url}/${variant}.${extension}`}
          alt={alt}
          className={`img-thumbnail ${isLoading ? 'invisible' : 'visible'}`}
        />
        {isLoading && (
        <div className="spinner-border position-absolute" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        )}
      </div>
      <div className="thumbnail-title">{title}</div>
      {creatorsText()}
    </div>
  );
};

export default Thumbnail;
