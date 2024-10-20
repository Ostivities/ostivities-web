import { IEventDetails } from "@/app/utils/interface";
import { Skeleton } from "antd";
import { useGetDiscoveryEvents } from "../../hooks/event/event.hook";
import InfoCard from "./OtherInfoCard";
import EventSection from "./PopularEventSection";

const PopularEvents = () => {
  const { getDiscoveryEvents } = useGetDiscoveryEvents(1, 5);
  const discoveryEvents = getDiscoveryEvents?.data?.data?.data;
  console.log(discoveryEvents, "discoveryEvents");

  const isPending = getDiscoveryEvents?.isLoading;

  return (
    <EventSection
      title="Popular Events"
      titleClass="custom-title-class"
      style={{
        fontSize: "20px",
        fontFamily: "Bricolage Grotesque, font-semibold",
      }} // Inline style
      uri="/discover/popular"
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
        discoveryEvents?.map((event: IEventDetails) => (
          <InfoCard
            key={event?.id}
            title={event?.eventName}
            about={event?.eventType}
            status="Get Tickets"
            image={event?.eventImage}
            url={`/discover/${event?.unique_key}`}
            titleClass="font-bricolage-grotesque font-medium"
            aboutClass="font-bricolage-grotesque"
            statusClass="font-bricolage-grotesque font-medium"
          />
        ))
      )}
    </EventSection>
  );
};

export default PopularEvents;
