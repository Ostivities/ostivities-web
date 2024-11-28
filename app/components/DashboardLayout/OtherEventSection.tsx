import { ForwardOutlined } from '@ant-design/icons';
import Link from 'next/link';
import React from 'react';

interface PropsI {
  title: string;
  uri?: string;
  children: React.ReactNode;
  titleClass?: string;
  style?: React.CSSProperties;  // Accept style for inline styling
}

const EventSection: React.FC<PropsI> = ({ title, uri, children, titleClass = 'font-bricolage-grotesque font-semibold text-2xl mb-6', style }) => {
  // Convert children to an array to manage items and limit to 6
  const childrenArray = React.Children.toArray(children);
  const limitedChildren = childrenArray.slice(0, 6); // Get the first 6 children

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
      <div className="grid mb-20 min-[900px]:mb-1 lg:grid-cols-6 grid-cols-1 md:grid-cols-2 gap-6">
        {limitedChildren}
      </div>
    </section>
  );
};

export default EventSection;
