"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import InfoCard from "@/app/components/DashboardLayout/OtherInfoCard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useMemo, useState } from "react";
import { useGetDiscoveryEvents } from "@/app/hooks/event/event.hook";
import { IEventDetails } from "@/app/utils/interface";
import placeholder from "@/public/placeholder.svg";
import { Country, State } from "country-state-city";
import { Input, Select, Button, Tabs, Skeleton } from "antd";
import EventSearch from "@/app/components/DashboardLayout/EventSearch";

const SearchResult = ({ params }: { params: { event: string } }) => {
  const router = useRouter();
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(12)
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const { getDiscoveryEvents } = useGetDiscoveryEvents(page, pageSize);
  const discoveryEvents = getDiscoveryEvents?.data?.data?.data || []; // Ensure this is always an array
  console.log(discoveryEvents.length, "Number of Discovery Events"); // Log the length
  const isPending = getDiscoveryEvents?.isLoading;
  const skeletonCount = Math.max(12, discoveryEvents.length);


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
    <DashboardLayout  title={header} isLoggedIn>
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
                  Event Name
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
                  Event State 
                </span>
                <Select
                  placeholder="select event state"
                  className="w-full"
                  options={[...STATE_BY_COUNTRYCODE("NG")]}
                  onChange={(value) => setSearchText(value)}
                />
              </label>

              {/* <label htmlFor="category" className="flex-1 min-w-[200px]">
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
              </label> */}

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

              <div className="flex items-end button-lenght">
                <button
                  disabled={searchText === ""}
                  type="submit"
                  style={{
                    backgroundColor:
                      searchText === ""
                        ? "#cccccc" // Gray for disabled
                        : "#e20000", // Red for active
                    color: searchText === "" ? "#666666" : "white",
                    cursor: searchText === "" ? "not-allowed" : "pointer",
                  }}
                  className="w-full md:w-36 h-fit text-sm text-white bg-OWANBE_PRY py-1.5 px-12 rounded-full"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
        <EventSearch />
    </DashboardLayout>
  );
};

export default SearchResult;