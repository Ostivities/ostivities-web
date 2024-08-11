'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CantPublishModal = () => {
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
              alt="paystack"
              height={32}
              width={36}
            />
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="font-bricolage-grotesque font-medium text-OWAMBE_FADE_TEXT max-w-xl mx-auto mt-8">
          You will need to fill all necessary requirement before you can publish this event.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => router.push("/about")}
              className="block primary-btn font-normal text-base mt-12 px-32"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CantPublishModal;
