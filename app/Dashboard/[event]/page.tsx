"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import InfoCard from "@/app/components/DashboardLayout/InfoCard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useMemo } from "react";

interface PropsI {
  event: "popular" | "paid" | "free" ;
}

const Event = ({ params }: { params: { event: string } }) => {
  const router = useRouter();

  // Mapping event types to titles and subtitles
  const eventTitles = {
    popular: "Popular Events",
    paid: "Paid Events",
    free: "Free Events",
  };

  const eventSubtitles = {
    popular: "Explore Popular Events",
    paid: "Explore Paid Events",
    free: "Explore Free Events",
  };

  const currentTitle = eventTitles[params.event as keyof typeof eventTitles] || "Events";
  const currentSubtitle = eventSubtitles[params.event as keyof typeof eventSubtitles] || "Explore Events";

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
  const uri = useMemo(() => ["popular", "discovery", "paid", "free", "online"], []);

  useLayoutEffect(() => {
    if (!uri.includes(params.event)) {
      router.push("/Dashboard");
    }
  }, [params.event, router, uri]);

  return (
    <DashboardLayout title={title} isLoggedIn>
      <section>
        <h2 className="font-bricolage-grotesque font-semibold text-2xl mb-3">{currentSubtitle}</h2>
        <div className="grid grid-cols-5 gap-3 gap-y-10 mt-7">
          <InfoCard
            title="Concert with Davido"
            about="Concert"
            status="Get Tickets"
            image="/images/placeholder-1.png"
            url={`/Dashboard/${params.event}/1`}
            titleClass="font-bricolage-grotesque font-medium"
            aboutClass="font-bricolage-grotesque"
            statusClass="font-bricolage-grotesque font-medium"
          />
           <InfoCard
            title="Agbaya Linkup"
            about="Hangout"
            status="Sold Out"
            image="/images/placeholder-5.png"
            url={`/Dashboard/${params.event}/4`}
            titleClass="font-bricolage-grotesque font-medium"
            aboutClass="font-bricolage-grotesque"
            statusClass="font-bricolage-grotesque font-medium"
          />
          <InfoCard
            title="Tobi Weds Shade"
            about="Wedding"
            status="Get Tickets"
            image="/images/placeholder-4.png"
            url={`/Dashboard/${params.event}/3`}
            titleClass="font-bricolage-grotesque font-medium"
            aboutClass="font-bricolage-grotesque"
            statusClass="font-bricolage-grotesque font-medium"
          />
          <InfoCard
            title="Agbaya Linkup"
            about="Hangout"
            status="Sold Out"
            image="/images/placeholder-5.png"
            url={`/Dashboard/${params.event}/4`}
            titleClass="font-bricolage-grotesque font-medium"
            aboutClass="font-bricolage-grotesque"
            statusClass="font-bricolage-grotesque font-medium"
          />
          <InfoCard
            title="Concert with Davido"
            about="Concert"
            status="Sold Out"
            image="/images/placeholder-1.png"
            url={`/Dashboard/${params.event}/5`}
            titleClass="font-bricolage-grotesque font-medium"
            aboutClass="font-bricolage-grotesque"
            statusClass="font-bricolage-grotesque font-medium"
          />
          <InfoCard
            title="Agbaya Linkup"
            about="Hangout"
            status="Sold Out"
            image="/images/placeholder-5.png"
            url={`/Dashboard/${params.event}/4`}
            titleClass="font-bricolage-grotesque font-medium"
            aboutClass="font-bricolage-grotesque"
            statusClass="font-bricolage-grotesque font-medium"
          />
          {/* Add more InfoCards as needed */}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Event;
