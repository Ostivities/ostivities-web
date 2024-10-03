"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import InfoCard from "@/app/components/DashboardLayout/OtherInfoCard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useMemo } from "react";
import { useGetDiscoveryEvents } from '@/app/hooks/event/event.hook';
import { Skeleton } from "antd";

interface PropsI {
  event: "popular"| "all" | "paid" | "free" ;
}

const Event = ({ params }: { params: { event: string } }) => {
  const router = useRouter();

  // Mapping event types to titles and subtitles
  const eventTitles = {
    popular: "Popular Events",
    all: "All Events",
    paid: "Paid Events",
    free: "Free Events",
  };

  const eventSubtitles = {
    popular: "Explore Popular Events",
    all: "Explore All Events",
    paid: "Explore Paid Events",
    free: "Explore Free Events",
  };

  const currentTitle = eventTitles[params.event as keyof typeof eventTitles] || "Events";
  const currentSubtitle = eventSubtitles[params.event as keyof typeof eventSubtitles] || "Explore Events";

  const { getDiscoveryEvents } = useGetDiscoveryEvents(1, 10);
  const discoveryEvents = getDiscoveryEvents?.data?.data?.data;
  // console.log(discoveryEvents, 'discoveryEvents');
  const isPending = getDiscoveryEvents?.isLoading;
  const skeletonCount = discoveryEvents?.length || 12;    

  const title = (
    <div className="flex-center gap-2">
      <Image
        src="/icons/back-arrow.svg"
        alt="Back"
        height={25}
        width={25}
        onClick={() => router.back()}
        className="cursor-pointer"
      />
      <h1 style={{ fontSize: "24px" }}>{currentTitle}</h1>
    </div>
  );

  // Memoize uri array
  const uri = useMemo(() => ["popular", "discovery", "paid", "free", "all"], []);

  useLayoutEffect(() => {
    if (!uri.includes(params.event)) {
      router.push("/Dashboard");
    }
  }, [params.event, router, uri]);

  return (
    <DashboardLayout title={title} isLoggedIn>
      <section>
      <h2
  className="mb-3"
  style={{ fontSize: '24px', fontFamily: 'Bricolage Grotesque, font-semibold' }}
>
  {currentSubtitle}
</h2>

        <div className="grid grid-cols-6 gap-6 gap-y-10 mt-7">
        {isPending ? (
          // Display skeleton buttons dynamically based on the data length or fallback to 5
          <>
            {Array(skeletonCount).fill(null).map((_, index) => (
              <Skeleton.Button
                key={index}
                active
                shape="round"
                style={{ height: 200, width: 200, margin: "10px" }}
              />
            ))}
          </>
        ) : (
          // Once data is loaded, map through discoveryEvents and render InfoCard components
          discoveryEvents?.map((event: any) => (
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
          ))
        )}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Event;
