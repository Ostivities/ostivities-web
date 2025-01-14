"use client";
import FeatureBg from "@/public/feature.png";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Section from "./Section";
import Link from "next/link";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/app/DynamicHeading.css";

// Dynamic import of react-slick
const Slider = dynamic(() => import("react-slick"), { ssr: false });

function Hero(): JSX.Element {
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

  const words = ["Events", "Hangouts", "Concerts", "Seminars"];
  const colors = ["#e20000", "#1834D2", "#FF7700", "#E406B4"];
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [wordIndex, setWordIndex] = useState(0);

  const [animation, setAnimation] = useState("slide-in");

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimation("slide-out");
      setTimeout(() => {
        setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setAnimation("slide-in");
      }, 300);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentWord(words[wordIndex]);
    setCurrentColor(colors[wordIndex % colors.length]);
  }, [wordIndex]);

  return (
    <Section>
      {/* Hero Text Section */}
      <motion.div
        className="flex flex-col space-y-5 pt-5 mt-3 md:pt-8 md:mt-5 lg:pt-0 lg:mt-0 lg:space-y-0 lg:flex-row lg:space-x-8 lg:items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col items-center space-y-8 md:space-y-6 lg:items-start lg:w-1/2">
          <h3 className="text-center text-xl lg:text-3xl lg:text-left lg:w-[70%] font-semibold">
          Connecting You to the{" "}
            <span
              className={`animated-word ${animation}`}
              style={{ color: currentColor }}
            >
              {currentWord}
            </span>{" "}
            That Matter Most.
          </h3>
          <motion.div
            className="flex flex-col space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className="font-BricolageGrotesqueMedium text-center lg:text-left lg:w-[87%] text-OWANBE_ASH text-lg">
             <h1> Discover Events and Elevate Your Celebrations with Ostivities!
              Craft unforgettable memories through seamless planning, ticket
              selling, and event management. Start your journey with us today!</h1>
            </p>
          </motion.div>
          <Link
            href="/discover"
            className="bg-OWANBE_SECONDARY hover:!bg-OWANBE_PRY transition-all duration-300 rounded-full hover:!text-white text-white px-8 py-3"
          >
            <span className="pr-1">Explore Events</span>
          </Link>
        </div>
        <br />
        <motion.div
          className="w-full md:w-full lg:w-1/2 justify-center hidden md:flex"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3 }}
        >
          <Image src={FeatureBg} alt="hero" className="w-full max-w-lg" />
        </motion.div>
      </motion.div>
      
      {/* Slider Section */}
      <motion.div
      className="w-screen overflow-hidden pt-12 -mr-16 md:-ml-16 -ml-4" // Ensure full width and no margin
      initial={{ x: "100%" }} // Start from the right side
      animate={{ x: 0 }} // Move into the left side
      transition={{ duration: 1.5, ease: "easeOut" }} // Slide-in animation
    >
      <Slider {...settings}>
        {slides.map((img, index) => (
          <motion.div
            key={index}
            className="slide"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }} // Staggered transition
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
