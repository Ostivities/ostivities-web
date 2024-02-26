'use client';

import DashboardLayout from '@/app/components/DashboardLayout/DashboardLayout';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Tickets = () => {
  const router = useRouter();
  const title = (
    <div className="flex-center gap-2">
      <Image
        src="/icons/back-arrow.svg"
        alt=""
        height={30}
        width={30}
        onClick={() => router.back()}
        className="cursor-pointer"
      />

      <h1>Choose your Tickets</h1>
    </div>
  );

  return (
    <DashboardLayout title={title}>
      <section className="flex gap-12">
        <section className="flex-1 pr-16">
          <div className="flex-center justify-between">
            <div className="flex-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-OWANBE_PRY/10 flex-center justify-center">
                <Image
                  src="/icons/calendar.svg"
                  alt=""
                  height={30}
                  width={30}
                />
              </div>
              <div>
                <h3 className="text-xs">Date</h3>
                <span>14 December, 2023</span>
              </div>
            </div>
            <div className="flex-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-OWANBE_PRY/10 flex-center justify-center">
                <Image src="/icons/time.svg" alt="" height={30} width={30} />
              </div>
              <div>
                <h3 className="text-xs">Time</h3>
                <span>5:00PM - 10:00PM WAT</span>
              </div>
            </div>
          </div>
          <div className=" mt-7 flex flex-col gap-6">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className=" shadow-ticket-card rounded-[0.9375rem] px-5 py-5 flex justify-between items-start"
              >
                <div>
                  <h2 className=" text-OWANBE_PRY text-lg">Early Bird</h2>
                  <h3>
                    <span className=" text-OWANBE_PRY text-sm">#5,000</span>{' '}
                    Including #300 fee
                  </h3>
                  <p className=" text-ss mt-4">
                    lorem ipsum dolor sit amet, consectetur adicing elit. Fusce
                    dapibus arcu id dui cursus{' '}
                  </p>
                </div>
                <select
                  name="amount"
                  id=""
                  className=" px-2 py-1 border-[0.5px] border-[#525252] rounded-md w-16 bg-white text-lg"
                >
                  <option value="0">0</option>
                  {Array.from({ length: 10 }, (_, index) => (
                    <option key={index} value={String(index + 1)}>
                      {String(index + 1)}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </section>
        <section className="flex-1">
          <h2 className=" text-3xl text-center">Summary</h2>
          <section className=" mt-20 px-20 border-l border-[#525252]">
            <div>
              <h3 className=" text-OWANBE_PRY text-xl">Event</h3>
              <span className="text-OWANBE_FADE">Concert with Davido</span>
            </div>
            <div>
              <div className=" mt-3 border-b border-[#525252] pb-10">
                <h3 className=" text-OWANBE_PRY text-xl">Payment details</h3>
                <div className="flex flex-col gap-2 mt-2 text-OWANBE_FADE">
                  <div className="flex-center justify-between">
                    <div>Tickets fee x 2 - Early Bird</div>
                    <div>#10,000.00</div>
                  </div>
                  <div className="flex-center justify-between">
                    <div>Fees</div>
                    <div>#300.00</div>
                  </div>
                  <div className="flex-center justify-between">
                    <div>Subtotal</div>
                    <div>#10,300.00</div>
                  </div>
                </div>
              </div>
              <div className="flex-center justify-between font-semibold text-2xl text-OWANBE_PRY my-6">
                <div>Total</div>
                <div>#10,300.00</div>
              </div>
              <div className="flex justify-center mt-12 mb-6">
                <Link
                  href="/Dashboard/tickets"
                  className="rounded-full bg-OWANBE_PRY px-24 py-2 text-white text-xl font-bold"
                >
                  Continue
                </Link>
              </div>
            </div>
          </section>
        </section>
      </section>
    </DashboardLayout>
  );
};

export default Tickets;
