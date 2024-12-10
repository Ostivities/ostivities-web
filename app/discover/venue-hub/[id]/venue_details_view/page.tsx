"use client";

import React, { useState } from "react";
import { Button, Rate } from "antd";
import Image from "next/image";
import EventDetailsComponent from "@/app/components/VenueHubDetails/VenueHubDetails"; // Assuming you have this component
import styles from "/app/VenueHubView.module.css"; // Custom CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faLink } from '@fortawesome/free-solid-svg-icons';
import { SocialIcon } from 'react-social-icons';

const VenueHubView = () => {
  const [imageUrl, setImageUrl] = useState("/images/2.jpeg"); // Default venue image
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [
    "/images/2.jpeg",
    "/images/3.jpeg",
    "/images/1.jpeg",
    "/images/4.jpg",
    "/images/3.jpeg",
    "/images/2.jpeg",
  ];

  const handleImageSelect = (index: number) => {
    setSelectedImage(index);
    setImageUrl(images[index]);
  };

  const venueStatus = "Available"; // Example status
  let style, dotColor;

  if (venueStatus === "Available") {
    style = { color: "#009A44", backgroundColor: "#E6F5ED" }; // Green
    dotColor = "#009A44";
  } else if (venueStatus === "Unavailable") {
    style = { color: "#D30000", backgroundColor: "#FFD3D3" }; // Red
    dotColor = "#D30000";
  }

  return (
    <EventDetailsComponent>
      <div className={`${styles.venueHubView} p-2`} style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
        {/* Venue Images and Details Section */}
        <div className={`${styles.venueSection} flex justify-between`}>

          {/* Left side: Image Gallery */}
          <div className={`${styles.venueImage} w-2/3`}>
            <div className="relative w-[560px] h-[400px] overflow-hidden rounded-[20px] shadow-md">
              <Image
                src={imageUrl}
                alt="Venue Image"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <br />
            <div className={`${styles.imageThumbnails} flex mt-2 space-x-2 overflow-x-auto`}>
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`${styles.thumbnail} w-[70px] h-[70px] cursor-pointer ${selectedImage === index ? "border-2 border-blue-500" : ""} rounded-[12px] overflow-hidden`}
                  onClick={() => handleImageSelect(index)}
                >
                  <Image
                    src={img}
                    alt={`Venue ${index}`}
                    width={70}
                    height={70}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div></div>


          {/* Right side: Venue Details */}
          <div className={`${styles.venueDetails} w-2/3 px-4`}>
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              High Point Event Centre & Suites
              <span
                style={{
                  ...style,
                  padding: "0px 15px", // Keep padding as 0
                  borderRadius: "50px", // Maintain border radius
                  fontWeight: "500",
                  display: "inline-flex", // Use flexbox to center content
                  alignItems: "center", // Vertically center content
                  justifyContent: "center", // Horizontally center content
                  minWidth: "80px", // Keep the same width
                  textAlign: "center",
                  marginLeft: "10px", // Space between the heading and status
                  height: "30px", // Optional: Control the exact height
                  lineHeight: "normal", // Reset line-height to default
                }}
              >
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: dotColor,
                    borderRadius: "50%",
                    display: "inline-block",
                    marginRight: "8px",
                  }}
                ></span>
                <span style={{ fontSize: "16px" }}>{venueStatus}</span> {/* Adjusted font size here */}
              </span>
            </h1>
            <div className="flex items-center mb-4">
              <Rate defaultValue={4.5} disabled /> <span className="ml-2">(12 Reviews)</span>
            </div>
            {/* <p className="text-2xl text-green-600 font-semibold mb-1">
              ₦3,500,000 <span className="text-sm font-normal text-gray-600">for a day</span>
            </p> */}

            <br />
            <Button
              href="https://highpointeventscentre.com"
              target="_blank"
              rel="noopener noreferrer"
              type="primary"
              shape="round"
              style={{
                borderRadius: "25px",
                backgroundColor: "#e20000",
                borderColor: "#e20000",
                minWidth: "150px",
                padding: "20px 10px", // Adjusted padding for increased height
                fontFamily: "Bricolage Grotesque", // Set the font
                fontSize: "16px", // Adjust font size as needed
              }}
            >
              Book Now
            </Button>
            <br /><br />
            <ul className="flex space-x-4 mt-4">
              <li>
                <SocialIcon url="https://www.facebook.com/yourprofile" target="_blank" style={{ height: 40, width: 40 }} />
              </li>
              <li>
                <SocialIcon url="https://www.instagram.com/highpointeventsikeja" target="_blank" style={{ height: 40, width: 40 }} />
              </li>
              <li>
                <SocialIcon url="https://highpointeventscentre.com" target="_blank" style={{ height: 40, width: 40 }} />
              </li>
              <li>
                <span className="flex items-center" style={{ color: "#e20000" }}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} style={{ height: 35, width: 35 }} />
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Lagos+State"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1"
                  >
                  </a>
                </span>
              </li>
            </ul>
            <br /><br />
            <h2 className="text-xl font-semibold mb-4">Details</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">

              <li className="flex items-start list-disc">
                <span className="mr-2">•</span>
                <span style={{ color: "#e20000" }}>State</span> - Lagos
              </li>

              <li className="flex items-start list-disc">
                <span className="mr-2">•</span>
                <span style={{ color: "#e20000" }}>Type</span> - Indoor
              </li>
              <li className="flex items-start list-disc">
                <span className="mr-2">•</span>
                <span style={{ color: "#e20000" }}>Capacity</span> - 1000 seats
              </li>
              {/* <li className="flex items-start list-disc">
                <span className="mr-2">•</span> Wi-Fi
              </li>
              <li className="flex items-start list-disc">
                <span className="mr-2">•</span> VIP Lounge
              </li> */}
            </ul>
            <br /><br />
            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
              <li className="flex items-start list-disc">
                <span className="mr-2">•</span> Parking Space
              </li>
              <li className="flex items-start list-disc">
                <span className="mr-2">•</span> Air Conditioning
              </li>
              <li className="flex items-start list-disc">
                <span className="mr-2">•</span> Stage & Sound System
              </li>
              <li className="flex items-start list-disc">
                <span className="mr-2">•</span> Wi-Fi
              </li>
              {/* <li className="flex items-start list-disc">
                <span className="mr-2">•</span> VIP Lounge
              </li> */}
            </ul>

          </div>
        </div>

        {/* Overview Section */}
        <div className={`${styles.overview} mt-8 p-4 bg-white rounded-lg`}>
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#e20000' }}>
            Overview
          </h2>

          <p className="text-[17px] leading-7">
            This spacious event hall is located in the heart of the city, making it easily accessible for your guests. It is perfect for weddings, conferences, and large gatherings, with seating for up to 500 guests. The venue includes all necessary amenities, such as high-quality audiovisual equipment, ample parking space, and on-site catering services.

            With its flexible layout, the hall can be configured to accommodate various event types, from formal dinners to casual receptions. The modern decor features elegant lighting and a beautiful stage area, creating a stunning backdrop for your special occasions.

            In addition, the venue offers dedicated staff to assist with event planning and coordination, ensuring a seamless experience from start to finish. Whether you&apos;re hosting a corporate event, a birthday celebration, or a community gathering, this event hall provides the perfect setting for unforgettable moments.
          </p>
        </div>

        {/* Reviews Section */}
        <div className={`${styles.reviews} mt-8 p-4 bg-white rounded-lg`}>
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#e20000' }}>
            Reviews
          </h2>

          <ul className="space-y-4">
            <li className="border-b pb-4">
              <p className="font-semibold text-lg">John Doe</p>
              <Rate defaultValue={5} disabled />
              <p className="mt-2 text-lg">&quot;Amazing venue! The staff were incredibly helpful, and the amenities exceeded our expectations.&quot;</p>
            </li>
            <li>
              <p className="font-semibold text-lg">Jane Smith</p>
              <Rate defaultValue={4} disabled />
              <p className="mt-2 text-lg">&quot;Great experience, but the Wi-Fi was a bit slow during our event.&quot;</p>
            </li>
          </ul>
        </div>
      </div>
    </EventDetailsComponent>
  );
};

export default VenueHubView;
