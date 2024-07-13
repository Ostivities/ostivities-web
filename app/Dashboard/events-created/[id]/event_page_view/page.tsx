import Dropzone from "@/app/components/Dropzone/Dropzone";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import React from "react";
import EventsDetails from "../page";

const EventPageView = () => {
  return (
    <EventDetailsComponent>
      <div className="flex flex-row w-full">
        <div className="w-11/12 mx-auto">
          <Dropzone className="w-full border-dashed border flex items-center rounded-lg cursor-pointer" />
        </div>
      </div>
    </EventDetailsComponent>
  );
};

export default EventPageView;
