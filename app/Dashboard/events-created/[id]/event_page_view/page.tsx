"use client";
import React, { useState } from "react";
import { UploadChangeParam } from "antd/lib/upload";
import { Heading5, Paragraph } from "@/app/components/typography/Typography";
import useComponentDisabled from "@/app/hooks/utils/utils.hooks";
import { Button, Space, Upload } from "antd";
import Image from "next/image";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";

const EventPageView = () => {
  const [componentDisabled, setComponentDisabled] = useComponentDisabled();
  const [imageUrl, setImageUrl] = useState("/images/placeholder-6.png");
  const [buttonText, setButtonText] = useState("Update Image");
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const handleImageUpload = (info: UploadChangeParam<any>) => {
    if (info.file.status === 'done') {
      const url = URL.createObjectURL(info.file.originFileObj);
      setImageUrl(url);
      setButtonText("Save Changes");
      setIsImageUploaded(true);
    }
  };

  const handleSaveChanges = () => {
    // Implement the logic to save the image
    console.log("Image saved:", imageUrl);
    // After saving, you can reset the button text if needed
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
              "This is how your event page will appear. Upload your event image here (*Only JPEG & PNG Allowed & File size should not be more than 10MB)."
            }
            styles={{ fontWeight: "normal !important" }}
          />
        </Space>
        <div className="flex gap-12">
          <div className="relative w-[464px] h-[600px] rounded-[3.125rem] overflow-hidden">
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
            <h2 className="font-semibold text-2xl">About this event</h2>
            <div className="mt-12 flex flex-col gap-12">
              <div className="flex gap-3 items-center">
                <div className="bg-OWANBE_PRY/20 p-2 rounded-xl flex items-center justify-center">
                  <Image
                    src="/icons/calendar.svg"
                    alt=""
                    height={30}
                    width={30}
                  />
                </div>
                <div>
                  <div className="text-sm" style={{ fontWeight: 600 }}>Date</div>
                  <div>14 December, 2023</div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-OWANBE_PRY/20 p-2 rounded-xl flex items-center justify-center">
                  <Image src="/icons/time.svg" alt="" height={30} width={30} />
                </div>
                <div>
                  <div className="text-sm" style={{ fontWeight: 600 }}>Time</div>
                  <div>5:00PM - 10:00PM WAT</div>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="bg-OWANBE_PRY/20 p-2 rounded-xl flex items-center justify-center">
                  <Image
                    src="/icons/location.svg"
                    alt=""
                    height={30}
                    width={30}
                  />
                </div>
                <div>
                  <div className="text-sm" style={{ fontWeight: 600 }}>Location</div>
                  <div>3, Eko Hotel, Lagos</div>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <div className="bg-OWANBE_PRY/20 p-2 rounded-xl flex items-center justify-center">
                  <Image src="/icons/phone.svg" alt="" height={30} width={30} />
                </div>
                <div>
                  <div className="text-sm" style={{ fontWeight: 600 }}>Contact Us</div>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="bg-black w-6 h-6 rounded-full flex items-center justify-center">
                      <Image
                        src="/icons/instagram.svg"
                        alt=""
                        height={14}
                        width={14}
                      />
                    </div>
                    <div className="bg-black w-6 h-6 rounded-full flex items-center justify-center">
                      <Image src="/icons/x.svg" alt="" height={14} width={14} />
                    </div>
                    <div className="bg-black w-6 h-6 rounded-full flex items-center justify-center">
                      <Image
                        src="/icons/facebook.svg"
                        alt=""
                        height={10}
                        width={10}
                      />
                    </div>
                    <div className="bg-black w-6 h-6 rounded-full flex items-center justify-center">
                      <Image
                        src="/icons/youtube.svg"
                        alt=""
                        height={16}
                        width={16}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 h-fit my-auto border-l border-black px-10" style={{ marginTop: '150px' }}>
            <p>
            Join us for an unforgettable night of music and entertainment with Davido as he takes the stage at Eko Hotel and Suites. 
            Known for their electrifying performances and chart-topping hits, Davido will bring his unique music and energy to life 
            in a live concert experience you won&apos;t want to miss. Get ready to sing along to your favorite songs, enjoy breathtaking 
            live performances, and create lasting memories. Whether you&apos;re a long-time fan or new to his music, 
            this concert promises an exhilarating evening filled with passion, talent, and fun. Get your tickets 
            now and be part of a night to remember!
            </p>
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
                type="default"
                htmlType="button"
                size={"large"}
                disabled={false}
                className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold w-64"
                style={{
                  borderRadius: "16px",
                  fontFamily: "BricolageGrotesqueMedium",
                }}
              >
                {buttonText}
              </Button>
            </Upload>
          ) : (
            <Button
              type="default"
              htmlType="button"
              size={"large"}
              onClick={handleSaveChanges}
              className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold w-64"
              style={{
                borderRadius: "16px",
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
