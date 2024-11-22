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
        height: "100%",
        margin: "6px",
        maxWidth: "100%",
      }}
    />
  </div>

  {/* Second Skeleton */}
  <div className=" flex flex-col py-8" style={{ maxWidth: "21%", height: "100%" }}>
    <Skeleton avatar paragraph={{ rows: 3 }}
      active
      style={{
        width: "200px",
        margin: "10px",
        maxWidth: "100%",
      }}
    />
    <Skeleton avatar paragraph={{ rows: 3 }}
      active
      style={{
        width: "200px",
        margin: "10px",
        maxWidth: "100%",
      }}
    />
    <Skeleton avatar paragraph={{ rows: 3 }}
      active
      style={{
        width: "200px",
        margin: "10px",
        maxWidth: "100%",
      }}
    />
    <Skeleton avatar paragraph={{ rows: 3 }}
      active
      style={{
        width: "200px",
        margin: "10px",
        maxWidth: "100%",
      }}
    />
  </div>

  {/* Last Skeleton */}
  <div
    style={{ minWidth: "45%", height: "100%" }}
    className="font-BricolageGrotesqueRegular flex-1 h-fit my-auto border-l pl-6"
  >
    <Skeleton.Button
      active
      className="relative w-full md:w-[400px] lg:w-[500px] h-[520px] rounded-[2.5rem]"
      shape="round"
      style={{
        height: "100%",
        maxWidth: "100%",
      }}
    />
  </div>
</div>
  );
};

export default EventPageLoader;
