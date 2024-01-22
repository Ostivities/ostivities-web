import React from 'react'
import Image from 'next/image';
import placeholderIMG from '../../../../public/placeholder.png'
import FolderIcon from './icon';

const placeholderImages = [
  {
    Title: "Tobi weds Shade",
    image: placeholderIMG,
    event: "Wedding",
    label: "Get Tickets",
  },
  {
    Title: "Tobi weds Shade",
    image: placeholderIMG,
    event: "Wedding",
    label: "Get Tickets",
  },

  {
    Title: "Tobi weds Shade",
    image: placeholderIMG,
    event: "Wedding",
    label: "Get Tickets",
  },

  {
    Title: "Tobi weds Shade",
    image: placeholderIMG,
    event: "Wedding",
    label: "Get Tickets",
  },
  {
    Title: "Tobi weds Shade",
    image: placeholderIMG,
    event: "Wedding",
    label: "Get Tickets",
  },
];

function Discovery() {
  return (
    <div className="flex gap-[1.25rem] text-white">
      {placeholderImages.map((tiles, i) => (
        <div
          key={i}
          className="h-[244px] w-[236px] rounded-[50px] flex flex-shrink-0 justify-end relative"
        >
          <div className="bg-OWANBE_PRY rounded-tl-[0px] rounded-tr-[50px] rounded-br-[0px] rounded-bl-[20px] flex  justify-center items-center  w-[7.25rem] h-[2.86875rem] font-medium absolute">
            {tiles.label}
          </div>
          <div className="flex flex-col absolute bottom-2 left-16">
            <span className=" text-lg">{tiles.Title}</span>
            <div className='flex  items-center gap-1'><FolderIcon/>Wedding</div>
          </div>
          <Image src={tiles.image} alt="placeholder" width={500} height={500} />
        </div>
      ))}
    </div>
  );
}

export default Discovery

