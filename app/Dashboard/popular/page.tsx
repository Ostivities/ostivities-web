import DashboardLayout from '@/app/components/DashboardLayout/DashboardLayout';
import InfoCard from '@/app/components/DashboardLayout/InfoCard';

const page = () => {
  return (
    <DashboardLayout title="Popular Events">
      <section>
        <h2 className="font-semibold text-3xl mb-3">Explore Popular Events</h2>
        <div className="grid grid-cols-5 gap-3 gap-y-6">
          <InfoCard
            title="Agbaya Linkup"
            about="hangout"
            status="sold out"
            image="/images/wed.jpeg"
            url="/Dashboard/popular/1"
          />
          <InfoCard
            title="Agbaya Linkup"
            about="hangout"
            status="sold out"
            image="/images/wed.jpeg"
            url="/Dashboard/popular/1"
          />{' '}
          <InfoCard
            title="Agbaya Linkup"
            about="hangout"
            status="sold out"
            image="/images/wed.jpeg"
            url="/Dashboard/popular/1"
          />
          <InfoCard
            title="Agbaya Linkup"
            about="hangout"
            status="sold out"
            image="/images/wed.jpeg"
            url="/Dashboard/popular/1"
          />
          <InfoCard
            title="Agbaya Linkup"
            about="hangout"
            status="sold out"
            image="/images/wed.jpeg"
            url="/Dashboard/popular/1"
          />
          <InfoCard
            title="Agbaya Linkup"
            about="hangout"
            status="sold out"
            image="/images/wed.jpeg"
            url="/Dashboard/popular/1"
          />
          <InfoCard
            title="Agbaya Linkup"
            about="hangout"
            status="sold out"
            image="/images/wed.jpeg"
            url="/Dashboard/popular/1"
          />
          <InfoCard
            title="Agbaya Linkup"
            about="hangout"
            status="sold out"
            image="/images/wed.jpeg"
            url="/Dashboard/popular/1"
          />
          <InfoCard
            title="Agbaya Linkup"
            about="hangout"
            status="sold out"
            image="/images/wed.jpeg"
            url="/Dashboard/popular/1"
          />
          <InfoCard
            title="Agbaya Linkup"
            about="hangout"
            status="sold out"
            image="/images/wed.jpeg"
            url="/Dashboard/popular/1"
          />
          <InfoCard
            title="Agbaya Linkup"
            about="hangout"
            status="sold out"
            image="/images/wed.jpeg"
            url="/Dashboard/popular/1"
          />
        </div>
      </section>
    </DashboardLayout>
  );
};

export default page;
