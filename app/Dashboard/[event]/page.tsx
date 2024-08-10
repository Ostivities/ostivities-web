"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import InfoCard from "@/app/components/DashboardLayout/InfoCard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useMemo } from "react";

interface PropsI {
  event: "popular" | "discovery" | "paid" | "free" | "online";
}

const Event = ({ params }: { params: { event: string } }) => {
  const router = useRouter();

  const title = (
    <div className="flex-center gap-2">
      <Image
        src="/icons/back-arrow.svg"
        alt=""
        height={25}
        width={25}
        onClick={() => router.back()}
        className="cursor-pointer"
      />
      <h1 style={{ fontSize: "24px" }}>Popular Events</h1>
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
        <h2 className="font-bricolage-grotesque font-semibold text-2xl mb-3">Explore Popular Events</h2>
        <div className="grid grid-cols-5 gap-3 gap-y-10 mt-7">
          <InfoCard
            title="Concert with Davido"
            about="Concert"
            status="Get Tickets"
            image="/images/placeholder-1.png"
            url="/Dashboard/discovery/1"
            titleClass="font-bricolage-grotesque font-medium"
        aboutClass="font-bricolage-grotesque"
        statusClass="font-bricolage-grotesque font-medium"
          />
          <InfoCard
            title="Muslim Tech Expo"
            about="Event"
            status="sold out"
            image="/images/placeholder-2.png"
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
            url="/popular/1"
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
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Event;
