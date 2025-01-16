import { IEventDetails } from "@/app/utils/interface";
import EventSection from "./EventSearchSection";
import InfoCardM from "./OtherInfoCard2";
import InfoCard from "./OtherInfoCard";
import { useGetDiscoveryEvents } from "@/app/hooks/event/event.hook";
import { Skeleton } from "antd";
import { useState } from "react";
import placeholder from "@/public/placeholder.svg";
import notfound from "@/public/notfound.svg";
import Image from "next/image";

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

  const isPending = getDiscoveryEvents?.isLoading;

  return (
    <>
      <EventSection
        title={
          !eventCat && !eventName && !state
            ? "All Events"
            : state && eventCat && !eventName
            ? `${eventCat} Event(s) in ${state}`
            : state && !eventCat && !eventName
            ? `All Events in ${state}`
            : !state && eventCat && !eventName
            ? `${eventCat} Event(s)`
            : !state && !eventCat && eventName
            ? `Search Results for ${eventName}`
            : ""
        }
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
        <div className="flex flex-col items-center justify-center gap-8 p-8 text-center">
          <Image
            src={notfound}
            alt="Event not found"
            width={230}
            height={230}
            style={{ objectFit: "contain" }}
          />
          <div>
            <h2 className="font-BricolageGrotesqueMedium text-xl font-semibold">
              Oops.... event not found!
            </h2>
            <p className="font-BricolageGrotesqueMedium text-md">
              We suggest you confirm the search parameters and try again.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default EventSearch;
