"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import React, { useState } from "react";
import DiscoverEvents from "../components/DashboardLayout/DiscoverEvents";
import PopularEvents from "../components/DashboardLayout/PopularEvents";
import AllEvents from "../components/DashboardLayout/AllEvents";
import { Input, Tabs, Skeleton } from "antd";
import { useGetDiscoveryEvents } from "@/app/hooks/event/event.hook";
import { PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Country, State } from "country-state-city";
import { EVENT_TYPES } from "../utils/data";
import useFetch from "../components/forms/create-events/auth";
import Select, { StylesConfig } from "react-select";


function Discover(): JSX.Element {
  const router = useRouter();
  const { isLoggedIn } = useFetch();
  const [activeTab, setActiveTab] = useState("all");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");

  // Get all events for discovery

  const COUNTRY_JSON: any = Country.getAllCountries().map((i: any) => {
    return { value: i?.name, label: i?.name, isoCode: i?.isoCode };
  });

  const STATE_BY_COUNTRYCODE = (
    stateCode: string
  ): { label: string; value: string }[] => {
    const result: any = State.getStatesOfCountry(stateCode);
    const stateJson: { label: string; value: string }[] = result.map(
      (i: any) => {
        return { label: i?.name, value: i?.name };
      }
    );
    return stateJson;
  };
  const { Search } = Input;
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const { getDiscoveryEvents } = useGetDiscoveryEvents(1, 10, searchText);
    // console.log(getDiscoveryEvents?.data);

    // Perform search logic here
    // For demonstration purposes, let's assume searchResults are updated based on the search
    // Example: setSearchResults([]) or setSearchResults([{...}])

    if (searchResults.length === 0) {
      router.push("/discover/event-not-found");
    } else {
      // Handle the case where search results are available
      console.log("Search results found:", searchResults);
    }
  };

  const options = [
    { value: "Wedding", label: "Wedding" },
    { value: "Birthday", label: "Birthday" },
    { value: "Concert", label: "Concert" },
    { value: "Paint & Sip", label: "Paint & Sip" },
    { value: "Hangout", label: "Hangout" },
    { value: "Carnival", label: "Carnival" },
    { value: "Seminar", label: "Seminar" },
    { value: "Conference", label: "Conference" },
    { value: "Tech Event", label: "Tech Event" },
    { value: "Art Exhibition", label: "Art Exhibition" },
    { value: "Holiday Camp", label: "Holiday Camp" },
    { value: "Others", label: "Others" },
  ];

  // Type for custom styles in react-select
  const customStyles: StylesConfig = {
    control: (base) => ({
      ...base,
      borderRadius: '12px', // Rounded corners
      borderColor: '#ccc', // Border color
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
      fontFamily: "'Bricolage Grotesque', sans-serif", // Custom font
      fontSize: '14px',
      padding: '2px 8px', // Adjust padding to make it more compact
      height: '30px', // Set a custom height for the search bar
      display: 'flex',
      alignItems: 'center', // Vertically center the text inside the control
      lineHeight: '20px', // Adjust line-height to vertically center the text
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: "8px", // Rounded corners for the dropdown menu
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Bricolage Grotesque', sans-serif",
    }),
    option: (base: any, { isFocused }: any) => ({
      ...base,
      backgroundColor: isFocused ? "#f0f0f0" : "#fff", // Highlight color on hover
      color: "#333", // Text color
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: "14px",
      padding: "5px 10px", // Added padding on the left side
      paddingLeft: "15px", // Left padding specifically
    }),
    placeholder: (base: any) => ({
      ...base,
      fontFamily: "'Bricolage Grotesque', sans-serif",
      color: "#aaa",
    }),
  };

  const handleChange = (selectedOption: any) => {
    if (selectedOption) {
      router.push(`/discover/search?query=${selectedOption.value}`);
    }
  };


  const header = (
    <div className="flex-center justify-between w-full">
      <h1 style={{ fontSize: "24px" }}>Discovery</h1>



      <div className="flex items-center space-x-4">
        {/* React-Select Search */}
        <div className="w-64">
          <Select
            options={options}
            placeholder="Search events"
            styles={customStyles} // This is correct for styling
            onChange={handleChange}
          />
        </div>

        {/* Create New Event Button (Only for Logged-In Users) */}
        {isLoggedIn && (
          <button
            onClick={() => router.push("/discover/create-events")}
            className="bg-OWANBE_PRY rounded-full px-4 py-2 text-xs font-semibold text-white flex items-center space-x-2 whitespace-nowrap"
          >
            <PlusOutlined className="text-sm" /> {/* Adjust size if needed */}
            <span>Create New Event</span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <DashboardLayout title={header}>
      <div className="flex flex-col gap-10">
        <DiscoverEvents />

        {/* Tab Navigation */}
        <div className="flex space-x-8 mb-1">
          <button
            className={`relative font-semibold pb-2 ${activeTab === "all" ? "text-red-600" : "text-gray-500"
              }`}
            onClick={() => {
              setActiveTab("all");
              // router.push('/discover/all')
            }}
          >
            All Events
            {activeTab === "all" && (
              <div
                className="absolute left-0 bottom-[-2px] w-full h-[4px] bg-red-600 rounded-full"
                style={{ borderRadius: "25px" }}
              />
            )}
          </button>
          <button
            className={`relative font-semibold pb-2 ${activeTab === "popular" ? "text-red-600" : "text-gray-500"
              }`}
            onClick={() => setActiveTab("popular")}
          >
            Popular Events
            {activeTab === "popular" && (
              <div
                className="absolute left-0 bottom-[-2px] w-full h-[4px] bg-red-600 rounded-full"
                style={{ borderRadius: "25px" }}
              />
            )}
          </button>
        </div>

        {/* Popular Events Content */}
        {/* Tab Content */}
        {activeTab === "popular" && <PopularEvents />}
        {activeTab === "all" && <AllEvents />}
      </div>
    </DashboardLayout>
  );
}

export default Discover;
