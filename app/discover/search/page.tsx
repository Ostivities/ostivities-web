"use client";

import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import InfoCard from "@/app/components/DashboardLayout/OtherInfoCard";
import Image from "next/image";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useGetDiscoveryEvents } from "@/app/hooks/event/event.hook";
import { Input, Button, Select, Skeleton, Form } from "antd";
import EventSearch from "@/app/components/DashboardLayout/EventSearch";
import { StylesConfig, SingleValue, ActionMeta } from "react-select";
import { Country, State } from "country-state-city";

const { Option } = Select;

// Custom styles for react-select
const customStyles: StylesConfig = {
  control: (base) => ({
    ...base,
    borderRadius: "12px",
    borderColor: "#ccc",
    fontFamily: "'Bricolage Grotesque', sans-serif",
    fontSize: "14px",
    padding: "2px 8px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    lineHeight: "20px",
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

const SearchResult = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [form] = Form.useForm();
  const query = searchParams.get("query");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [eventName, setEventName] = useState("");
  const [state, setState] = useState("");
  const [eventCat, setEventCat] = useState("");
  const [selectedValue, setSelectedValue] = useState<string | undefined>();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const eventType = Form.useWatch("eventType", form);

  const STATE_BY_COUNTRYCODE = (
    stateCode: string
  ): { label: string; value: string }[] => {
    const result: any = State.getStatesOfCountry(stateCode);
    return result.map((i: any) => {
      return { label: i?.name, value: i?.name };
    });
  };

  useEffect(() => {
    // Update the state with the query value when the component mounts or query changes
    if (query) {
      form.setFieldsValue({
        eventType: query,
      });
      setSelectedValue(query);
    }
  }, [query]);

  const handleEventTypeChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams?.toString() || "");

    if (value) {
      params.set("query", value); // Set the query parameter
    } else {
      params.delete("query"); // Remove the query parameter if value is empty
    }

    router.push(`/discover/search?${params.toString()}`);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchResults.length === 0) {
      router.push("/discover/event-not-found");
    } else {
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
    <DashboardLayout title={header} isLoggedIn>
      <div
        className="border rounded-[24px] p-8 "
        style={{
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
        }}
      >
        <h3
          className="font-BricolageGrotesqueMedium mb-3"
          style={{ color: '#e20000' }}
        >
          Find events happening around you.
        </h3>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSearch}
          className="flex flex-wrap gap-4"
        >
          {/* Event Name */}
          <Form.Item
            label="Event Name"
            name="eventName"
            rules={[
              {
                required: true,
                message: "Please input the event name",
              },
            ]}
            className="flex-1 min-w-[200px]"
          >
            <Input
              allowClear
              placeholder="Enter event name"
              onChange={(e) => {
                setSearchText(e.target.value);
                setEventName(e.target.value);
              }}
              style={{
                borderRadius: "12px",
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "14px",
                padding: "2px 18px",
                height: "32px",
              }}
            />
          </Form.Item>

          {/* Event State */}
          <Form.Item
            label="Event State"
            name="eventState"
            className="flex-1 min-w-[200px] h-[38px]"
          >
            <Select
              placeholder="Select event state"
              onChange={(value) => {
                setState(value);
              }}
              style={{
                borderRadius: "20px",
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "14px",
              }}
              allowClear
            >
              {STATE_BY_COUNTRYCODE("NG").map((state) => (
                <Option key={state?.value} value={state?.value}>
                  {state?.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Event Type */}
          <Form.Item
            label="Event Type"
            name="eventType"
            className="flex-1 min-w-[200px] h-[38px]"
          >
            <Select
              placeholder="Select event type"
              onChange={(value) => {
                setEventCat(value);
                handleEventTypeChange(value);
              }}
              style={{
                borderRadius: "20px",
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "14px",
              }}
              allowClear
            >
              <Option value="">-- Select an Option --</Option>{" "}
              <Option value={"Wedding"}>Wedding</Option>
              <Option value={"Birthday"}>Birthday</Option>
              <Option value={"Concert"}>Concert</Option>
              <Option value={"Paint & Sip"}>Paint & Sip</Option>
              <Option value={"Hangout"}>Hangout</Option>
              <Option value={"Carnival"}>Carnival</Option>
              <Option value={"Seminar"}>Seminar</Option>
              <Option value={"Conference"}>Conference</Option>
              <Option value={"Tech Event"}>Tech Event</Option>
              <Option value={"Art Exhibition"}>Art Exhibition</Option>
              <Option value={"Holiday Camp"}>Holiday Camp</Option>
              <Option value={"Others"}>Others</Option>
            </Select>
          </Form.Item>

          {/* Search Button */}
          {/* <div className="flex items-end">
            <Button
              type="primary"
              htmlType="submit"
              disabled={searchText === ""}
              style={{
                backgroundColor: searchText === "" ? "#cccccc" : "#e20000",
                color: searchText === "" ? "#666666" : "white",
                cursor: searchText === "" ? "not-allowed" : "pointer",
                borderRadius: "25px",
                height: "38px",
                border: "none",
              }}
              className="w-full md:w-36 h-30px text-sm text-white py-1.5 px-12"
            >
              Search
            </Button>
          </div> */}
        </Form>{" "}
      </div>

      <EventSearch eventName={eventName} state={state} eventCat={eventCat} />
    </DashboardLayout>
  );
};

export default SearchResult;
