'use client';

import DashboardLayout from '@/app/components/DashboardLayout/DashboardLayout';
import Summary from '@/app/components/Discovery/VendorsSummary';
import TimerModal from '@/app/components/OstivitiesModal/VendorsTimerModal';
import { useTimer } from '@/app/hooks/countdown';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import "@/app/globals.css";
import { Checkbox } from 'antd';

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
          <div className=" bg-OWANBE_NOTIFICATION text-s font-BricolageGrotesqueRegular px-4 py-2 border-[0.5px] border-OWANBE_PRY rounded-[0.625rem]">
            We have reserved your booked space please complete checkout within{' '}
            <span className=" text-OWANBE_PRY text-s font-BricolageGrotesqueRegular">{timer}</span>
            minutes to secure your space.
          </div>
          <div className="pr-full mt-16">
            <div className="flex flex-col gap-8">
              <div className="card-shadow flex justify-between">
                <div className="flex gap-3 items-start">
                  <div className="pt-1">
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div>
                    <h2 className="text-lg font-BricolageGrotesqueRegular text-OWANBE_PRY">
                      Pay with Card
                    </h2>
                    <span className="text-s font-BricolageGrotesqueRegular">
                      Pay with a MasterCard, Visa, Verve Card or directly with
                      your bank.
                    </span>
                  </div>
                </div>
              </div>
              <div className="card-shadow flex justify-between">
                <div className="flex gap-3 items-start">
                  <div className="pt-1">
                    <input type="checkbox" name="" id="" />
                  </div>
                  <div>
                    <h2 className="text-lg font-BricolageGrotesqueRegular text-OWANBE_PRY">
                      Pay with Bank Transfer
                    </h2>
                    <span className="text-s font-BricolageGrotesqueRegular">
                      Make payment by transferring to our dedicated account number.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-center gap-2 mt-7 [&>p>a]:text-OWANBE_PRY">
              <div className="">
                
              </div>

              <Checkbox>
  <span style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
    I accept the{" "}
    <a
      href="/terms-and-condition"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#e20000", textDecoration: "none", fontFamily: 'Bricolage Grotesque, sans-serif' }}
    >
      Terms and Conditions
    </a>
    {", "}
    <a
      href="/privacy-policy"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#e20000", textDecoration: "none", fontFamily: 'Bricolage Grotesque, sans-serif' }}
    >
      Privacy Policy
    </a>
    {" and "}
    <a
      href="/refund-policy"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#e20000", textDecoration: "none", fontFamily: 'Bricolage Grotesque, sans-serif' }}
    >
      Refund Policy
    </a>.
  </span>
</Checkbox>

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
