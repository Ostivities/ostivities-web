import InfoCard from "./InfoCard";
import EventSection from "./DiscoverEventSection";
import { useGetDiscoveryEvents, useAddEventToDiscovery, usePublishEvent } from "@/app/hooks/event/event.hook";
import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import { IEventDetails } from "@/app/utils/interface";
import { EVENT_INFO, PUBLISH_TYPE } from "@/app/utils/enums";
import placeholder from "@/public/placeholder.svg";
import Select, { StylesConfig } from "react-select";
import notfound from '@/public/notfound.svg';
import Image from 'next/image';

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
          fontSize: "20px",
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
        ) : filteredEvents && filteredEvents.length > 0 ? (
          // Once data is loaded, map through discoveryEvents and render InfoCard components
          filteredEvents.map((event: IEventDetails, index: number) => (
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
          ) : (
            // Render a message when no events are available
            <div
            className="flex justify-center w-full"
            style={{alignItems: "center" }}
          >
            <div className="flex flex-col items-center gap-8 p-4 text-center">
              <Image
                src={notfound}
                alt="Event not found"
                width={200}
                height={200}
                style={{ objectFit: "contain" }}
              />
              <div>
                <h2 className="font-BricolageGrotesqueMedium text-xl font-semibold">
                  Oops.... no events available!
                </h2>
                <p className="font-BricolageGrotesqueMedium text-md">
                  Kindly check back later.
                </p>
              </div>
            </div>
          </div>  
          )}
        </EventSection>
    </>
  );
};

export default DiscoverEvents;
