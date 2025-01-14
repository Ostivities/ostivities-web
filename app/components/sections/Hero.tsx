"use client";
import FeatureBg from "@/public/feature.png";
import { ArrowRightOutlined } from '@ant-design/icons';
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import Section from './Section';
import H3 from '@/app/ui/atoms/H3';
import Link from 'next/link';
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoChevronDown } from 'react-icons/io5'; // Importing the icon
import { motion } from "framer-motion";
import '@/app/DynamicHeading.css';

// Dynamic import of react-slick
const Slider = dynamic(() => import("react-slick"), { ssr: false });

function Hero(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  
  // Define the type for the ref as HTMLDivElement | null
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Toggle the dropdown on button click
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 3200,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
    ],
  };

  const slides = [
    "/events.png",
    "/Conferences.png",
    "/Weddings.png",
    "/concerts.png",
    "/Hangouts.png",
    "/Seminar.png",
    "/events.png",
    "/Birthdays.png",
    "/Weddings.png",
    "/concerts.png",
    "/Hangouts.png",
  ];

  // Countdown logic
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("January 20, 2025 00:00:00").getTime();

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

  const words = ["Events", "Hangouts", "Concerts", "Seminars"];
  const colors = ["#e20000", "#1834D2", "#FF7700", "#E406B4"];
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [wordIndex, setWordIndex] = useState(0);

  const [animation, setAnimation] = useState("slide-in");

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimation("slide-out"); // Start exit animation
      setTimeout(() => {
        setWordIndex((prevIndex) => (prevIndex + 1) % words.length); // Update word
        setAnimation("slide-in"); // Start entry animation
      }, 300); // Match duration of slide-out animation
    }, 2000); // Change word every 2 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentWord(words[wordIndex]);
    setCurrentColor(colors[wordIndex % colors.length]);
  }, [wordIndex]);


  return (
    <Section>
      <motion.div
        className="flex flex-col space-y-5 pt-5 mt-3 md:pt-8 md:mt-5 lg:pt-0 lg:mt-0 lg:space-y-0 lg:flex-row lg:space-x-8 lg:items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col items-center space-y-8 md:space-y-6 lg:items-start lg:w-1/2">
          <h3 className="text-center text-xl lg:text-3xl lg:text-left lg:w-[70%] font-semibold">
          <h1>Connecting You to the{" "}
            <span
              className={`animated-word ${animation}`}
              style={{ color: currentColor }}
            >
              {currentWord}
            </span>{" "}
            That Matter Most.</h1>
          </h3>
          <motion.div
            className="flex flex-col space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }} // Optional delay for smoother animation
          >

            <p className="font-BricolageGrotesqueMedium text-center lg:text-left lg:w-[87%] text-OWANBE_ASH text-lg">
             <h1> Discover Events and Elevate Your Celebrations with Ostivities!
              Craft unforgettable memories through seamless planning, ticket
              selling, and event management. Start your journey with us today!</h1>
            </p>
          </motion.div>

          {/* Flex container for button and countdown */}
          <div className="flex flex-col items-center lg:flex-row lg:space-x-6 lg:items-center">
            <div
              className="relative"
              ref={dropdownRef} // Reference for dropdown
            >
              <button
                onClick={toggleDropdown}
                className="bg-OWANBE_SECONDARY hover:!bg-OWANBE_PRY transition-all duration-300 rounded-full hover:!text-white text-white px-6 py-3 flex items-center"
              >
                <span className="pr-1">Launching In</span>
                <IoChevronDown className="w-5 h-5 ml-2" />
              </button>

              {/* Dropdown */}
              {isOpen && (
                <div
                  className="absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                  style={{
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                >
                  <div className="py-1">
                    <Link
                      href="https://ostivities.substack.com/subscribe"
                      target="_blank"
                      className="block px-5 py-2 text-sm text-gray-700 "
                    >
                      Subscribe to our Newsletter
                    </Link>
                  </div>
                </div>
              )}
            </div>

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

      
        {/* Adding framer-motion to the image for a unique animation */}
        <motion.div
          className="w-full md:w-full lg:w-1/2 justify-center hidden md:flex"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 2, y: 0 }}
          transition={{ duration: 3 }}
        >
          <Image src={FeatureBg} alt="hero" className="w-full max-w-lg" />
        </motion.div>
      </motion.div>

      <motion.div
      className="w-screen overflow-hidden pt-12 -mr-16 md:-ml-16 -ml-4" // Ensure full width and no margin
      initial={{ x: "100%" }} // Start from the right side
      animate={{ x: 0 }} // Move into the left side
      transition={{ duration: 1.5, ease: "easeOut" }} // Slide-in animation
    >
        {/* <br /><br /><br />
     
        <motion.div
          className="flex flex-col space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }} // Optional delay for smoother animation
        > */}
          <Slider {...settings}>
            {slides.map((img, index) => (
              <motion.div
                key={index}
                className="slide"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <img src={img} alt={`Slide ${index + 1}`} className="w-full h-auto object-cover" />
                </motion.div>
            ))}
          </Slider>
        </motion.div>
    
    </Section>
  );
}

export default Hero;