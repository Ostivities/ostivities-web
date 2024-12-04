import Image from "next/image";
import Link from "next/link";
import { dateFormat, timeFormat } from "@/app/utils/helper";

interface PropsI {
  status: string;
  title: string;
  about: string;
  image: string;
  url: string;
  startDate: string;
  endDate: string;
  titleClass?: string; // Optional because you might not always pass it
  aboutClass?: string; // Optional
  statusClass?: string; // Optional
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
    <Link
      href={url}
      className="relative w-full min-w-[240px] h-[350px] rounded-[30px] overflow-x-auto shadow-md"
    >
      <Image src={image} alt="" fill className="object-cover" />

      <div className=" text-white">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-100"></div>
        <div
          className={`absolute top-0 right-0 py-2 px-3 bg-OWANBE_PRY rounded-bl-[1.25rem] ${statusClass}`}
        >
          <span style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
            {status}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 px-5 py-5 flex flex-col items-center justify-center w-full">
          <h3 className={`${titleClass} text-[18px] font-black text-center`} style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
            {title}
          </h3>

          <div className={`flex flex-col gap-2 mt-2 ${aboutClass} items-center justify-center w-full`}>
            {/* Folder Icon and Text */}
            <div className="flex items-center gap-1 justify-center">
              <Image src="/icons/folder.svg" alt="" height={18} width={18} />
              <span
                className="text-xs"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
              >
                {about}
              </span>
            </div>

            {/* Calendar Icon and Text */}
            <div className="flex items-center gap-1 justify-center">
              <Image
                className=""
                src="/icons/Calendar2.svg"
                alt=""
                height={18}
                width={18}
              />
              <span
                className="text-xs"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
              >
                {dateFormat(startDate)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default InfoCard;
