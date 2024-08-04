'use client';

import FeatureBg from "@/public/feature.svg";
import { ArrowRightOutlined } from '@ant-design/icons';
import Image from 'next/image';
import React from 'react';
import Section from './Section';
import H3 from '@/app/ui/atoms/H3';
import Link from 'next/link';
import { Input, Select } from 'antd';
import { State } from "country-state-city";
import { EVENT_TYPES } from '@/app/utils/data';
import useFetch from '@/app/components/forms/create-events/auth';

function Hero(): JSX.Element {
  useFetch()
const STATE_BY_COUNTRYCODE = (stateCode: string): { label: string; value: string }[] => {
  const result: any = State.getStatesOfCountry(stateCode);
  const stateJson: { label: string; value: string }[] = result.map((i: any) => {
    return { label: i?.name, value: i?.name };
  });
  return stateJson;
};

  return (
    <Section>
      <div className="flex flex-col space-y-3 pt-5 mt-3 md:pt-5 md:mt-3 lg:pt-0 lg:mt-0">
        <div className="flex flex-col space-y-8 md:flex md:flex-col md:space-y-8 lg:flex lg:flex-row lg:space-x-8 lg:items-center">
          <div className="flex flex-col w-full items-center space-y-5 mx-0 md:flex md:flex-col md:w-4/5 md:mx-auto lg:items-start lg:mx-0 lg:flex lg:flex-col lg:space-y-5 lg:w-1/2">
            <H3
              content="Celebrate, Connect and Create Memories"
              className="w-full text-center lg:text-left md:w-full md:text-center lg:w-4/4"
            />
            <p className="w-full md:w-full font-BricolageGrotesqueMedium text-center lg:text-left lg:w-[89%] text-OWANBE_ASH text-lg">
            Join Ostivities and make every celebration unforgettable! Connect, discover, 
            and create lasting memories with ease. Dive into a world of vibrant events today!
            </p>
            <Link
              href="/Dashboard"
              className=" bg-OWANBE_SECONDARY hover:!bg-OWANBE_PRY transition-all duration-300 rounded-full hover:!text-white text-white px-8 py-2">
              <span className=" pr-1">Explore Events</span> <ArrowRightOutlined />
            </Link>
          </div>
          <div className="w-full md:w-full lg:w-1/2">
            <Image src={FeatureBg} alt="hero" className="ms-1" />
          </div>
          </div>
<div className="border-[1px] rounded-3xl p-8 bg-white shadow-sm ">
  <h3 className="font-BricolageGrotesqueSemiBold mb-3">
    Quickly find events happening around you.
  </h3>
  <div>
    <form action="" className="flex flex-wrap gap-4 [&>label]:flex-1">
      <label htmlFor="name" className="w-full sm:w-1/3">
        <span className="text-OWANBE_PRY mb-1 block font-BricolageGrotesqueRegular">Event Name</span>
        <Input placeholder="Enter Event Name" className="w-full" />
      </label>
      <label htmlFor="state" className="w-full sm:w-1/3">
        <span className="text-OWANBE_PRY mb-1 block font-BricolageGrotesqueRegular">Event State</span>
        <Select
          defaultValue="Select State"
          className="w-full"
          options={[
            ...STATE_BY_COUNTRYCODE("NG")
          ]}
        />
      </label>
      <label htmlFor="type" className="w-full sm:w-1/3">
        <span className="text-OWANBE_PRY mb-1 block font-BricolageGrotesqueRegular">Event Type</span>
        <Select
          defaultValue="Select event type"
          className="w-full"
          options={[
            ...EVENT_TYPES
          ]}
        />
      </label>
      <div className="flex items-end w-full sm:w-auto">
        <button className="w-full sm:w-36 bg-OWANBE_SECONDARY hover:bg-OWANBE_PRY transition-all duration-300 rounded-full text-white py-1.5 px-12">
          Search
        </button>
      </div>
    </form>
  </div>
        </div>
      </div>
    </Section>
  );
}

export default Hero