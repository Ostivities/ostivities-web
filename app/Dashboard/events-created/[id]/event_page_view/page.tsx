"use client";
import React, { useState } from "react";
import { UploadChangeParam } from "antd/lib/upload";
import { Heading5, Paragraph } from "@/app/components/typography/Typography";
import useComponentDisabled from "@/app/hooks/utils/utils.hooks";
import { Button, message, Space, Upload } from "antd";
import Image from "next/image";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";

const EventPageView = () => {
  const [componentDisabled, setComponentDisabled] = useComponentDisabled();
  const [imageUrl, setImageUrl] = useState("/images/emptyimage2.png");
  const [buttonText, setButtonText] = useState("Update Image");
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const handleImageUpload = (info: UploadChangeParam<any>) => {
    const { file } = info;

    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt10M = file.size / 1024 / 1024 < 10;

    if (!isJpgOrPng) {
      message.error('You can only upload JPEG or PNG files!');
      return false;
    }
    if (!isLt10M) {
      message.error('Image must be smaller than 10MB!');
      return false;
    }
    if (info.file.status === 'done') {
      const url = URL.createObjectURL(info.file.originFileObj);
      setImageUrl(url);
      setButtonText("Save Changes");
      setIsImageUploaded(true);
      message.success(`${info.file.name} Event Image Updated successfully`);
    }
  };

  const handleSaveChanges = () => {
    console.log("Image saved:", imageUrl);
    setButtonText("Update Image");
    setIsImageUploaded(false);
  };

  return (
    <EventDetailsComponent>
      <Space direction="vertical" size={"large"}>
        <Space direction="vertical" size={"small"}>
          <Heading5 className="" content={"Event Page Appearance "} />
          <Paragraph
            className="text-OWANBE_PRY text-sm font-normal font-BricolageGrotesqueRegular"
            content={
              "This is how your event page will appear. Upload/Update your event image here by clicking the update image button."
            }
            styles={{ fontWeight: "normal !important" }}
          />
        </Space>
        <div className="flex gap-12">
          <div className="relative w-[390px] h-[520px] rounded-[3.125rem] overflow-hidden">
            <Image
              src={imageUrl}
              alt="Event Image"
              fill
              style={{ objectFit: "cover" }}
              className=""
            />
            <div className="absolute inset-0 bg-image-card"></div>
          </div>
          <div className="py-8">
            <Heading5 className="text-2xl" content={"About this event"} /> 
            <div className="mt-12 flex flex-col gap-8">
              {/* Date */}
              <div className="flex gap-3 items-center">
                <div className="bg-OWANBE_PRY/20 p-2 rounded-xl flex items-center justify-center">
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
          </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          {!isImageUploaded ? (
            <Upload
              name="image"
              listType="picture"
              className="upload-list-inline"
              showUploadList={false}
              onChange={handleImageUpload}
            >
              <Button
                type="primary"
                htmlType="button"
                size={"large"}
                disabled={false}
                className="primary-btn w-60"
                style={{
                  borderRadius: "20px",
                  fontFamily: "BricolageGrotesqueMedium",
                }}
              >
                {buttonText}
              </Button>
            </Upload>
          ) : (
            <Button
              type="primary"
              htmlType="button"
              size={"large"}
              onClick={handleSaveChanges}
              className="primary-btn w-60"
              style={{
                borderRadius: "20px",
                fontFamily: "BricolageGrotesqueMedium",
              }}
            >
              {buttonText}
            </Button>
          )}
        </div>
      </Space>
    </EventDetailsComponent>
  );
};

export default EventPageView;
