'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const VendorsTimerModal = () => {
  const router = useRouter();
  return (
    <div className="fixed inset-0 bg-black/20 grid place-items-center">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl px-12 py-16 lg:min-w-[43rem]"
      >
        <div className="flex justify-center">
          <div className="bg-OWANBE_NOTIFICATION rounded-full w-[4.5rem] h-[4.5rem] grid place-items-center">
            <Image
              src="/icons/warning.svg"
              alt="warning"
              height={32}
              width={36}
            />
          </div>
        </div>
        <div className="mt-8 text-center">
          <h2 className="font-bricolage-grotesque font-bold text-xl">
            Reserved booked space time limit reached!
          </h2>
          <p className="font-bricolage-grotesque font-medium text-OWAMBE_FADE_TEXT max-w-xl mx-auto mt-8">
            Your booked space have been released as the order was not completed
            within the allotted time frame. Please initiate a new order to
            proceed.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => router.push("/Dashboard/vendorstickets")}
              className="block primary-btn font-normal text-base mt-12 px-32"
            >
              Initiate order again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorsTimerModal;
