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

  return (
    <Section>
      <div className="flex flex-col space-y-5 pt-5 mt-3 md:pt-8 md:mt-5 lg:pt-0 lg:mt-0 lg:space-y-0 lg:flex-row lg:space-x-8 lg:items-center">
        <div className="flex flex-col items-center space-y-8 md:space-y-4 lg:items-start lg:w-1/2">
          <H3
            content="Celebrate, Connect and Create Memories"
            className="text-center lg:text-left lg:w-3/4"
          />

          <p className="font-BricolageGrotesqueMedium text-center lg:text-left lg:w-[89%] text-OWANBE_ASH text-lg">
            Join Ostivities and make every celebration unforgettable! Connect, discover, 
            and create lasting memories with ease. Dive into a world of vibrant events today!
          </p>
          <Link
              href="/Dashboard"
              className=" bg-OWANBE_SECONDARY hover:!bg-OWANBE_PRY transition-all duration-300 rounded-full hover:!text-white text-white px-8 py-2"
            >
              <span className=" pr-1">Explore Events</span> <ArrowRightOutlined />
            </Link>
        </div>
        <br /><br /><br />
        <div className="w-full md:w-full lg:w-1/2 flex justify-center">
          <Image src={FeatureBg} alt="hero" className="w-full max-w-lg"/>
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