import { IEventDetails } from "@/app/utils/interface";
import EventSection from "./AllEventSection";
import InfoCardM from "./OtherInfoCard2";
import InfoCard from "./OtherInfoCard";
import { useGetDiscoveryEvents } from "@/app/hooks/event/event.hook";
import { Skeleton } from "antd";
import { useState } from "react";
import placeholder from "@/public/placeholder.svg";

const AllEvents = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setpageSize] = useState(12);
  const { getDiscoveryEvents } = useGetDiscoveryEvents(page, pageSize);
  const discoveryEvents = getDiscoveryEvents?.data?.data?.data?.events;
  const isPending = getDiscoveryEvents?.isLoading;

  return (
    <EventSection
      title="All Events"
      titleClass="custom-title-class"
      style={{
        fontSize: "20px",
        fontFamily: "Bricolage Grotesque, font-semibold",
      }} // Inline style
      uri="/discover/allevents"
    >
      {isPending ? (
        <>
          {Array(10)
            .fill(null)
            .map((_, index) => (
              <Skeleton.Button
                key={index}
                active
                shape="round"
                style={{
                  height: 200,
                  width: 200,
                  margin: "10px",
                  maxWidth: "100%",
                }}
              />
            ))}
        </>
      ) : (
        // Once data is loaded, map through discoveryEvents and render InfoCard components
        discoveryEvents?.map((event: IEventDetails, index: number) => (
          <>
            <InfoCard
              className="lg:flex hidden"
              key={index}
              title={event?.eventName}
              about={event?.eventType}
              startDate={event?.startDate}
              endDate={event?.endDate}
              status={
                event?.enable_registration === false
                  ? "Reg Closed"
                  : "Get Tickets"
              }
              image={event?.eventImage ? event.eventImage : placeholder}
              url={`/discover/${event?.unique_key}`}
              titleClass="font-bricolage-grotesque font-medium"
              aboutClass="font-bricolage-grotesque"
              statusClass="font-bricolage-grotesque font-medium"
            />
            <InfoCardM
              className="flex lg:hidden"
              key={index}
              title={event?.eventName}
              about={event?.eventType}
              startDate={event?.startDate}
              endDate={event?.endDate}
              status={
                event?.enable_registration === false
                  ? "Reg Closed"
                  : "Get Tickets"
              }
              image={event?.eventImage ? event.eventImage : placeholder}
              url={`/discover/${event?.unique_key}`}
              titleClass="font-bricolage-grotesque font-medium"
              aboutClass="font-bricolage-grotesque"
              statusClass="font-bricolage-grotesque font-medium"
            />
          </>
        ))
      )}
    </EventSection>
  );
};

export default AllEvents;
