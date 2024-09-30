import Link from 'next/link';
import InfoCard from './InfoCard';
import EventSection from './EventSection';
import { useGetDiscoveryEvents } from '@/app/hooks/event/event.hook';


const DiscoverEvents = () => {

  const { getDiscoveryEvents } = useGetDiscoveryEvents();
  const discoveryEvents = getDiscoveryEvents?.data?.data?.data;
  console.log(discoveryEvents, 'discoveryEvents');

  return (
    <EventSection 
    title="Discover Events"
     titleClass="custom-title-class"
     style={{ fontSize: '24px', fontFamily: 'Bricolage Grotesque, font-semibold' }}  // Inline style
     >
      {discoveryEvents?.map((event: any) => (
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
      ))}
      
      <InfoCard
        title="Concert with Davido"
        about="Concert"
        status="sold out"
        image="/images/placeholder.png"
        url="/Dashboard/discovery/1"
        titleClass="font-bricolage-grotesque font-medium"
        aboutClass="font-bricolage-grotesque"
        statusClass="font-bricolage-grotesque font-medium"
      />
    </EventSection>
  );
};

export default DiscoverEvents;
