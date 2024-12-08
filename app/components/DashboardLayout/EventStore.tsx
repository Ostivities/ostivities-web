import OtherInfoCard from "./OtherInfoCard";
import { Skeleton } from "antd";
import EventSection from "./OtherEventSection";
import { useGetDiscoveryEvents } from "@/app/hooks/event/event.hook";
import { useParams, usePathname } from "next/navigation";
import { IEventDetails } from "@/app/utils/interface";
import placeholder from "@/public/placeholder.svg";
import InfoCardM from "./OtherInfoCard2";

const DiscoverEvents = () => {
  const params = useParams<{ event: string }>();
  const pathname = usePathname();

  const lastPath = pathname?.split("/").pop();

  const { getDiscoveryEvents } = useGetDiscoveryEvents(1, 10);
  const discoveryEvents = getDiscoveryEvents?.data?.data?.data?.events;
  // console.log(discoveryEvents, 'discoveryEvents');
  const uniqueEvent = discoveryEvents?.map(
    (event: IEventDetails) => event?.unique_key
  );

  const isPending = getDiscoveryEvents?.isLoading;

  return (
    <section className="flex flex-col mt-1" >
      
  <h2
    className="mb-6"
    style={{
      fontSize: "20px",
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontWeight: "400",
    }}
  >
    Event Merchandise
  </h2> 

  <div
     className="grid gap-2 md:gap-4"
     style={{
       padding: "0rem",
       display: "grid",
       gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
     }}
  >
    {/* Duplicate Product Cards */}
    {[...Array(6)].map((_, index) => (
      <div
        key={index}
        className="text-start p-4 rounded-md"
        style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          boxShadow: "0px 8px 24px 0px #00000014",
          backgroundColor: "#ffffff",
          maxWidth: "250px",
          borderRadius: "15px",
          margin: "0",
        }}
      >
        <img
          src="/shirt.jpg"
          alt="100cm Teddy Bear"
          className="w-full h-auto object-cover rounded-md mb-4"
          style={{ maxWidth: "300px", margin: "0 auto" }}
        />
        <h3
          className="text-sm font-regular"
          style={{ marginBottom: "5px", marginTop: "10px" }}
        >
          100cm Teddy Bear
        </h3>
        <p
          className="text-black text-md font-bold"
          style={{ marginBottom: "16px" }}
        >
          ₦22,000
        </p>
        <button
          className="bg-white border border-[#e20000] text-[#e20000] py-3 rounded-md"
          style={{
            width: "100%",
            maxWidth: "full",
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: "regular",
            borderRadius: "10px",
          }}
        >
          Add to Cart
        </button>
      </div>
    ))}
  </div>
  </section>

  
  );
};

export default DiscoverEvents;
