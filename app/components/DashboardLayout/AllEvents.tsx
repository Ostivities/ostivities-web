import EventSection from './PopularEventSection';
import InfoCard from './OtherInfoCard';

const AllEvents = () => {
  return (
    <EventSection
      title="All Events"
      titleClass="custom-title-class"
      style={{ fontSize: '20px', fontFamily: 'Bricolage Grotesque, font-semibold' }}  // Inline style 
      uri="/Dashboard/popular">
      <InfoCard
        title="Concert with Davido"
        about="Concert"
        status="Get Tickets"
        image="/images/placeholder-1.png"
        url="/Dashboard/popular/1"
        titleClass="font-bricolage-grotesque font-medium"
        aboutClass="font-bricolage-grotesque"
        statusClass="font-bricolage-grotesque font-medium"
      />
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
        title="Concert with Davido"
        about="Concert"
        status="sold out"
        image="/images/placeholder-1.png"
        url="/Dashboard/popular/1"
        titleClass="font-bricolage-grotesque font-medium"
        aboutClass="font-bricolage-grotesque"
        statusClass="font-bricolage-grotesque font-medium"
      /><InfoCard
        title="Concert with Davido"
        about="Concert"
        status="sold out"
        image="/images/placeholder-1.png"
        url="/Dashboard/popular/1"
        titleClass="font-bricolage-grotesque font-medium"
        aboutClass="font-bricolage-grotesque"
        statusClass="font-bricolage-grotesque font-medium"
      /><InfoCard
        title="Concert with Davido"
        about="Concert"
        status="sold out"
        image="/images/placeholder-1.png"
        url="/Dashboard/popular/1"
        titleClass="font-bricolage-grotesque font-medium"
        aboutClass="font-bricolage-grotesque"
        statusClass="font-bricolage-grotesque font-medium"
      />
    </EventSection>
  );
};

export default AllEvents;