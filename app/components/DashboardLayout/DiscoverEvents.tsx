import InfoCard from "./InfoCard";
import EventSection from "./DiscoverEventSection";
import { useGetDiscoveryEvents } from "@/app/hooks/event/event.hook";
import { Skeleton } from "antd";
import { useState } from "react";

const DiscoverEvents = () => {
  const [searchText, setSearchText] = useState("");
  const { getDiscoveryEvents } = useGetDiscoveryEvents(1, 10);
  const discoveryEvents = getDiscoveryEvents?.data?.data?.data;

  const isPending = getDiscoveryEvents?.isLoading;

  return (
    <>
      <EventSection
        title="Discover Events"
        titleClass="custom-title-class"
        style={{
          fontSize: "24px",
          fontFamily: "Bricolage Grotesque, font-semibold",
        }} // Inline style
      >
        {isPending ? (
          // Display 5 skeleton buttons as placeholders while loading
          <>
            {Array(5).fill(null).map((_, index) => (
              <Skeleton.Button
                key={index}
                active
                shape="round"
                style={{ height: 220, width: 230, margin: "10px" }}
              />
            ))}
          </>
        ) : (
          // Once data is loaded, map through discoveryEvents and render InfoCard components
          discoveryEvents?.map((event: any) => (
            <InfoCard
              key={event?.id}
              title={event?.eventName}
              about={event?.eventType}
              status="Get Tickets"
              image={event?.eventImage}
              url={`/Dashboard/${event?.eventName}/${event?.id}`}
              titleClass="font-bricolage-grotesque font-medium"
              aboutClass="font-bricolage-grotesque"
              statusClass="font-bricolage-grotesque font-medium"
            />
          ))
        )}
      </EventSection>
    </>
  );
};

export default DiscoverEvents;
