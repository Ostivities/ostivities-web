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
          Success!</h2>
          <p className="font-bricolage-grotesque font-regular text-OWAMBE_FADE_TEXT w-[35rem] mx-auto mt-5">
          Your purchase has been confirmed and a confirmation mail has been dispatched to your 
          email address at onome@gmail.com. <br /> In the event that you do not receive your ticket, 
          kindly reach out to our support team at <a href="mailto:support@ostivities.com">support@ostivities.com</a>.
          </p>
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={() => router.push("/Dashboard/payment")} 
              className="block primary-btn font-normal text-base mt-10 px-32"
            >
              Download
            </button>
            <button
              onClick={() => router.push("/Dashboard/payment")} 
              className="block primary-btn font-normal continue cursor-pointer text-base mt-10 px-32"
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
