"use client";
import dynamic from "next/dynamic";
import Section from "./Section";
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
    slidesToShow: 7,
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

  return (
    <Section>
      {/* Slider Section */}
      <motion.div
      className="w-screen overflow-hidden pt-8 -mx-16" // Ensure full width and no margin
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
