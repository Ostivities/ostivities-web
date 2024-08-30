'use client';

import { useState } from 'react';
import DashboardLayout from '@/app/components/DashboardLayout/DashboardLayout';
import Summary from '@/app/components/Discovery/Summary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import "@/app/globals.css";
import "@/app/scroll.css";

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

  // Define ticket types and their details
  const ticketTypes = [
    { name: "Early Bird", price: "₦5,000", fee: "₦300", description: "Your pass to sweet music and ambiance" },
    { name: "VIP Access", price: "₦15,000", fee: "₦500", description: "Enjoy premium benefits and services" },
    { name: "Group Of 5- Regular", price: "₦22,000", fee: "", description: "Regular price for group of 5 tickets" },
  ];

  // State to manage selected ticket counts
  const [selectedTickets, setSelectedTickets] = useState([0, 0, 0]);

  // Function to handle ticket increment
  const handleIncrement = (index: number) => {
    setSelectedTickets((prevTickets) =>
      prevTickets.map((count, i) => (i === index ? count + 1 : count))
    );
  };

  // Function to handle ticket decrement
  const handleDecrement = (index: number) => {
    setSelectedTickets((prevTickets) =>
      prevTickets.map((count, i) => (i === index && count > 0 ? count - 1 : count))
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
              Choose one or more tickets and prepare for an extraordinary experience!
            </h3>
          </div>
          {/* Add Single Ticket Button before the first ticket */}
          {/* <div className="mb-4">
            <button
              className="bg-OWANBE_PRY text-white px-3 py-2 rounded-md text-sm font-BricolageGrotesqueMedium"
              style={{ borderRadius: '20px', fontSize: '12px' }} // Adjusted text size
            >
              Single Ticket
            </button>
          </div> */}
          
          <div className="mt-10 flex flex-col gap-6">
            {ticketTypes.map((ticket, index) => (
              <div key={index}>
                {/* Add Group Ticket Header Button before the third ticket */}
                {index === 2 && (
                  <div className="mb-4">
                    <button
                      className="bg-OWANBE_PRY text-white px-3 py-1 rounded-md text-sm font-BricolageGrotesqueMedium"
                      style={{ borderRadius: '20px', fontSize: '12px' }} // Adjusted text size
                    >
                      Collective Ticket
                    </button>
                  </div>
                )}
                <div className="card-shadow flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-BricolageGrotesqueMedium" style={{ fontWeight: 500, fontSize: '18px' }}>{ticket.name}</h2>
                    <h3>
                      <span className="text-OWANBE_PRY text-xl font-BricolageGrotesqueRegular" style={{ fontWeight: 600, fontSize: '17px' }}>{ticket.price}</span>{' '}
                      {ticket.fee && (
                        <span className="text-s font-BricolageGrotesqueRegular" style={{ fontWeight: 400, fontSize: '12px' }}>Including {ticket.fee} fee</span>
                      )}
                    </h3>
                    <p className="text-s font-BricolageGrotesqueRegular" style={{ fontSize: '12px', color: 'black', marginTop: '17px' }}>
                      {ticket.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="w-8 h-8 flex-center justify-center bg-gray-200 rounded-full text-lg font-bold"
                      onClick={() => handleDecrement(index)}
                      disabled={selectedTickets[index] === 0}
                      style={{ backgroundColor: '#FADEDE' }}
                    >
                      -
                    </button>
                    <span className="text-lg mx-2">{selectedTickets[index]}</span>
                    <button
                      className="w-8 h-8 flex-center justify-center rounded-full text-lg font-bold"
                      onClick={() => handleIncrement(index)}
                      style={{ color: '#e20000', backgroundColor: '#FADEDE' }}
                    >
                      +
                    </button>
                  </div>
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
