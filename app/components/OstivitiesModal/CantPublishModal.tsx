'use client';

import { IModal } from '@/app/utils/interface';
import Image from 'next/image';
import { useRouter, useParams } from "next/navigation";
import { useCookies } from "react-cookie";

const CantPublishModal = ({ open, onCancel, onClose, onOk }: IModal): JSX.Element => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [cookies, setCookie, removeCookie] = useCookies(["event_id"]);

  return (
    <div className="fixed inset-0 bg-black/20 grid place-items-center"
    onClick={(e) => e.stopPropagation()} // prevent clicks outside the modal from closing it
  >
    <div
      onClick={(e) => e.stopPropagation()} // prevent clicks inside the modal from bubbling up
      className="bg-white rounded-2xl px-12 py-12 lg:min-w-[33rem]"
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
        <h2 className="font-bricolage-grotesque font-bold text-xl">
          Unable to Publish Event!
          </h2>
          <p className="font-bricolage-grotesque font-regular text-OWAMBE_FADE_TEXT max-w-md mx-auto mt-5">
          One or more ticket needs to be created before you can be able to publish an event.
          Click the button below to manage your event.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() =>
                router.push(
                  `/discover/events-created/${params?.id}/about`
                )
              }
              className="block primary-btn font-normal text-base mt-10 px-32"
            >
              Manage Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CantPublishModal;
