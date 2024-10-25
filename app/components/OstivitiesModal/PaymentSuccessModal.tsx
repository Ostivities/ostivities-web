'use client';

import { IModal } from '@/app/utils/interface';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const PaymentSuccessModal = ({ open, onCancel, onClose, onOk }: IModal): JSX.Element => {
  const router = useRouter();

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
              alt="warning"
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
            Your order was successful. We&apos;ve also sent a copy to your email address. <br /> <br /> In the event that you do not receive your ticket, 
            Please email us at <a href="mailto:sales&#64;ostivities.com"style={{ color: "#e20000", textDecoration: "none" }} >sales&#64;ostivities.com</a>.
          </p>
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={() => router.push("/discover/payment")} 
              className="block primary-btn font-normal text-base mt-10 w-[20rem]" // Set same width for both buttons
            >
              Download ticket
            </button>
            <button
              onClick={() => router.push("/discover/tickets")} 
              className="block primary-btn font-normal continue cursor-pointer text-base mt-10 w-[20rem]" // Set same width for both buttons
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
