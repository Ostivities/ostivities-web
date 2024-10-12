"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import InfoCard from "@/app/components/DashboardLayout/OtherInfoCard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useMemo, useState } from "react";
import { useGetDiscoveryEvents } from "@/app/hooks/event/event.hook";
import { Button, Skeleton } from "antd";

interface PropsI {
  event: "popular" | "all" | "paid" | "free";
}

const Event = ({ params }: { params: { event: string } }) => {
  const router = useRouter();
  const [pageSize, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

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

  const currentTitle =
    eventTitles[params.event as keyof typeof eventTitles] || "Events";
  const currentSubtitle =
    eventSubtitles[params.event as keyof typeof eventSubtitles] ||
    "Explore Events";

  const { getDiscoveryEvents } = useGetDiscoveryEvents(pageSize, limit);
  const discoveryEvents = getDiscoveryEvents?.data?.data?.data || []; // Ensure this is always an array
  console.log(discoveryEvents.length, "Number of Discovery Events"); // Log the length

  const isPending = getDiscoveryEvents?.isLoading;
  const skeletonCount = Math.max(12, discoveryEvents.length);

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
  const uri = useMemo(
    () => ["popular", "discovery", "paid", "free", "all"],
    []
  );

  useLayoutEffect(() => {
    if (!uri.includes(params.event)) {
      router.push("/Discover");
    }
  }, [params.event, router, uri]);

  return (
    <DashboardLayout title={title} isLoggedIn>
      <section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "60px" }}>
          <h2
            style={{
              fontSize: "24px",
              fontFamily: "Bricolage Grotesque, font-semibold",
            }}
          >
            {currentSubtitle}
          </h2>
          <div style={{ display: "flex", gap: "10px"}}>
            {pageSize > 1 && ( // Conditionally render Back button
              <Button
                onClick={() => {
                  setPage(pageSize - 1); // Go back to the previous page
                }}
                style={{
                  backgroundColor: "#fff", // Default background
                  borderRadius: "25px",    // Corner radius
                  border: "1px solid #ccc", // Border for default button
                  color: "#000",           // Default text color
                  fontFamily: "'Bricolage Grotesque', sans-serif", // Set custom font
                  width: "100px",          // Adjust the width
                  height: "40px",          // Adjust the height
                  fontSize: "16px",
                }}
              >
                Back
              </Button>
            )}

            <Button
              onClick={() => {
                setPage(pageSize + 1);
              }}
              style={{
                backgroundColor: "#fadede", // Background color
                borderRadius: "25px",       // Corner radius
                border: "none",             // Optional: remove border
                color: "#e20000",           // Text color for contrast
                fontFamily: "'Bricolage Grotesque', sans-serif", // Set custom font
                width: "100px",             // Adjust the width
                height: "40px", 
                fontSize: "16px",           // Adjust the height
              }}
            >
              Next
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-6 gap-y-10 mt-7">
          {isPending ? (
            // Display skeleton buttons dynamically based on the data length or fallback to 5
            <>
              {Array(skeletonCount)
                .fill(null)
                .map((_, index) => (
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
                url={`/Discover/${event?.eventName}/${event?.id}`}
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
