import { ForwardOutlined } from '@ant-design/icons';
import Link from 'next/link';
import React from 'react';

interface PropsI {
  title: string;
  uri?: string;
  children: React.ReactNode;
  titleClass?: string;  // Add the optional titleClass prop
  style?: React.CSSProperties; 
}

const EventSection: React.FC<PropsI> = ({ title, uri, children, titleClass = 'font-bricolage-grotesque font-semibold text-2xl mb-6', style }) => {
  const childrenArray = React.Children.toArray(children);
  const limitedChildren = childrenArray.slice(0, 10); // Get the first 6 children 

  return (
    <section>
      <div className="flex-center justify-between">
      <h2 className={`${titleClass} mb-8`} style={style}>{title}</h2>
        {uri && (
          <Link href={uri} className="font-bricolage-grotesque font-semibold text-OWANBE_PRY">
            See More {<ForwardOutlined />}
          </Link>
        )}
      </div>
      <div className="grid grid-cols-6 gap-6">{limitedChildren}</div>
    </section>
  );
};

export default EventSection;
