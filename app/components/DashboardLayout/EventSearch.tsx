import { IEventDetails } from "@/app/utils/interface";
import EventSection from "./EventSearchSection";
import InfoCardM from "./OtherInfoCard2";
import InfoCard from "./OtherInfoCard";
import { useGetDiscoveryEvents } from "@/app/hooks/event/event.hook";
import { Skeleton } from "antd";
import { useState } from "react";
import placeholder from "@/public/placeholder.svg";

interface IEventSearchProps {
  eventName?: string;
  state?: string;
  eventCat?: string;
}
const EventSearch = ({ eventName, state, eventCat }: IEventSearchProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setpageSize] = useState(12);
  const { getDiscoveryEvents } = useGetDiscoveryEvents(
    page,
    pageSize,
    eventName,
    state,
    eventCat
  );
  const discoveryEvents = getDiscoveryEvents?.data?.data?.data?.events;
  console.log(discoveryEvents, "discoveryEvents");

  const isPending = getDiscoveryEvents?.isLoading;

  return (
    <>
      <EventSection
        title="Hangout Events"
        titleClass="custom-title-class"
        style={{
          fontSize: "20px",
          fontFamily: "Bricolage Grotesque, font-semibold",
        }} // Inline style
        uri="/discover/allevents"
      >
        {isPending ? (
          <>
            {Array(6)
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
      {discoveryEvents?.length === 0 && (
        <div className="text-center w-full">
          <h1 className="font-bricolage-grotesque font-medium">
            No events found
          </h1>
        </div>
      )}
    </>
  );
};

export default EventSearch;
