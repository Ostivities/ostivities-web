"use client";
import FeatureBg from "@/public/feature.svg";
import { ArrowRightOutlined } from '@ant-design/icons';
import Image from 'next/image';
import React from 'react';
import Section from './Section';
import H3 from '@/app/ui/atoms/H3';
import Link from 'next/link';
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import '@/app/DynamicHeading.css';

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

  const words = ["events", "hangouts", "concerts", "seminars"];
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
            Connecting You to the <span className={`animated-word ${animation}`} style={{ color: currentColor }}>{currentWord}</span> That Matter Most.
          </h3>
          <motion.div
            className="flex flex-col space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }} // Optional delay for smoother animation
          >

            <p className="font-BricolageGrotesqueMedium text-center lg:text-left lg:w-[87%] text-OWANBE_ASH text-lg">
              Discover Events and Elevate Your Celebrations with Ostivities! Craft unforgettable
              memories through seamless planning, ticket selling and event management. Start your journey with us today!
            </p>
          </motion.div>


          <Link
            href="/discover"
            className="bg-OWANBE_SECONDARY hover:!bg-OWANBE_PRY transition-all duration-300 rounded-full hover:!text-white text-white px-8 py-3"
          >
            <span className="pr-1">Explore Events</span>
          </Link>
        </div>
        <br /><br /><br />

        {/* Adding framer-motion to the image for a unique animation */}
        <motion.div
          className="w-full md:w-full lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 2, y: 0 }}
          transition={{ duration: 3 }}
        >
          <Image src={FeatureBg} alt="hero" className="w-full max-w-lg" />
        </motion.div>
      </motion.div>

      <motion.div
        className="hidden lg:block lg:w-full pt-8 lg:pt-0"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <br /><br /><br />
        {/* Wrap the Slider with motion.div for animation */}
        <motion.div
          className="flex flex-col space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }} // Optional delay for smoother animation
        >
          <Slider {...settings}>
            {slides.map((img, index) => (
              <motion.div
                key={index}
                className="slide"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <img src={img} alt={`Slide ${index + 1}`} className="rounded-lg" />
              </motion.div>
            ))}
          </Slider>
        </motion.div>
      </motion.div>
    </Section>
  );
}

export default Hero;
