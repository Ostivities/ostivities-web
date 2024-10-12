import EventSection from './DiscoverEventSection';
import InfoCard from './InfoCard';

const PaidEvents = () => {
  return (
    <EventSection 
    title="Paid Events"
    titleClass="custom-title-class"
    style={{ fontSize: '20px', fontFamily: 'Bricolage Grotesque, font-semibold' }}  // Inline style 
    uri="/Discover/paid">
      <InfoCard
        title="Concert with Davido"
        about="Concert"
        status="sold out"
        image="/images/placeholder-1.png"
        url="/Discover/popular/1"
        titleClass="font-bricolage-grotesque font-medium"
        aboutClass="font-bricolage-grotesque"
        statusClass="font-bricolage-grotesque font-medium"
      />
      <InfoCard
        title="Concert with Davido"
        about="Concert"
        status="sold out"
        image="/images/placeholder-1.png"
        url="/Discover/popular/1"
        titleClass="font-bricolage-grotesque font-medium"
        aboutClass="font-bricolage-grotesque"
        statusClass="font-bricolage-grotesque font-medium"
      />
      <InfoCard
        title="Concert with Davido"
        about="Concert"
        status="sold out"
        image="/images/placeholder-1.png"
        url="/Discover/popular/1"
        titleClass="font-bricolage-grotesque font-medium"
        aboutClass="font-bricolage-grotesque"
        statusClass="font-bricolage-grotesque font-medium"
      />
    </EventSection>
  );
};

export default PaidEvents;