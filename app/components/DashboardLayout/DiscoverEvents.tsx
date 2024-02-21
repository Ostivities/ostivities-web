import Link from 'next/link';
import InfoCard from './InfoCard';
import EventSection from './EventSection';

const DiscoverEvents = () => {
  return (
    <EventSection title="Discover Events" uri="/Dashboard/discovery">
      <InfoCard
        title="Agbaya Linkup"
        about="hangout"
        status="sold out"
        image="/images/wed.jpeg"
        url="/Dashboard/discovery/1"
      />
      <InfoCard
        title="Agbaya Linkup"
        about="hangout"
        status="sold out"
        image="/images/wed.jpeg"
        url="/Dashboard/discovery/1"
      />
      <InfoCard
        title="Agbaya Linkup"
        about="hangout"
        status="sold out"
        image="/images/wed.jpeg"
        url="/Dashboard/discovery/1"
      />
      <InfoCard
        title="Agbaya Linkup"
        about="hangout"
        status="sold out"
        image="/images/wed.jpeg"
        url="/Dashboard/discovery/1"
      />
      <InfoCard
        title="Agbaya Linkup"
        about="hangout"
        status="sold out"
        image="/images/wed.jpeg"
        url="/Dashboard/discovery/1"
      />
    </EventSection>
  );
};

export default DiscoverEvents;
