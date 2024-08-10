import Image from 'next/image';
import Link from 'next/link';

interface PropsI {
  status: string;
  title: string;
  about: string;
  image: string;
  url: string;
  titleClass?: string;  // Optional because you might not always pass it
  aboutClass?: string;  // Optional
  statusClass?: string; // Optional
}

const InfoCard: React.FC<PropsI> = ({ title, about, status, image, url, titleClass = 'font-bricolage-grotesque', aboutClass = 'font-bricolage-grotesque', statusClass = 'font-bricolage-grotesque' }) => {
  return (
    <Link
      href={url}
      className="block relative overflow-hidden h-[240px] rounded-[50px]"
    >
      <Image
        src={image}
        alt=""
        width={224}
        height={240}
        className="rounded-[50px] h-full w-full"
      />
      <div className="absolute inset-0 bg-image-card text-white">
        <div className={`absolute top-0 right-0 py-3 px-4 bg-OWANBE_PRY rounded-bl-[1.25rem] ${statusClass}`}>
          {status}
        </div>
        <div className="absolute bottom-0 left-0 px-5 py-5">
          <h3 className={titleClass}>{title}</h3>
          <div className={`flex-center gap-2 mt-1 ${aboutClass}`}>
            <Image src="/icons/folder.svg" alt="" height={18} width={18} />
            <span className="text-xs">{about}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default InfoCard;
