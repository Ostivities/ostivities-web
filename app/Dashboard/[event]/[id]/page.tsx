'use client';

import DashboardLayout from '@/app/components/DashboardLayout/DashboardLayout';
import { Heading5 } from '@/app/components/typography/Typography';
import { Button, Dropdown, MenuProps, Space } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from "next/navigation";
import { IoChevronDown } from 'react-icons/io5';

const EventDetail = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const pathname = usePathname();
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    return e;
  };

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

<h1 style={{ fontSize: '24px' }}>Concert with Davido</h1>

    </div>
  );


  const RegistrationTypes: MenuProps["items"] = [
    {
      label: (
        <Link
          href={`/Dashboard/tickets`}
          className="font-BricolageGrotesqueRegular font-normal text-md text-OWANBE_DARK"
        >
          Register as a guest
        </Link>
      ),
      key: "1",
    },
    {
      label: (
        <Link
          href={`/Dashboard/vendorsregistration`}
          className="font-BricolageGrotesqueRegular font-normal text-md text-OWANBE_DARK"
        >
          Register as a vendor
        </Link>
      ),
      key: "2",
    },
  ];


  return (
    <DashboardLayout title={title} isLoggedIn>
      <section>
        <div className="flex gap-12">
          <div className="relative w-fit rounded-[3.125rem] overflow-hidden">
            <Image
              src="/images/placeholder-6.png"
              alt=""
              height={520} 
              width={390}
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
                  <div className="text-sm"style={{ fontWeight: 600 }}>Date</div>
                  <div>14 December, 2023</div> 
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-OWANBE_PRY/20 p-2 rounded-xl flex-center justify-center">
                  <Image src="/icons/time.svg" alt="" height={25}
                      width={25} />
                </div>
                <div>
                  <div className="text-sm"style={{ fontWeight: 600 }}>Time</div>
                  <div>5:00PM - 10:00PM WAT</div>
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
                  <div className="text-sm" style={{ fontWeight: 600 }}>Host</div>
                  <div>
                  <div>Onome Rose</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-OWANBE_PRY/20 p-2 rounded-xl flex-center justify-center">
                  <Image src="/icons/phone.svg" alt="" height={25}
                      width={25} />
                </div>
                <div>
                  <div className="text-sm"style={{ fontWeight: 600 }}>Contact Us</div>
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
            Join us for an unforgettable night of music and entertainment with Davido as he takes the stage at Eko Hotel and Suites. 
            Known for their electrifying performances and chart-topping hits, Davido will bring his unique music and energy to life 
            in a live concert experience you won&apos;t want to miss. Get ready to sing along to your favorite songs, enjoy breathtaking 
            live performances, and create lasting memories. Whether you&apos;re a long-time fan or new to his music, 
            this concert promises an exhilarating evening filled with passion, talent, and fun. Get your tickets 
            now and be part of a night to remember!
            </p>
            <div className="flex justify-center mt-12">
              
            <Dropdown menu={{ items: RegistrationTypes, onClick: handleMenuClick }}>
  <Button
    type={pathname.includes("register") ? "primary" : "text"}
    className="primary-btn w-full"
    style={{
      borderRadius: "25px",
      fontFamily: "BricolageGrotesqueMedium",
      backgroundColor: "#e20000", // Button color
      color: "white", // Text color
      height: "50px", // Adjust height as needed
      fontSize: "16px", // Increase text size
      border: "none", // Remove border if needed
    }}
  >
    <Space>
      Register
      <IoChevronDown />
    </Space>
  </Button>
</Dropdown>

            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default EventDetail;
