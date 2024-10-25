"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayoutnotfound";
import React from "react";
import { useRouter } from "next/navigation";
import notfound from '@/public/notfound.svg';
import Image from 'next/image';

function EventNotFound(): JSX.Element {
  const router = useRouter();

  const handleBackToDiscovery = () => {
    router.push("/discover");
  };

  return (
    <DashboardLayout>
      <div className="w-full mx-auto flex flex-col md:flex-row items-center justify-between space-y-5 py-6">
        <div className="w-full md:w-1/2 flex items-center justify-center md:order-2">
          <Image
            src={notfound}
            alt="Event not found"
            className="ms-1"
            width={530}
            height={530}
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-2 p-8 md:p-[8rem] justify-center md:order-1">
          <h2 className="w-full font-BricolageGrotesqueMedium text-3xl font-bold mb-4">Oops.... page not found!</h2>
          <p className="w-full font-BricolageGrotesqueMedium text-md mb-6">This Page doesn`t exist or was removed! We suggest you confirm the search parameters or if the URL is correct and try again.</p>
          <button
            onClick={handleBackToDiscovery}
            className="primary-btn w-full md:w-80 text-center text-white py-2 px-6 rounded-full text-lg font-bricolage"
            style={{ borderRadius: '25px' }}
          >
            Back to discovery
          </button>

        </div>
      </div>
    </DashboardLayout>
  );
}

export default EventNotFound;
