'use client';

import { useState } from 'react'; // Import useState hook
import DashboardLayout from '@/app/components/DashboardLayout/DashboardLayout';
import Summary from '@/app/components/Discovery/Summary';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { global } from "styled-jsx/css";
import "@/app/globals.css";

const TicketsSelection = () => {
  const router = useRouter();
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
      <h1 style={{ fontSize: '24px' }}>Choose your tickets</h1>
    </div>
  );

  const remainingTickets = [8, 5]; // Example remaining tickets for each type

  // State to manage selected ticket counts
  const [selectedTickets, setSelectedTickets] = useState(Array.from({ length: remainingTickets.length }, () => 0));

  // Function to handle change in ticket selection
  const handleTicketChange = (index: number, value: number) => {
    const newSelectedTickets = [...selectedTickets];
    newSelectedTickets[index] = value;
    setSelectedTickets(newSelectedTickets);
  };

  return (
    <DashboardLayout title={title} isLoggedIn>
      <section className="flex gap-12">
        <section className="flex-1 pr-17">
          <div className="flex-center justify-between">
            <div className="flex-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-OWANBE_PRY/10 flex-center justify-center">
                <Image
                  src="/icons/calendar.svg"
                  alt=""
                  height={25}
                  width={25}
                />
              </div>
              <div>
                <h3 className="text-sm" style={{ fontWeight: 600 }}>Date</h3>
                <span>14 December, 2023</span>
              </div>
            </div>
            <div className="flex-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-OWANBE_PRY/10 flex-center justify-center">
                <Image src="/icons/time.svg" alt="" height={25} width={25} />
              </div>
              <div>
                <h3 className="text-sm" style={{ fontWeight: 600 }}>Time</h3>
                <span>5:00PM - 10:00PM WAT</span>
              </div>
            </div>
          </div>

          <div className="pr-full mt-16">
          <h3 className="text-OWANBE_FADE text-md font-BricolageGrotesqueMedium my-4 custom-font-size">
          Choose one or more tickets and prepare for an extraordinary experience!</h3>
          </div>
          
          <div className="mt-10 flex flex-col gap-6">
            {remainingTickets.map((remaining, index) => (
              <div key={index} className="card-shadow flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-BricolageGrotesqueMedium" style={{ fontWeight: 500, fontSize: '18px' }}>Early Bird</h2>
                  <h3>
                    <span className="text-OWANBE_PRY text-xl font-BricolageGrotesqueRegular" style={{ fontWeight: 600, fontSize: '17px' }}>₦5,000</span>{' '}
                    <span className="text-s font-BricolageGrotesqueRegular"style={{ fontWeight: 400, fontSize: '12px' }}>Including ₦300 fee</span>
                  </h3>
                  <p className="text-s font-BricolageGrotesqueRegular" style={{ fontSize: '12px', color: 'black', marginTop: '17px' }}>
                    Your pass to sweet music and ambiance
                  </p>
                </div>
                <div className="flex items-center">
                  <select
                    name={`amount-${index}`}
                    id={`amount-${index}`}
                    className="px-2 py-0.5 border-[0.5px] border-[#525252] rounded-md w-16 bg-white text-lg"
                    value={selectedTickets[index]}
                    onChange={(e) => handleTicketChange(index, parseInt(e.target.value))}
                    required
                  >
                    <option value="0">0</option>
                    {Array.from({ length: remaining }, (_, optionIndex) => (
                      <option key={optionIndex + 1} value={optionIndex + 1}>
                        {optionIndex + 1}
                      </option>
                    ))}
                  </select>
                  <span className="ml-2" style={{ fontSize: '12px', color: 'grey' }}>
                    {remaining} remaining
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
        <Summary continueBtn to={"/Dashboard/contact-form"} />
      </section>
    </DashboardLayout>
  );
};

export default TicketsSelection;

