import OtherInfoCard from './OtherInfoCard';
import { Skeleton } from "antd";
import EventSection from './OtherEventSection';
import { useGetDiscoveryEvents } from '@/app/hooks/event/event.hook';
import { useParams } from 'next/navigation';
import { IEventDetails } from '@/app/utils/interface';
const DiscoverEvents = () => {
  const params = useParams<{ event: string }>();

  const currentEvent = (value: string) => {
    return value !== params?.event;
  }

  const { getDiscoveryEvents } = useGetDiscoveryEvents(1, 10);
  const discoveryEvents = getDiscoveryEvents?.data?.data?.data;
  // console.log(discoveryEvents, 'discoveryEvents');

  const isPending = getDiscoveryEvents?.isLoading;

  return (
    <EventSection 
      title="Other Events You May Like" 
      titleClass="custom-title-class"
      style={{ fontSize: '20px', fontFamily: 'Bricolage Grotesque, font-medium' }}  // Inline style
    >
      {isPending ? (
        <>
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <Skeleton.Button
                key={index}
                active
                shape="round"
                style={{ height: 200, width: 200, margin: "10px", maxWidth: '100%' }}
              />
            ))}
        </>
      ) : (
        <></>
      )}
      {discoveryEvents?.filter((event: IEventDetails) => currentEvent(event?.unique_key)).map((event: IEventDetails) => (
        <OtherInfoCard 
          key={event?.id}
          title={event?.eventName}
          about={event?.eventType}
          status= {event?.enable_registration === false ? "Reg Closed" :  "Get Tickets"  }
          image={event?.eventImage}
          url={`/discover/${event?.unique_key}`}
          titleClass="font-bricolage-grotesque font-medium"
          aboutClass="font-bricolage-grotesque"
          statusClass="font-bricolage-grotesque font-medium"
        />
      ))}
    </EventSection>
  );
};

export default DiscoverEvents;
