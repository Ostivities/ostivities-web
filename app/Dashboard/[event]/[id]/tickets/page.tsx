'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/app/components/DashboardLayout/DashboardLayout';
import Summary from '@/app/components/Discovery/Summary';
import Image from 'next/image';
import { ITicketCreate, ITicketDetails, SalesDataType } from "@/app/utils/interface";
import { useGetEventTickets } from "@/app/hooks/ticket/ticket.hook";
import { useRouter, useParams } from 'next/navigation';
import { useGetUserEvent } from "@/app/hooks/event/event.hook";
import { dateFormat, timeFormat } from "@/app/utils/helper";
import "@/app/globals.css";
import "@/app/scroll.css";
import ReadMoreHTML from '@/app/components/ReadMoreHTML';

const TicketsSelection = () => {
  const router = useRouter();
  const params = useParams<{ event: string; id: string }>();
  const { getUserEvent } = useGetUserEvent(params?.id);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalFee, setTotalFee] = useState(0);
  const eventDetails = getUserEvent?.data?.data?.data;
  const { getTickets } = useGetEventTickets(params?.id);
  const ticketData = getTickets?.data?.data?.data;

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
  const [selectedTickets, setSelectedTickets] = useState<number[]>(
    new Array(ticketData?.length).fill(0)
  );
  // const [we, setWe] = useState<number[]>(
  //   new Array(ticketData?.length || 0).fill(0)
  // );
  console.log(selectedTickets, "selectedTickets")
  const [ticketDetails, setTicketDetails] = useState<{
    ticketName: string;
    ticketPrice: number;
    ticketFee: number;
    ticketNumber: number;
  }[]>([]);

  console.log(ticketDetails, "ticketDetails");

  useEffect(() => {
    // When ticketData is updated, re-initialize selectedTickets
    if (ticketData?.length) {
      setSelectedTickets(new Array(ticketData.length).fill(0));
    }
  }, [ticketData]);

  // Function to handle ticket increment
  const handleIncrement = (index: number) => {
    setTicketDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index] = {
        ticketName: ticketData[index]?.ticketName,
        ticketPrice: ticketData[index]?.ticketPrice,
        ticketFee: ticketData[index]?.ticketPrice,
        ticketNumber: selectedTickets[index] + 1,
      };
      return updatedDetails;
    });
    setSelectedTickets((prevTickets) =>
      prevTickets.map((count: number, i: number) => (i === index ? count + 1 : count))
    );
  };

  // Function to handle ticket decrement
  const handleDecrement = (index: number) => {
    setTicketDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index] = {
        ticketName: ticketData[index]?.ticketName,
        ticketPrice: ticketData[index]?.ticketPrice,
        ticketFee: ticketData[index]?.ticketPrice,
        ticketNumber: selectedTickets[index] - 1,
      };
      return updatedDetails;
    });
    setSelectedTickets((prevTickets) =>
      prevTickets.map((count, i) => (i === index && count > 0 ? count - 1 : count))
    );
  };

  return (
    <DashboardLayout title={title} isLoggedIn>
      <section className="flex gap-12">
        {/* Scrollable content container */}
        <section className="flex-1 pr-1 pl-3 pb-4 scrollable-content shadow-none">
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
                <span>{dateFormat(eventDetails?.startDate)}</span>
              </div>
            </div>
            <div className="flex-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-OWANBE_PRY/10 flex-center justify-center">
                <Image src="/icons/time.svg" alt="" height={25} width={25} />
              </div>
              <div>
                <h3 className="text-sm" style={{ fontWeight: 600 }}>Time</h3>
                <span>
                  {timeFormat(eventDetails?.startDate)} -{" "}
                  {timeFormat(eventDetails?.endDate)} {eventDetails?.timeZone}
                </span>
              </div>
            </div>
          </div>

          <div className="pr-full mt-16">
            <h3 className="text-OWANBE_FADE text-md font-BricolageGrotesqueMedium my-8 custom-font-size">
              Choose one or more tickets and prepare for an extraordinary experience!
            </h3>
          </div>
          {/* Add Single Ticket Button before the first ticket */}
          <div className="mb-4">
            <button
              className="bg-OWANBE_PRY text-white px-3 py-1 rounded-md text-sm font-BricolageGrotesqueMedium"
              style={{ borderRadius: '20px', fontSize: '12px' }} // Adjusted text size
            >
              Single Ticket
            </button>
          </div>

          <div className="mt-5 flex flex-col gap-6">
            {ticketData?.map((ticket: ITicketDetails, index: any) => (
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
                <div className="card-shadow flex justify-between items-start">
                  <div>
                    {ticket?.groupSize ? (
                      <h2 className="text-lg font-BricolageGrotesqueMedium" style={{ fontWeight: 500, fontSize: '18px' }}>Group Of {ticket?.groupSize} - {ticket.ticketName}</h2>

                    ) : (
                      <h2 className="text-lg font-BricolageGrotesqueMedium" style={{ fontWeight: 500, fontSize: '18px' }}>{ticket.ticketName}</h2>

                    )}
                    <h3>
                      {ticket.ticketPrice ?
                        (
                          <>
                            {ticket.groupPrice ? (
                              <>
                                <span className="text-OWANBE_PRY text-xl font-BricolageGrotesqueRegular" style={{ fontWeight: 600, fontSize: '17px' }}>₦{ticket.groupPrice.toLocaleString()}</span>{' '}
                                <span className="text-s font-BricolageGrotesqueRegular" style={{ fontWeight: 400, fontSize: '12px' }}>Including ₦{ticket.groupPrice.toLocaleString()} fee</span>
                              </>
                            ) : (
                              <>
                                <span className="text-OWANBE_PRY text-xl font-BricolageGrotesqueRegular" style={{ fontWeight: 600, fontSize: '17px' }}>₦{ticket.ticketPrice.toLocaleString()}</span>{' '}
                                <span className="text-s font-BricolageGrotesqueRegular" style={{ fontWeight: 400, fontSize: '12px' }}>Including ₦{ticket.ticketPrice.toLocaleString()} fee</span>
                              </>
                            )}
                          </>
                        ) : (
                          <span className="text-OWANBE_PRY text-xl font-BricolageGrotesqueRegular" style={{ fontWeight: 600, fontSize: '17px' }}>Free</span>
                        )
                      }
                    </h3>
                    <p className="text-s font-BricolageGrotesqueRegular" style={{ fontSize: '13px', color: 'black', marginTop: '17px' }}>
                      <ReadMoreHTML
                        htmlContent={ticket.ticketDescription || ""}
                        maxLength={100}
                      />
                    </p>

                  </div>
                  <div className="flex items-start gap-2" style={{ marginBlockStart: '10px' }}>
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
        <Summary eventName={eventDetails?.eventName} ticketDetails={ticketDetails} continueBtn to={`/Dashboard/${params?.event}/${params?.id}/contact-form`} />
      </section>
    </DashboardLayout>
  );
};

export default TicketsSelection;
