'use client';

import { IModal } from '@/app/utils/interface';
import Image from 'next/image';
import { useGetUserEventByUniqueKey } from "@/app/hooks/event/event.hook";
import { useParams, useRouter } from "next/navigation";

const PaymentSuccessModal = ({ open, onCancel, onClose, onOk, data }: IModal): JSX.Element => {
  const router = useRouter();
  const params = useParams<{ event: string }>();
  const { getUserEventByUniqueKey } = useGetUserEventByUniqueKey(params?.event);

  // Check for event details
  const eventDetails = getUserEventByUniqueKey?.data?.data?.data === null ? router.push('/not-found') : getUserEventByUniqueKey?.data?.data?.data;


  // Function to sync event to calendar
  const handleSyncToCalendar = () => {
    const eventName = encodeURIComponent(eventDetails.eventName || 'Event Name');
    const startDate = new Date(eventDetails.startDate);
    const endDate = new Date(eventDetails.endDate);

    // Format dates for Google Calendar
    const startFormatted = `${startDate.getUTCFullYear()}${(startDate.getUTCMonth() + 1).toString().padStart(2, '0')}${startDate.getUTCDate().toString().padStart(2, '0')}T${startDate.getUTCHours().toString().padStart(2, '0')}${startDate.getUTCMinutes().toString().padStart(2, '0')}00Z`;
    const endFormatted = `${endDate.getUTCFullYear()}${(endDate.getUTCMonth() + 1).toString().padStart(2, '0')}${endDate.getUTCDate().toString().padStart(2, '0')}T${endDate.getUTCHours().toString().padStart(2, '0')}${endDate.getUTCMinutes().toString().padStart(2, '0')}00Z`;

    const timeZone = encodeURIComponent(eventDetails.timeZone || 'UTC');
    const location = encodeURIComponent(eventDetails.address || 'Event Location');
    const details = encodeURIComponent(`Event Details: ${eventDetails.eventDetails || 'No details provided'}`); // Get event details for calendar

    const eventLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventName}&dates=${startFormatted}/${endFormatted}&details=${details}&location=${location}&ctz=${timeZone}`;

    window.open(eventLink, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/20 grid place-items-center">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl px-12 py-12 lg:min-w-[40rem]"
      >
        <div className="flex justify-center">
          <div className="bg-OWANBE_NOTIFICATION rounded-full w-[4.5rem] h-[4.5rem] grid place-items-center">
            <Image
              src="/icons/success.svg"
              alt="Success"
              height={32}
              width={36}
            />
          </div>
        </div>
        <div className="mt-8 text-center">
          <h2 className="font-bricolage-grotesque font-bold text-xl">
            Success!
          </h2>
          <p className="font-bricolage-grotesque font-semibold text-OWAMBE_FADE_TEXT w-[35rem] mx-auto mt-5">
            Your order was successful. We&apos;ve also sent a copy to your email address. If you do not receive your ticket,
            please email us at <a href="mailto:sales&#64;ostivities.com" style={{ color: "#e20000", textDecoration: "none" }} >(Host email will be here)</a>.
          </p>
          <div className="flex flex-col items-center space-y-4 mt-10">
            <div className="flex items-center space-x-4 w-[20rem]">
              <button
                onClick={() => router.push("/discover/payment")}
                className="primary-btn font-normal text-base flex-1 whitespace-nowrap px-3 py-2"
              >
                Download Ticket
              </button>
              <button
                onClick={handleSyncToCalendar}
                className="flex items-center justify-center p-2 rounded-full"
                style={{ backgroundColor: '#fadede' }}
                aria-label="Sync to Calendar"
              >
                <Image
                  src="/icons/calendar.svg"
                  alt="Calendar Icon"
                  height={24}
                  width={24}
                />
              </button>
            </div>
            <button
              onClick={() => router.push("/discover/tickets")}
              className="primary-btn font-normal continue cursor-pointer text-base w-[20rem]"
            >
              Buy Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;
