import InfoCard from "./InfoCard";
import EventSection from "./DiscoverEventSection";
import { useGetDiscoveryEvents, useAddEventToDiscovery, usePublishEvent } from "@/app/hooks/event/event.hook";
import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import { IEventDetails } from "@/app/utils/interface";
import { EVENT_INFO, PUBLISH_TYPE } from "@/app/utils/enums";

const DiscoverEvents = () => {
  const [searchText, setSearchText] = useState("");
  const { getDiscoveryEvents } = useGetDiscoveryEvents(1, 10);
  const discoveryEvents = getDiscoveryEvents?.data?.data?.data;
  const { addEventToDiscovery } = useAddEventToDiscovery();
  const [expiredEventsId, setExpiredEventsId] = useState<string[]>([]);
  // console.log(discoveryEvents, "discoveryEvents")
  const { publishEvent } = usePublishEvent();

  const isPending = getDiscoveryEvents?.isLoading;

  const allEventsDate = discoveryEvents?.map((event: IEventDetails) => {
    return {
      id: event?.id,
      endDate: event?.endDate
    };
  });
  // console.log(allEventsDate, "allEventsDate");
  // const formattedEventDates = allEventsDate?.map((event: IEventDetails)  => {
  //   return {
  //     id: event?.id,
  //     endDate: new Date(event?.endDate).getTime()
  //   }
  // });  
  // console.log(formattedEventDates, "formattedEventDates")
  const expiredEvents = allEventsDate?.filter((event: IEventDetails) => new Date(event?.endDate).getTime() < new Date().getTime());
  console.log(expiredEvents, "expiredEvents");
  const expiredEventsIdList = expiredEvents?.map((event: IEventDetails) => event?.id);
  // setExpiredEventsId(expiredEvents?.map((event: IEventDetails) => event?.id));
  const filteredEvents = discoveryEvents?.filter((event: IEventDetails) => new Date(event.endDate).getTime() > new Date().getTime());
  // console.log(filteredEvents, "filteredEvents")
  useEffect(() => {
    // const today = new Date().getTime();
    // console.log(today, "today");
    // const filteredEvents = formattedEventDates?.filter((date: number) => date > today);
    // console.log(filteredEvents, "filteredEvents");
    const checkEventStatus = async () => {
      // if(formattedEventDates?.map((date: number) => date) < new Date().getTime() && discoveryEvents?.eventInfo === EVENT_INFO.SINGLE_EVENT){
      //   const response =  await publishEvent.mutateAsync({
      //     id: discover,
      //     mode: PUBLISH_TYPE.INACTIVE
      //   })
      // }

    }
  },[])

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
          filteredEvents?.map((event: IEventDetails) => (
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
