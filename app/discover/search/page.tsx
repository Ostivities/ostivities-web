"use client";

import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import InfoCard from "@/app/components/DashboardLayout/OtherInfoCard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGetDiscoveryEvents } from "@/app/hooks/event/event.hook";
import { Input, Button, Select as AntSelect, Skeleton } from "antd";
import EventSearch from "@/app/components/DashboardLayout/EventSearch";
import Select, { StylesConfig, SingleValue, ActionMeta } from "react-select";
import { Country, State } from "country-state-city";

// Custom styles for react-select
const customStyles: StylesConfig = {
  control: (base) => ({
    ...base,
    borderRadius: '12px',
    borderColor: '#ccc',
    fontFamily: "'Bricolage Grotesque', sans-serif",
    fontSize: '14px',
    padding: '2px 8px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    lineHeight: '20px',
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Bricolage Grotesque', sans-serif",
  }),
  option: (base, { isFocused }) => ({
    ...base,
    backgroundColor: isFocused ? "#f0f0f0" : "#fff",
    color: "#333",
    fontFamily: "'Bricolage Grotesque', sans-serif",
    fontSize: "14px",
    padding: "5px 10px",
    paddingLeft: "15px",
  }),
  placeholder: (base) => ({
    ...base,
    fontFamily: "'Bricolage Grotesque', sans-serif",
    color: "#aaa",
  }),
};

const SearchResult = ({ params }: { params: { event: string } }) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [stateValue, setStateValue] = useState<SingleValue<{ label: string; value: string }> | null>(null);
  const [eventTypeValue, setEventTypeValue] = useState<SingleValue<{ label: string; value: string }> | null>(null);

  const { getDiscoveryEvents } = useGetDiscoveryEvents(page, pageSize);
  const discoveryEvents = getDiscoveryEvents?.data?.data?.data?.events;
  const isPending = getDiscoveryEvents?.isLoading;
  const skeletonCount = Math.max(12, discoveryEvents.length);

  const COUNTRY_JSON: any = Country.getAllCountries().map((i: any) => {
    return { value: i?.name, label: i?.name, isoCode: i?.isoCode };
  });

  const STATE_BY_COUNTRYCODE = (stateCode: string): { label: string; value: string }[] => {
    const result: any = State.getStatesOfCountry(stateCode);
    return result.map((i: any) => {
      return { label: i?.name, value: i?.name };
    });
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchResults.length === 0) {
      router.push("/discover/event-not-found");
    } else {
      console.log("Search results found:", searchResults);
    }
  };

  const handleStateChange = (newValue: unknown, actionMeta: ActionMeta<unknown>) => {
    setStateValue(newValue as SingleValue<{ label: string; value: string }> | null);
  };

  const handleEventTypeChange = (newValue: unknown, actionMeta: ActionMeta<unknown>) => {
    setEventTypeValue(newValue as SingleValue<{ label: string; value: string }> | null);
  };

  const header = (
    <div className="flex-center gap-2">
      <Image
        src="/icons/back-arrow.svg"
        alt="Back"
        height={25}
        width={25}
        onClick={() => router.back()}
        className="cursor-pointer"
      />
      <h1 style={{ fontSize: "24px" }}>Search for events</h1>
    </div>
  );

  return (
    <DashboardLayout title={header} isLoggedIn>
      <div className="border-[1px] rounded-[24px] p-8 shadow-md">
        <h3 className="font-semibold mb-3">
          Find events happening around you.
        </h3>
        <form onSubmit={handleSearch} className="flex flex-wrap gap-4">
          {/* Event Name */}
          <label htmlFor="name" className="flex-1 min-w-[200px]">
            <span
              className="text-OWANBE_PRY mb-1 block"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: "300" }}
            >
              Event Name
            </span>
            <input
              type="text"
              id="name"
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Enter event name"
              style={{
                borderRadius: '12px !important', // Rounded corners
                borderColor: '#ccc', // Border color
                borderWidth: '1px', // Adding border width to match react-select
                fontFamily: "'Bricolage Grotesque', sans-serif", // Custom font
                fontSize: '14px', // Font size to match react-select
                padding: '2px 18px', // Adjust padding to make it more compact
                height: '38px', // Set a custom height for the search bar
                display: 'flex',
                alignItems: 'center', // Vertically center the text inside the input
                lineHeight: '20px', // Adjust line-height to vertically center the text
                color: '#333', // Text color
                backgroundColor: '#fff', // White background color
              }}
              className="w-full p-2 border border-gray-300 rounded-[12px] !important"
            />
          </label>


          {/* Event State (react-select) */}
          <label htmlFor="state" className="flex-1 min-w-[200px]">
            <span className="text-OWANBE_PRY mb-1 block" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: "300" }}>
              Event State
            </span>
            <Select
              placeholder="Select event state"
              className="w-full"
              options={[...STATE_BY_COUNTRYCODE("NG")]}
              onChange={handleStateChange}
              styles={customStyles}
            />
          </label>

          {/* Event Type (react-select) */}
          <label htmlFor="type" className="flex-1 min-w-[200px]">
            <span className="text-OWANBE_PRY mb-1 block" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: "300" }}>
              Event Type
            </span>
            <Select
              placeholder="Select event type"
              onChange={handleEventTypeChange}
              className="w-full"
              options={[
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
              ]}
              styles={customStyles}
            />
          </label>

          {/* Search Button */}
          <div className="flex items-end button-lenght">
            <Button
              type="primary" // Use a valid type like 'primary' or 'default'
              htmlType="submit" // This makes it behave as a submit button
              disabled={searchText === ""}
              style={{
                backgroundColor: searchText === "" ? "#cccccc" : "#e20000",
                color: searchText === "" ? "#666666" : "white",
                cursor: searchText === "" ? "not-allowed" : "pointer",
                borderRadius: '25px',
                height: '38px',
                border: "none",
                // Rounded corners (adjust this as needed)
              }}
              className="w-full md:w-36 h-30px text-sm text-white py-1.5 px-12"
            >
              Search
            </Button>
          </div>
        </form>
      </div>

      <EventSearch />
    </DashboardLayout>
  );
};

export default SearchResult;