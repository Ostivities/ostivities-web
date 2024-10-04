"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useGetUserEvent, useAddEventToDiscovery } from "@/app/hooks/event/event.hook";

export default function EventDetailsComponent({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [isActive, setIsActive] = useState<boolean>(false);
  const pathname = usePathname();
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { getUserEvent } = useGetUserEvent(params?.id);
  const { addEventToDiscovery } = useAddEventToDiscovery();
  const eventDetails = getUserEvent?.data?.data?.data;

  const handleSwitchChange = async () => {
    if (!eventDetails?.discover) {
      await addEventToDiscovery.mutateAsync({ id: params?.id, discover: true });
    }
  };

  useEffect(() => {
    setIsActive(!!eventDetails?.discover);
  }, [eventDetails]);

  const title = (
    <div className="flex items-center w-full relative pb-2 space-x-8">
      <div className="flex flex-row items-center space-x-2 cursor-pointer">
        <Image
          src="/icons/back-arrow.svg"
          alt="Back"
          height={25}
          width={25}
          onClick={() => router.push(`/Dashboard/venue-hub`)}
        />
        <h1 style={{ fontSize: "24px" }}>High Point Event Centre & Suites</h1>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <DashboardLayout title={title} isLoggedIn>
        <div className="w-full mx-auto flex flex-col space-y-5 py-2">
          {children}
        </div>
      </DashboardLayout>
    </React.Fragment>
  );
}
