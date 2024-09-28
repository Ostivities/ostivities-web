import OtherInfoCard from './OtherInfoCard';
import EventSection from './OtherEventSection';
import { useGetDiscoveryEvents } from '@/app/hooks/event/event.hook';

const DiscoverEvents = () => {
  const { getDiscoveryEvents } = useGetDiscoveryEvents();
  const discoveryEvents = getDiscoveryEvents?.data?.data?.data;
  console.log(discoveryEvents, 'discoveryEvents');

  return (
    <EventSection 
      title="Other Events You May Like" 
      titleClass="custom-title-class"
      style={{ fontSize: '20px', fontFamily: 'Bricolage Grotesque, font-medium' }}  // Inline style
    >
      {discoveryEvents?.map((event: any) => (
        <OtherInfoCard 
          key={event?.id}
          title={event?.eventName}
          about={event?.eventType}
          status="Get Tickets"
          image={event?.eventImage}
          url={`/Dashboard/discovery/${event?.id}`}
          titleClass="font-bricolage-grotesque font-medium"
          aboutClass="font-bricolage-grotesque"
          statusClass="font-bricolage-grotesque font-medium"
        />
      ))}
    </EventSection>
  );
};

export default DiscoverEvents;
