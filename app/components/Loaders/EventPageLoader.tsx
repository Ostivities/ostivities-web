import { Skeleton } from "antd";

const EventPageLoader = () => {
  return (
    <Skeleton.Button
      active
      className="relative w-full h-full rounded-[2.5rem]"
      shape="round"
      style={{
        height: "100%",
        width: "100%",
        margin: "6px",
        maxWidth: "100%",
      }}
    />
  );
};

export default EventPageLoader;

