'use client';

import { useState } from 'react'; // Import useState hook
import DashboardLayout from '@/app/components/DashboardLayout/DashboardLayout';
import Summary from '@/app/components/Discovery/VendorsSummary';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { global } from "styled-jsx/css";
import "@/app/globals.css";

const SpaceSelection = () => {
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
      <h1 style={{ fontSize: '24px' }}>Select exhibition space slot</h1>
    </div>
  );

  // State to manage selected space counts
  const [selectedSpace, setSelectedSpace] = useState([0, 0]);

  // Function to handle space increment
  const handleIncrement = (index: number) => {
    setSelectedSpace((prevSpace) =>
      prevSpace.map((count, i) => (i === index ? count + 1 : count))
    );
  };

  // Function to handle space decrement
  const handleDecrement = (index: number) => {
    setSelectedSpace((prevSpace) =>
      prevSpace.map((count, i) => (i === index && count > 0 ? count - 1 : count))
    );
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
          Select how many exhibition space slot you want and display your products with confidence!</h3>
          </div>
          
          <div className="mt-10 flex flex-col gap-6">
            {selectedSpace.map((_, index) => (
              <div key={index} className="card-shadow flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-BricolageGrotesqueMedium" style={{ fontWeight: 500, fontSize: '18px' }}>Exhibition Space</h2>
                  <h3>
                    <span className="text-OWANBE_PRY text-xl font-BricolageGrotesqueRegular" style={{ fontWeight: 600, fontSize: '17px' }}>₦25,000</span>{' '}
                    <span className="text-s font-BricolageGrotesqueRegular"style={{ fontWeight: 400, fontSize: '12px' }}>Including ₦300 fee</span>
                  </h3>
                  
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="w-8 h-8 flex-center justify-center bg-gray-200 rounded-full text-lg font-bold"
                    onClick={() => handleDecrement(index)}
                    disabled={selectedSpace[index] === 0}
                    style={{ backgroundColor: '#FADEDE' }}
                  >
                    -
                  </button>
                  <span className="text-lg mx-2">{selectedSpace[index]}</span>
                  <button
                    className="w-8 h-8 flex-center justify-center rounded-full text-lg font-bold"
                    onClick={() => handleIncrement(index)}
                    style={{color: '#e20000', backgroundColor: '#FADEDE' }}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        <Summary continueBtn to={"/Dashboard/vendorspayment"} />
      </section>
    </DashboardLayout>
  );
};

export default SpaceSelection;

