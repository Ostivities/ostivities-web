import InfoCard from "./InfoCard";
import EventSection from "./DiscoverEventSection";
import { useGetDiscoveryEvents, useAddEventToDiscovery, usePublishEvent } from "@/app/hooks/event/event.hook";
import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import { IEventDetails } from "@/app/utils/interface";
import { EVENT_INFO, PUBLISH_TYPE } from "@/app/utils/enums";
import placeholder from "@/public/placeholder.svg";
import Select, { StylesConfig } from "react-select";

const DiscoverEvents = () => {
  const [searchText, setSearchText] = useState("");
  const { getDiscoveryEvents } = useGetDiscoveryEvents(1, 5);
  const discoveryEvents = getDiscoveryEvents?.data?.data?.data?.events;
  const { addEventToDiscovery } = useAddEventToDiscovery();
  const [expiredEventsId, setExpiredEventsId] = useState<string[]>([]);
  // 
  const { publishEvent } = usePublishEvent();

  const isPending = getDiscoveryEvents?.isLoading;

  const allEventsDate = discoveryEvents?.map((event: IEventDetails) => {
    return {
      id: event?.id,
      endDate: event?.endDate
    };
  });
  const expiredEvents = allEventsDate?.filter((event: IEventDetails) => new Date(event?.endDate).getTime() < new Date().getTime());
  const expiredEventsIdList = expiredEvents?.map((event: IEventDetails) => event?.id);
  const filteredEvents = discoveryEvents?.filter((event: IEventDetails) => new Date(event.endDate).getTime() > new Date().getTime());
  useEffect(() => {
    const checkEventStatus = async () => {
      const response =  await publishEvent.mutateAsync({
        ids: [...expiredEventsIdList],
        mode: PUBLISH_TYPE.INACTIVE
      })
    }
    if(expiredEventsIdList?.length > 0) {
      checkEventStatus();
    }
  },[expiredEventsIdList])

  return (
    <>
      <EventSection
        title="Featured Events"
        titleClass="custom-title-class"
        style={{
          fontSize: "22px",
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
                style={{
                  height: '300px',
                  width: '240px',
                  margin: '5px',
                  maxWidth: '100%',
                }}
              />
            ))}
          </>
        ) : (
          // Once data is loaded, map through discoveryEvents and render InfoCard components
          filteredEvents?.map((event: IEventDetails, index: number) => (
            <InfoCard
              key={index}
              title={event?.eventName}
              about={event?.eventType}
              startDate={event?.startDate}
              endDate={event?.endDate}
              status= {event?.enable_registration === false ? "Reg Closed" :  "Get Tickets"  }
              image={event?.eventImage ? event.eventImage : placeholder}
              url={`/discover/${event?.unique_key}`}
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
