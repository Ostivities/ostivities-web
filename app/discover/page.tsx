"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import React, { useState } from "react";
import DiscoverEvents from "../components/DashboardLayout/DiscoverEvents";
import PopularEvents from "../components/DashboardLayout/PopularEvents";
import AllEvents from "../components/DashboardLayout/AllEvents";
import { Input, Select, Tabs, Skeleton } from "antd";
import { useGetDiscoveryEvents } from "@/app/hooks/event/event.hook";
import { PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Country, State } from "country-state-city";
import { EVENT_TYPES } from "../utils/data";
import useFetch from "../components/forms/create-events/auth";

function Dashboard(): JSX.Element {
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

  const header = (
    <div className="flex-center justify-between w-full">
      <h1 style={{ fontSize: "24px" }}>Discovery</h1>

      {isLoggedIn && (
        <button
          onClick={() => router.push("/discover/create-events")}
          className="bg-OWANBE_PRY rounded-full px-4 py-2 text-xs font-semibold text-white"
        >
          <PlusOutlined /> <span className="pl-1">Create New Event</span>
        </button>
      )}
    </div>
  );

  return (
    <DashboardLayout title={header}>
      <div className="flex flex-col gap-10">
        <DiscoverEvents />
        <div className="border-[1px]  rounded-[24px] p-8 shadow-md">
          <h3 className="font-semibold mb-3">
            Find events happening around you.
          </h3>
          <div>
            <form onSubmit={handleSearch} className="flex flex-wrap gap-4">
              <label htmlFor="name" className="flex-1 min-w-[200px]">
                <span
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: "300",
                  }}
                  className="text-OWANBE_PRY mb-1 block"
                >
                  Event Name (optional)
                </span>
                <Input
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="enter event name"
                  className="w-full"
                />
              </label>

              <label htmlFor="state" className="flex-1 min-w-[200px]">
                <span
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: "300",
                  }}
                  className="text-OWANBE_PRY mb-1 block"
                >
                  Event State (optional)
                </span>
                <Select
                  placeholder="select event state"
                  className="w-full"
                  options={[...STATE_BY_COUNTRYCODE("NG")]}
                  onChange={(value) => setSearchText(value)}
                />
              </label>

              <label htmlFor="category" className="flex-1 min-w-[200px]">
                <span
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: "300",
                  }}
                  className="text-OWANBE_PRY mb-1 block"
                >
                  Event Category
                </span>
                <Select
                  placeholder="select event category"
                  className="w-full"
                  options={[
                    { value: "free", label: "Free Events" },
                    { value: "paid", label: "Paid Events" },
                  ]}
                  onChange={(value) => setSearchText(value)}
                />
              </label>

              <label htmlFor="type" className="flex-1 min-w-[200px]">
                <span
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: "300",
                  }}
                  className="text-OWANBE_PRY mb-1 block"
                >
                  Event Type
                </span>
                <Select
                  placeholder="select event type"
                  onChange={(value) => setSearchText(value)}
                  className="w-full"
                  options={[
                    { value: "All", label: "All" },
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
                />
              </label>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full md:w-36 h-fit text-sm text-white bg-OWANBE_PRY py-1.5 px-12 rounded-full"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Tab Navigation */}
        <div className="flex space-x-8 mb-1">
          <button
            className={`relative font-semibold pb-2 ${
              activeTab === "all" ? "text-red-600" : "text-gray-500"
            }`}
            onClick={() => {
              setActiveTab("all")
              router.push('/discover/all')
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
            className={`relative font-semibold pb-2 ${
              activeTab === "popular" ? "text-red-600" : "text-gray-500"
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

export default Dashboard;
