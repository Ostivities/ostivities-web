"use client";
import DashboardLayout from '@/app/components/DashboardLayout/DashboardLayout';
import { Button } from 'antd';
import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Heading5 } from '../components/typography/Typography';
import PublishSuccess from '@/app/components/OstivitiesModal/PublishSuccessModal';
import CantPublish from '@/app/components/OstivitiesModal/CantPublishModal';
import { useState } from 'react';
import React from 'react';

export default function PublishEvent(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();
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
      <h1 style={{ fontSize: '24px' }}>Publish your event</h1>
    </div>
  );

  return (
    <React.Fragment>
      <DashboardLayout title={title} isLoggedIn>
        <section>
          <div className="flex gap-12">
            <div className="relative w-fit rounded-[3.125rem] overflow-hidden">
              <Image
                src="/images/placeholder-6.png"
                alt=""
                height={520} 
                width={370}
                className=""
              />
              <div className="absolute inset-0 bg-image-card"></div>
            </div>
            <div className="py-8">
              <Heading5 className="text-2xl" content={"About this event"} />
              <div className="mt-14 flex flex-col gap-8"> 
                <div className="flex gap-3">
                  <div className="bg-OWANBE_PRY/20 p-2 rounded-xl flex-center justify-center">
                    <Image
                      src="/icons/calendar.svg"
                      alt=""
                      height={25}
                      width={25}
                    />
                  </div>
                  <div>
                    <div className="text-sm" style={{ fontWeight: 600 }}>
                      Date
                    </div>
                    <div>14 December, 2023</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-OWANBE_PRY/20 p-2 rounded-xl flex-center justify-center">
                    <Image src="/icons/time.svg" alt="" height={25}
                      width={25} />
                  </div>
                  <div>
                    <div className="text-sm" style={{ fontWeight: 600 }}>
                      Time
                    </div>
                    <div>5PM - 10PM WAT</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-OWANBE_PRY/20 p-2 rounded-xl flex-center justify-center">
                    <Image
                      src="/icons/location.svg"
                      alt=""
                      height={25}
                      width={25}
                    />
                  </div>
                  <div>
                  <div className="text-sm" style={{ fontWeight: 600 }}>Location</div>
<div style={{ width: '190px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
  <a 
    href="https://maps.app.goo.gl/jBmgQ5EFxngj2ffS6" 
    style={{ color: "#e20000", textDecoration: "none" }} 
    target="_blank"
  >
    Muri Okunola Park, Victoria Island, Lagos State, Nigeria
  </a>
</div>
                  </div>
                </div>

                
                <div className="flex gap-3">
                  <div className="bg-OWANBE_PRY/20 p-2 rounded-xl flex-center justify-center">
                    <Image
                      src="/icons/host.svg"
                      alt=""
                      height={25}
                      width={25}
                    />
                  </div>
                  <div>
                    <div className="text-sm" style={{ fontWeight: 600 }}>
                      Host
                    </div>
                    <div>Onome Rose</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="bg-OWANBE_PRY/20 p-2 rounded-xl flex-center justify-center">
                    <Image src="/icons/phone.svg" alt="" height={25}
                      width={25} />
                  </div>
                  <div>
                    <div className="text-sm" style={{ fontWeight: 600 }}>
                      Contact Us
                    </div>
                    <div className="flex-center gap-4 mt-1">
                      <div className="bg-black w-6 h-6 rounded-full flex-center justify-center">
                      <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="bg-black w-6 h-6 rounded-full flex-center justify-center">
                    <Image
                      src="/icons/link.svg"
                      alt=""
                      height={14}
                      width={14}
                    /></a>
                  </div>
                  <div className="bg-black w-6 h-6 rounded-full flex items-center justify-center">
                  <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="bg-black w-6 h-6 rounded-full flex-center justify-center">
                    <Image 
                    src="/icons/x.svg" 
                    alt="" 
                    height={14} 
                    width={14} 
                    /></a>
                  </div>
                  <div className="bg-black w-6 h-6 rounded-full flex items-center justify-center">
                  <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="bg-black w-6 h-6 rounded-full flex-center justify-center">
                    <Image
                      src="/icons/facebook.svg"
                      alt=""
                      height={10}
                      width={10}
                    /></a>
                  </div>
                  <div className="bg-black w-6 h-6 rounded-full flex items-center justify-center">
                  <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="bg-black w-6 h-6 rounded-full flex-center justify-center">
                    <Image
                      src="/icons/instagram.svg"
                      alt=""
                      height={16}
                      width={16}
                    /></a>
                      </div>
                    </div>
                  </div> 
                </div>
              </div>
            </div>
            <div className="font-BricolageGrotesqueRegular flex-1 h-fit my-auto border-l border-black px-6"> 
            <div className="py-8">
  <div className="border rounded-lg p-3 bg-white card-shadow flex justify-between">
    <h2 className="text-2xl font-BricolageGrotesqueMedium">
      Concert with Davido
    </h2>
  </div>
</div>
              <p>
                Join us for an unforgettable night of music and entertainment
                with Davido as he takes the stage at Eko Hotel and Suites.
                Known for his electrifying performances and chart-topping hits,
                Davido will bring his unique music and energy to life in a live
                concert experience you won&apos;t want to miss. Get ready to
                sing along to your favorite songs, enjoy breathtaking live
                performances, and create lasting memories. Whether you&apos;re
                a long-time fan or new to his music, this concert promises an
                exhilarating evening filled with passion, talent, and fun. Get
                your tickets now and be part of a night to remember!
              </p>
              <div className="flex justify-center mt-12">
              

                <Button
                  type="primary"
                  size={"large"}
                   className="w-full rounded-full bg-OWANBE_PRY px-24 py-3 text-white text-l font-bold"
                  style={{
                    borderRadius: '25px',
                    fontFamily: 'BricolageGrotesqueMedium',
                    float: 'right',
                  }}
                  onClick={() => setIsModalOpen(true)}
                >
                  Publish Event
                </Button>
              </div>
            </div>
          </div>
        </section>
      </DashboardLayout>

      {/* Modal for Publish Success */}
      {isModalOpen && (
        <PublishSuccess
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </React.Fragment>
  );
}
