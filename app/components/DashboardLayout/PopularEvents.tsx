import EventSection from "./PopularEventSection";
import InfoCard from "./OtherInfoCard";
import { useGetDiscoveryEvents } from "@/app/hooks/event/event.hook";
import { Skeleton } from "antd";
import InfoCardM from "./OtherInfoCard2";
import { IEventDetails } from "@/app/utils/interface";
import placeholder from "@/public/placeholder.svg";
import { useState } from "react";

const PopularEvents = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setpageSize] = useState(12);
  const { getDiscoveryEvents } = useGetDiscoveryEvents(page, pageSize);
  const discoveryEvents = getDiscoveryEvents?.data?.data?.data?.events;
  const sortedEvents = discoveryEvents?.sort(
    (a: IEventDetails, b: IEventDetails) =>
      (b?.total_ticket_sold ?? 0) - (a?.total_ticket_sold ?? 0)
  );
  const isPending = getDiscoveryEvents?.isLoading;

  return (
    <EventSection
      title="Popular Events"
      titleClass="custom-title-class"
      style={{
        fontSize: "20px",
        fontFamily: "Bricolage Grotesque, font-semibold",
      }} // Inline style
      uri="/discover/popularevents"
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
        sortedEvents?.map((event: IEventDetails, index: number) => (
          <>
            <InfoCard
              className="lg:flex hidden"
              key={index}
              title={event?.eventName}
              about={event?.eventType}
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

export default PopularEvents;
