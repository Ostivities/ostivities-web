import Link from 'next/link';
import Carousel from '../Carousel';
import InfoCard from './InfoCard';

const PopularEvents = () => {
  return (
    <section>
      <div className="flex-center justify-between">
        <h2 className="font-semibold text-3xl mb-7">Popular Events</h2>
        <Link
          href={'/Dashboard/popular'}
          className="font-semibold text-OWANBE_PRY"
        >
          See More {'>'}
        </Link>
      </div>
      <Carousel>
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
      </Carousel>
    </section>
  );
};

export default PopularEvents;
