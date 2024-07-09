'use client';

import DashboardLayout from '@/app/components/DashboardLayout/DashboardLayout';
import Summary from '@/app/components/Discovery/Summary';
import TimerModal from '@/app/components/Modal/TimerModal';
import { useTimer } from '@/app/hooks/countdown';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import "@/app/globals.css";

const Payment = () => {
  const router = useRouter();
  const [modal, setModal] = useState(false);

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
      <h1 style={{ fontSize: '24px' }}>Payment Options</h1>
    </div>
  );

  const { minutes, remainingSeconds, timer } = useTimer();

  useEffect(() => {
    if (minutes === 0 && remainingSeconds === 0) {
      setModal(true);
    }
  }, [minutes, remainingSeconds]);

  return (
    <DashboardLayout title={title} isLoggedIn>
      <section className="flex gap-12">
        <section className="flex-1">
          <div className=" bg-OWANBE_NOTIFICATION px-4 py-2 border-[0.5px] border-OWANBE_PRY rounded-[0.625rem]">
            We have reserved your tickets please complete checkout within{' '}
            <span className=" text-OWANBE_PRY">{timer}</span>
            to secure your tickets.
          </div>
          <div className="pr-full mt-16">
            <div className="flex flex-col gap-8">
              <div className="card-shadow flex justify-between">
                <div className="flex gap-3 items-start">
                  <div className="pt-1">
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div>
                    <h2 className="text-lg text-OWANBE_PRY">
                      Pay with Card
                    </h2>
                    <span className="text-ss">
                      Pay with a MasterCard, Visa, Verve Card or directly with
                      your bank.
                    </span>
                  </div>
                </div>
                <Image
                  src="/images/MasterCard.svg"
                  alt="mastercard"
                  height={25}
                  width={80}
                />
              </div>
              <div className="card-shadow flex justify-between">
                <div className="flex gap-3 items-start">
                  <div className="pt-1">
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div>
                    <h2 className="text-lg text-OWANBE_PRY">
                      Pay with Bank Transfer
                    </h2>
                    <span className="text-ss">
                      Make payment by transferring to our dedicated account number.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-center gap-2 mt-7 [&>p>a]:text-OWANBE_PRY">
              <div className="">
                
              </div>

              <p className="checkbox-label">
                <input type="checkbox" name="" id="" /> I accept the 
                <a href="#" className="policy-link">Terms and Conditions</a>, 
                <a href="#" className="policy-link">Refund Policy</a> and 
                <a href="#" className="policy-link">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </section>
        <Summary paymentBtn to={"/Dashboard/payment"} />
        {modal && <TimerModal />}
      </section>
    </DashboardLayout>
  );
};

export default Payment;
