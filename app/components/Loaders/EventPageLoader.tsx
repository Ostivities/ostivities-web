import { Skeleton } from "antd";
import React from "react";

const EventPageLoader = () => {
  return (
<div className="hidden w-full min-[870px]:flex gap-10 md:flex-row">
  {/* First Skeleton */}
  <div className="w-full md:w-[400px] h-[520px] rounded-[3.125rem]">
    <Skeleton.Button
      active
      className="relative w-full md:w-[400px] lg:w-[500px] h-[520px] rounded-[2.5rem]"
      shape="round"
      style={{
        width: "400px",
        height: "520px",
        margin: "6px",
        maxWidth: "100%",
      }}
    />
  </div>

   {/* Second Skeleton */}
   <div className="flex flex-col py-8 gap-3">
        {[...Array(5)].map((_, index) => (
          <Skeleton
            key={index}
            avatar
            paragraph={{ rows: 1 }}
            active
            style={{
              width: "250px",
              margin: "10px 0",
            }}
          />
        ))}
      </div>

      {/* Last Skeleton */}
      <div className="flex-1 h-[520px] rounded-[2.5rem] border-l pl-6 mt-8">
          {[...Array(4)].map((_, index) => (
          <Skeleton
            key={index}
            paragraph={{ rows: 1 }}
            active
            style={{
              width: "700px",
              margin: "50px 0",
            }}
        />
      ))}
        </div>
    </div>
  );
};

export default EventPageLoader;
