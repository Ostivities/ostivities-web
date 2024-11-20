import OtherInfoCard from "./OtherInfoCard";
import { Skeleton } from "antd";
import EventSection from "./OtherEventSection";
import { useGetDiscoveryEvents } from "@/app/hooks/event/event.hook";
import { useParams, usePathname } from "next/navigation";
import { IEventDetails } from "@/app/utils/interface";
import placeholder from "@/public/placeholder.svg";
import InfoCardM from "./OtherInfoCard2";

const DiscoverEvents = () => {
  const params = useParams<{ event: string }>();
  const pathname = usePathname();

  const lastPath = pathname?.split("/").pop();

  const { getDiscoveryEvents } = useGetDiscoveryEvents(1, 10);
  const discoveryEvents = getDiscoveryEvents?.data?.data?.data;
  // console.log(discoveryEvents, 'discoveryEvents');
  const uniqueEvent = discoveryEvents?.map(
    (event: IEventDetails) => event?.unique_key
  );

  const isPending = getDiscoveryEvents?.isLoading;

  return (
    <EventSection
      title="Other Events You May Like"
      titleClass="custom-title-class"
      style={{
        fontSize: "20px",
        fontFamily: "Bricolage Grotesque, font-medium",
      }} // Inline style
    >
      {isPending ? (
        <>
          {Array(5)
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
        discoveryEvents
          ?.filter((event: IEventDetails) => event?.unique_key !== lastPath)
          .map((event: IEventDetails) => (
            <>
              <OtherInfoCard
                className="lg:flex hidden"
                key={event?.id}
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
                key={event?.id}
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

      {/* {discoveryEvents?.filter((event: IEventDetails) => event?.unique_key !=== params?.event).map((event: IEventDetails) => (
        <OtherInfoCard
          key={event?.id}
          title={event?.eventName}
          about={event?.eventType}
          status={event?.enable_registration === false ? "Reg Closed" : "Get Tickets"}
          image={event?.eventImage ? event.eventImage : placeholder}
          url={`/discover/${event?.unique_key}`}
          titleClass="font-bricolage-grotesque font-medium"
          aboutClass="font-bricolage-grotesque"
          statusClass="font-bricolage-grotesque font-medium"
        />
      ))} */}
    </EventSection>
  );
};

export default DiscoverEvents;
