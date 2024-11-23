import { Skeleton } from "antd";
import React from "react";

const EventPageLoader = () => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-10">
      {/* First Skeleton */}
      <div className="w-full md:w-[400px] h-[520px] rounded-[3.125rem]">
        <Skeleton.Button
          active
          shape="round"
          className="w-full h-full rounded-[2.5rem]"
          style={{
            width: "400px",
            height: "520px",
            margin: "6px",
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
