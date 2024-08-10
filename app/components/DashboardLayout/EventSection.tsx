import { ForwardOutlined } from '@ant-design/icons';
import Link from 'next/link';

interface PropsI {
  title: string;
  uri?: string;
  children: React.ReactNode;
  titleClass?: string;  // Add the optional titleClass prop
}

const EventSection: React.FC<PropsI> = ({ title, uri, children, titleClass = 'font-bricolage-grotesque font-semibold text-2xl mb-6' }) => {
  return (
    <section>
      <div className="flex-center justify-between">
        <h2 className={titleClass}>{title}</h2>
        {uri && (
          <Link href={uri} className="font-bricolage-grotesque font-semibold text-OWANBE_PRY">
            See More {<ForwardOutlined />}
          </Link>
        )}
      </div>
      <div className="grid grid-cols-5 gap-4">{children}</div>
    </section>
  );
};

export default EventSection;
