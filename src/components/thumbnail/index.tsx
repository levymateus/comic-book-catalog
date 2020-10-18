import React from 'react';

import './index.css';

interface Creator {
  name: string;
  resourceURI: string;
  role: string;
}

interface Props {
  title: string;
  url: string;
  alt: string;
  variant: 'portrait_xlarge' | 'portrait_medium';
  extension: string;
  creators: Creator[];
}

const Thumbnail: React.FC<Props> = ({
  title, url, alt, variant, extension, creators,
}) => (
  <div className="thumbnail">
    <div>{title}</div>
    <img
      src={`${url}/${variant}.${extension}`}
      alt={alt}
      className="img-thumbnail"
    />
    <div>
      <ul>
        {creators.map((creator) => <li key={creator.name}>{creator.name}</li>)}
      </ul>
    </div>
  </div>
);

export default Thumbnail;
