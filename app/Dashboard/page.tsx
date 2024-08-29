'use client';

import DashboardLayout from '@/app/components/DashboardLayout/DashboardLayout';
import React, { useState } from 'react';
import DiscoverEvents from '../components/DashboardLayout/DiscoverEvents';
import PopularEvents from '../components/DashboardLayout/PopularEvents';
import PaidEvents from '../components/DashboardLayout/PaidEvents';
import FreeEvents from '../components/DashboardLayout/FreeEvents';
import { Input, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { Country, State } from 'country-state-city';
import { EVENT_TYPES } from '../utils/data';
import useFetch from '../components/forms/create-events/auth';

function Dashboard(): JSX.Element {
  const route = useRouter();
  const { isLoggedIn } = useFetch();
  const [activeTab, setActiveTab] = useState('free');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const COUNTRY_JSON: any = Country.getAllCountries().map((i: any) => {
    return { value: i?.name, label: i?.name, isoCode: i?.isoCode };
  });

  const STATE_BY_COUNTRYCODE = (stateCode: string): { label: string; value: string }[] => {
    const result: any = State.getStatesOfCountry(stateCode);
    const stateJson: { label: string; value: string }[] = result.map((i: any) => {
      return { label: i?.name, value: i?.name };
    });
    return stateJson;
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Perform search logic here
    // For demonstration purposes, let's assume searchResults are updated based on the search
    // Example: setSearchResults([]) or setSearchResults([{...}])

    if (searchResults.length === 0) {
      route.push('/Dashboard/event-not-found');
    } else {
      // Handle the case where search results are available
      console.log('Search results found:', searchResults);
    }
  };

  const header = (
    <div className="flex-center justify-between w-full">
      <h1 style={{ fontSize: '24px' }}>Discovery</h1>

      {isLoggedIn && (
        <button
          onClick={() => route.push('/Dashboard/create-events')}
          className="bg-OWANBE_PRY rounded-full px-4 py-2 text-xs font-semibold text-white"
        >
          <PlusOutlined /> <span className="pl-1">Create New Event</span>
        </button>
      )}
    </div>
  );

  return (
    <DashboardLayout title={header}>
      <div className="flex flex-col gap-7">
        <DiscoverEvents />
        <div className="border-[1px] border-[#FADEDE] rounded-3xl p-8 shadow-md">
          <h3 className="font-semibold mb-3">Find events happening around you.</h3>
          <div>
            <form onSubmit={handleSearch} className="flex gap-4 [&>label]:flex-1">
              <label htmlFor="name" className="w-full">
                <span className="text-OWANBE_PRY mb-1 block">Event Name</span>
                <Input placeholder="Enter Event Name" className="w-full" />
              </label>
              <label htmlFor="state" className="w-full">
                <span className="text-OWANBE_PRY mb-1 block">Event State</span>
                <Select
                  defaultValue="Select State"
                  className="w-full"
                  options={[...STATE_BY_COUNTRYCODE('NG')]}
                />
              </label>
              <label htmlFor="type" className="w-full">
                <span className="text-OWANBE_PRY mb-1 block">Event Type</span>
                <Select
                  defaultValue="Select event type"
                  className="w-full"
                  options={[...EVENT_TYPES]}
                />
              </label>
              <div className="flex items-end">
                <button type="submit" className="place-items-end w-36 h-fit text-sm text-white bg-OWANBE_PRY py-1.5 px-12 rounded-full">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-8 mb-1">
          {/* <button
            className={`relative font-semibold pb-2 ${
              activeTab === 'popular' ? 'text-red-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('popular')}
          >
            Popular Events
            {activeTab === 'popular' && (
              <div className="absolute left-0 bottom-[-2px] w-full h-[4px] bg-red-600 rounded-full" style={{ borderRadius: '25px' }} />
            )}
          </button> */}
          <button
            className={`relative font-semibold pb-2 ${
              activeTab === 'free' ? 'text-red-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('free')}
          >
            Free Events
            {activeTab === 'free' && (
              <div className="absolute left-0 bottom-[-2px] w-full h-[4px] bg-red-600 rounded-full" style={{ borderRadius: '25px' }} />
            )}
          </button>
          <button
            className={`relative font-semibold pb-2 ${
              activeTab === 'paid' ? 'text-red-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('paid')}
          >
            Paid Events
            {activeTab === 'paid' && (
              <div className="absolute left-0 bottom-[-2px] w-full h-[4px] bg-red-600 rounded-full" style={{ borderRadius: '25px' }} />
            )}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'popular' && <PopularEvents />}
        {activeTab === 'free' && <FreeEvents />}
        {activeTab === 'paid' && <PaidEvents />}
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
