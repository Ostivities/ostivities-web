"use client";
import React from "react";
import { Heading3, Small } from "../typography/Typography";
import Section from "./Section";
import { motion } from "framer-motion";
import Testimonial from "@/public/testimonial.svg";
import Image from "next/image";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

function Faqs(): JSX.Element {
  const onChange = (key: string | string[]) => {
    
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 7000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  const slides = [
    "/testimonial1.svg",
    "/testimonial2.svg",
    "/testimonial3.svg",
    "/testimonial2.svg",
    "/testimonial1.svg",
    "/testimonial2.svg",
    "/testimonial3.svg",
    "/testimonial1.svg",
  ];

  return (
    <Section>
      <div
        className="flex flex-col space-y-5 mt-5 mb-5 md:w-4/5 lg:w-full xl:w-full md:mx-auto lg:mx-0 xl:mx-0 h-auto md:h-auto "
      >
        {/* Adjust this div to allow full width */}
        <div className="flex flex-col w-full md:w-full lg:w-1/3 xl:w-1/3">
        <motion.div
            className="flex flex-col space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }} // Optional delay for smoother animation
          >
          <Small
            content="TESTIMONIAL"
            className="text-OWANBE_PRY text-lg tracking-wider uppercase"
          />
          
          <Heading3
            content="What people are saying about us"
            className="w-full md:w-full capitalize mb-2"
          />
          </motion.div>
        </div>
        {/* Slider Section */}
      <motion.div
      className="w-screen overflow-hidden pt-12 -mr-16 md:-ml-16 -ml-4"// Ensure full width and no margin
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
      </div>
    </Section>
  );
}

export default Faqs;
