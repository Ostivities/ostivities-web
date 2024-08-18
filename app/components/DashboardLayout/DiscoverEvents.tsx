import Link from 'next/link';
import InfoCard from './InfoCard';
import EventSection from './EventSection';

const DiscoverEvents = () => {
  return (
    <EventSection title="Discover Events"> 
      <InfoCard
        title="Concert with Davido"
        about="Concert"
        status="sold out"
        image="/images/placeholder-1.png"
        url="/Dashboard/popular/1"
        titleClass="font-bricolage-grotesque font-medium"
        aboutClass="font-bricolage-grotesque"
        statusClass="font-bricolage-grotesque font-medium"
      />
      <InfoCard
        title="Agbaya Linkup"
        about="Hangout"
        status="sold out"
        image="/images/placeholder-5.png"
        url="/Dashboard/discovery/1"
        titleClass="font-bricolage-grotesque font-medium"
        aboutClass="font-bricolage-grotesque"
        statusClass="font-bricolage-grotesque font-medium"
      />
      <InfoCard
        title="Tobi weds Shade"
        about="Wedding"
        status="Get Tickets"
        image="/images/placeholder-4.png"
        url="/Dashboard/discovery/1"
        titleClass="font-bricolage-grotesque font-medium"
        aboutClass="font-bricolage-grotesque"
        statusClass="font-bricolage-grotesque font-medium"
      />
      <InfoCard
        title="Agbaya Linkup"
        about="Hangout"
        status="sold out"
        image="/images/placeholder-5.png"
        url="/Dashboard/discovery/1"
        titleClass="font-bricolage-grotesque font-medium"
        aboutClass="font-bricolage-grotesque"
        statusClass="font-bricolage-grotesque font-medium"
      />
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
