// "use client";
// import FeatureBg from "@/public/feature.svg";
// import { ArrowRightOutlined } from '@ant-design/icons';
// import Image from 'next/image';
// import React from 'react';
// import Section from './Section';
// import H3 from '@/app/ui/atoms/H3';
// import Link from 'next/link';
// import dynamic from "next/dynamic";
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";


// // Dynamic import of react-slick
// const Slider = dynamic(() => import("react-slick"), { ssr: false });

// function Hero(): JSX.Element {
//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 3200,
//     slidesToShow: 6,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 0,
//     cssEase: 'linear',
//   };

//   const slides = [
//     "/events.svg",
//     "/Conferences.svg",
//     "/Weddings.svg",
//     "/concerts.svg",
//     "/Hangouts.svg",
//     "/Seminar.svg",
//     "/events.svg",
//     "/Birthdays.svg",
//     "/Weddings.svg",
//     "/concerts.svg",
//     "/Hangouts.svg",
//   ];

//   return (
//     <Section>
//       <div className="flex flex-col space-y-5 pt-5 mt-3 md:pt-8 md:mt-5 lg:pt-0 lg:mt-0 lg:space-y-0 lg:flex-row lg:space-x-8 lg:items-center">
//         <div className="flex flex-col items-center space-y-8 md:space-y-4 lg:items-start lg:w-1/2">
//           <H3
//             content="Celebrate, Connect and Create Memories."
//             className="text-center text-xl lg:text-3xl lg:text-left lg:w-3/4"
//           />

//           <p className="font-BricolageGrotesqueMedium text-center lg:text-left lg:w-[89%] text-OWANBE_ASH text-lg">
//             Join Ostivities and make every celebration unforgettable! Connect, discover,
//             and create lasting memories with ease. Dive into a world of vibrant event creation and management!
//           </p>

//           <Link
//               href="/discover"
//               className=" bg-OWANBE_SECONDARY hover:!bg-OWANBE_PRY transition-all duration-300 rounded-full hover:!text-white text-white px-8 py-2"
//             >
//               <span className=" pr-1">Explore Events</span> <ArrowRightOutlined />
//             </Link> 
//         </div>
//         <br /><br /><br />
//         <div className="w-full md:w-full lg:w-1/2 flex justify-center">
//           <Image src={FeatureBg} alt="hero" className="w-full max-w-lg"/>
//         </div>
//       </div>
//       <div className="hidden lg:block lg:w-full pt-8 lg:pt-0">
//       <br /><br /><br />
//         <Slider {...settings}>
//           {slides.map((img, index) => (
//             <div key={index} className="slide">
//               <img src={img} alt={`Slide ${index + 1}`} className="rounded-lg" />
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </Section>
//   );
// }

// export default Hero;

"use client";
import FeatureBg from "@/public/feature.svg";
import { ArrowRightOutlined } from '@ant-design/icons';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Section from './Section';
import H3 from '@/app/ui/atoms/H3';
import Link from 'next/link';
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Dynamic import of react-slick
const Slider = dynamic(() => import("react-slick"), { ssr: false });

function Hero(): JSX.Element {
  const settings = {
    dots: false,
    infinite: true,
    speed: 3200,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
  };

  const slides = [
    "/events.svg",
    "/Conferences.svg",
    "/Weddings.svg",
    "/concerts.svg",
    "/Hangouts.svg",
    "/Seminar.svg",
    "/events.svg",
    "/Birthdays.svg",
    "/Weddings.svg",
    "/concerts.svg",
    "/Hangouts.svg",
  ];

  // Countdown logic
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("November 30, 2024 00:00:00").getTime();

    const countdownInterval = setInterval(() => {
      const currentDate = new Date().getTime();
      const difference = targetDate - currentDate;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      if (difference > 0) {
        setTimeRemaining({ days, hours, minutes, seconds });
      } else {
        clearInterval(countdownInterval);
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  return (
    <Section>
      <div className="flex flex-col space-y-5 pt-5 mt-3 md:pt-8 md:mt-5 lg:pt-0 lg:mt-0 lg:space-y-0 lg:flex-row lg:space-x-8 lg:items-center">
        <div className="flex flex-col items-center space-y-8 md:space-y-4 lg:items-start lg:w-1/2">
          <H3
            content="Celebrate, Connect and Create Memories."
            className="text-center text-xl lg:text-3xl lg:text-left lg:w-3/4"
          />

          <p className="font-BricolageGrotesqueMedium text-center lg:text-left lg:w-[89%] text-OWANBE_ASH text-lg">
            Join Ostivities and make every celebration unforgettable! Connect, discover,
            and create lasting memories with ease. Dive into a world of vibrant event creation and management!
          </p>

          {/* Flex container for button and countdown */}
          <div className="flex flex-col items-center lg:flex-row lg:space-x-6 lg:items-center">
            <Link
              href=""
              className=" bg-OWANBE_SECONDARY hover:!bg-OWANBE_PRY transition-all duration-300 rounded-full hover:!text-white text-white px-6 py-3"
            >
              <span className=" pr-1">Launching In</span>
            </Link>

            {/* Countdown Timer */}
            <div className="p-4 lg:mt-0 mt-6">
              <div className="flex justify-center gap-5">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-14 h-14 border-2 border-[#e20000] rounded-full">
                    <div className="text-2xl font-semibold">
                      {timeRemaining.days}
                    </div>
                  </div>
                  <div className="text-xs capitalize mt-2">Days</div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-14 h-14 border-2 border-[#e20000] rounded-full">
                    <div className="text-2xl font-semibold">
                      {timeRemaining.hours}
                    </div>
                  </div>
                  <div className="text-xs capitalize mt-2">Hours</div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-14 h-14 border-2 border-[#e20000] rounded-full">
                    <div className="text-2xl font-semibold">
                      {timeRemaining.minutes}
                    </div>
                  </div>
                  <div className="text-xs capitalize mt-2">Minutes</div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-14 h-14 border-2 border-[#e20000] rounded-full">
                    <div className="text-2xl font-semibold">
                      {timeRemaining.seconds}
                    </div>
                  </div>
                  <div className="text-xs capitalize mt-2">Seconds</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br /><br /><br />
        <div className="w-full md:w-full lg:w-1/2 flex justify-center">
          <Image src={FeatureBg} alt="hero" className="w-full max-w-lg" />
        </div>
      </div>

      <div className="hidden lg:block lg:w-full pt-8 lg:pt-0">
        <br /><br /><br />
        <Slider {...settings}>
          {slides.map((img, index) => (
            <div key={index} className="slide">
              <img src={img} alt={`Slide ${index + 1}`} className="rounded-lg" />
            </div>
          ))}
        </Slider>
      </div>
    </Section>
  );
}

export default Hero;
