import Image from "next/image";
import Link from "next/link";
import { dateFormat, timeFormat } from "@/app/utils/helper";

interface PropsI {
  status: string;
  title: string;
  about: string;
  image: string;
  url: string;
  className?: string;
  titleClass?: string; // Optional because you might not always pass it
  aboutClass?: string; // Optional
  statusClass?: string; // Optional
  startDate: string;
  endDate: string;
  eventType?: string;
}

const InfoCardM: React.FC<PropsI> = ({
  title,
  about,
  status,
  image,
  url,
  startDate,
  endDate,
  className,
  titleClass = "font-bricolage-grotesque",
  aboutClass = "font-bricolage-grotesque",
  statusClass = "font-bricolage-grotesque",
}) => {
  return (
    <Link
      href={url}
      className={`relative min-w-[250px] py-2 pl-3 pr-20 flex justify-between items-stretch shadow-md h-[120px] rounded-[20px] overflow-hidden gap-4 ${className}`}
    >
      {/* Image Container */}
      <div className="w-[120px] h-full relative rounded-[15px] overflow-hidden">
        <Image
          src={image}
          alt=""
          fill
          style={{ objectFit: "cover" }}
          className="" // Ensures the image maintains proportions
        />
     <div className="absolute inset-0 bg-image-card"></div>
     </div>

      {/* Content Container */}
      <div className="w-1/2 flex h-full text-black justify-between py-4 bg-white rounded-[20px]">
        <div
          className={`px-2 py-1 bg-OWANBE_PRY absolute top-0 right-0 rounded-bl-[1.25rem] ${statusClass}`}
        >
          <span
            className=" text-white"
            style={{ 
              fontFamily: "Bricolage Grotesque, sans-serif",
              fontSize: "12px",
            }}
          >
            {status}
          </span>
        </div>
        <div className="flex flex-col justify-center" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
          <h3 className={titleClass}>{title} </h3>
          <div className={`flex items-center gap-2 mt-1 ${aboutClass}`} >
            <Image
              className=""
              src="/icons/Folder2.svg"
              alt=""
              height={18}
              width={18}
            />
            <span className="text-xs" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>{about}</span>
          </div>
          <div className={`flex items-center gap-2 mt-1 ${aboutClass}`}>
            <Image
              className=""
              src="/icons/calendar.svg"
              alt=""
              height={18}
              width={18}
            />
            <span className="text-xs"style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
              {dateFormat(startDate)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default InfoCardM;
