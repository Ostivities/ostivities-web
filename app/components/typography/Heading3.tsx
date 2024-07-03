import React from 'react';

interface Heading3Props {
  className: string;
  content: string;
}

export const Heading3: React.FC<Heading3Props> = ({ className, content }) => (
  <h3 className={className}>
    {content}
  </h3>
);
