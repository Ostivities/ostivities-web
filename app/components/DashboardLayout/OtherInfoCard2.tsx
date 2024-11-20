import Image from "next/image";
import Link from "next/link";
import { dateFormat, timeFormat } from "@/app/utils/helper";

interface PropsI {
  status: string;
  title: string;
  about: string;
  image: string;
  url: string;
  titleClass?: string; // Optional because you might not always pass it
  aboutClass?: string; // Optional
  statusClass?: string; // Optional
  startDate: string;
  endDate: string;
  eventType?: string;
}

const InfoCard: React.FC<PropsI> = ({
  title,
  about,
  status,
  image,
  url,
  startDate,
  endDate,
  titleClass = "font-bricolage-grotesque",
  aboutClass = "font-bricolage-grotesque",
  statusClass = "font-bricolage-grotesque",
}) => {
  return (
    // <Link
    //   href={url}
    //   className="relative flex w-1/2  h-[200px] rounded-[30px] overflow-hidden"
    // >
    //   <div className="w-2/4">
    //     <Image src={image} fill alt=""   className="object-cover w-full" />
    //   </div>
    //   <div className=" text-white">
    //     <div
    //       className={`bg-OWANBE_PRY rounded-bl-[1.25rem] ${statusClass}`}
    //     >
    //       <span style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
    //         {status}
    //       </span>
    //     </div>
    //     <div className="">
    //       <h3 className={titleClass}>{title}</h3>
    //       <div className={`flex-center gap-2 mt-1 ${aboutClass}`}>
    //         <Image src="/icons/folder.svg" alt="" height={18} width={18} />
    //         <span className="text-xs">{about}</span>
    //       </div>
    //       <div className={`flex-center gap-2 mt-1 ${aboutClass}`}>
    //         <Image src="/icons/folder.svg" alt="" height={18} width={18} />
    //         <span className="text-xs">{startDate} - {endDate}</span>
    //       </div>
    //     </div>
    //   </div>
    // </Link>
<Link
    href={url}
    className="relative min-w-[300px] py-2 px-3 flex justify-between items-stretch shadow-md h-[200px] rounded-[20px] overflow-hidden gap-4"
  >
    {/* Image Container */}
    <div className="w-1/2 h-full relative">
      <Image
        src={image}
        alt=""
        className="object-cover rounded-[20px]" // Ensures the image maintains proportions
        layout="fill" // Makes the image fill the container
      />
    </div>

    {/* Content Container */}
    <div className="w-1/2 flex h-full text-black justify-between p-4 bg-white rounded-[20px]">
      <div className={`bg-OWANBE_PRY absolute top-0 right-0 rounded-bl-[1.25rem] ${statusClass}`}>
        <span className="px-2 py-2" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
          {status}
        </span>
      </div>
      <div  className="flex flex-col justify-center">
        <h3 className={titleClass}>{title}</h3>
        <div className={`flex items-center gap-2 mt-1 ${aboutClass}`}>
          <Image
            className="bg-OWANBE_PRY/20"
            src="/icons/folder.svg"
            alt=""
            height={18}
            width={18}
          />
          <span className="text-xs">{about}</span>
        </div>
        <div className={`flex items-center gap-2 mt-1 ${aboutClass}`}>
          <Image
            className="bg-OWANBE_PRY/20"
            src="/icons/calendar.svg"
            alt=""
            height={18}
            width={18}
          />
          <span className="text-xs">
            {dateFormat(startDate)} - {dateFormat(endDate)}
          </span>
        </div>
      </div>
    </div>
  </Link>  );
};

export default InfoCard;
