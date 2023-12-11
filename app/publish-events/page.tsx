import CardImage from "@/public/card.png";
import { Button, Image, Space } from "antd";
import React from "react";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
import { Heading5, Paragraph } from "../components/typography/Typography";

function PublishEvent(): JSX.Element {
  return (
    <DashboardLayout title="Events Creation">
      <div className="w-11/12 mx-auto flex flex-col space-y-5 py-4">
        <Button
          type="default"
          size={"large"}
          className={`font-BricolageGrotesqueSemiBold button-styles sign-in cursor-pointer font-bold float-right place-self-end`}
        >
          Back
        </Button>

        <div className="flex flex-row">
          <div className="flex flex-row items-start space-x-8 w-2/3">
            <div className="rounded-[50px]">
              <Image
                width={400}
                height={600}
                src={
                  "https://res.cloudinary.com/dreezy/image/upload/v1702233880/card_iphh6v.png"
                }
                className="rounded-[50px]"
                alt=""
              />
              
            </div>
            <div className="flex flex-col space-y-4 w-1/3">
              <Heading5 content="Publish your event" className="" />
            </div>
          </div>

          <div className="flex flex-row items-start justify-center w-1/3">
            <Paragraph
              content="consectetur adipiscing elit. Fusce dapibus arcu id dui cursus egestas Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus arcu id dui cursus egestas Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus arcu id dui cursus egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus arcu iui consectetur adipiscing elit. Fusce dapibus arcu id dui cursus egestas Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus arcu id dui cursus egestas Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus arcu id dui cursus egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus arcu iui"
              className=""
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default PublishEvent;
