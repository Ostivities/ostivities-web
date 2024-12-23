"use client";
import { useFormContext } from "@/app/contexts/form-context/FormContext";
import { Steps } from "antd";
import React from "react";
import { useCookies } from "react-cookie";
import { IoImageOutline, IoTicketOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { Label } from "../typography/Typography";

function Steppers(): JSX.Element {
  const { formState } = useFormContext();
  const [cookies, setCookie] = useCookies([
    "form_stage",
    "stage_one",
    "stage_two",
    "stage_three",
  ]);

  const stepsCount = formState?.stages?.length || 3; // Handle potential missing stages
  // 
  // 

  return (
    <>
      <div className="hidden md:block">
        <style>
          {`
          /* Change color for lines after finished and processing steps */
          .ant-steps-item-finish .ant-steps-item-tail::after,
          .ant-steps-item-process .ant-steps-item-tail::after {
            background-color: #e20000 !important;
          }

          /* Change color for the icon border in finished and processing steps */
          .ant-steps-item-process .ant-steps-item-icon,
          .ant-steps-item-finish .ant-steps-item-icon {
            border-color: #e20000 !important;
          }

          /* Ensure lines before the current step are also colored correctly */
          .ant-steps-item-finish + .ant-steps-item .ant-steps-item-tail::after {
            background-color: #e20000 !important;
          }
        `}
        </style>
        <Steps
          // responsive
          current={cookies?.form_stage}
          direction="horizontal"
          labelPlacement="vertical"
          className="mx-auto"
          // size= "small"
          style={{ width: "500px" }}
          items={[
            {
              title: <Label content="Event Details" />,
              description: "",
              className: "font-BricolageGrotesqueRegular",
              icon: (
                <div
                  style={{
                    width: "33px",
                    height: "33px",
                    background: "#E20000",
                    borderRadius: "100%",
                    padding: "7px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MdOutlineEdit size={19} color="#fff" />
                </div>
              ),
              status: "process",
            },
            {
              title: <Label content="Event Page" />,
              description: "",
              className: "font-BricolageGrotesqueRegular",
              icon: (
                <div
                  style={{
                    width: "33px",
                    height: "33px",
                    background:
                      cookies?.stage_two === "finish" ? "#E20000" : "#fff", // Background color based on stage
                    borderRadius: "100%",
                    padding: "7px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IoImageOutline
                    size={19}
                    color={cookies?.stage_two === "finish" ? "#fff" : "#000"} // Icon color based on stage
                  />
                </div>
              ),
              status: cookies.stage_two,
            },
            {
              title: <Label content="Tickets Creation" />,
              description: "",
              className: "font-BricolageGrotesqueRegular",
              icon: (
                <div
                  style={{
                    width: "33px",
                    height: "33px",
                    background:
                      cookies.stage_three === "finish" ? "#E20000" : "#fff", // Background color based on stage
                    borderRadius: "100%",
                    padding: "7px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IoTicketOutline
                    size={19}
                    color={cookies.stage_three === "finish" ? "#fff" : "#000"} // Icon color based on stage
                  />
                </div>
              ),
              status: cookies.stage_three,
            },
          ]}
          size="default"
        />
      </div>
      <div className="block md:hidden">
        <style>
          {`
          /* Change color for lines after finished and processing steps */
          .ant-steps-item-finish .ant-steps-item-tail::after,
          .ant-steps-item-process .ant-steps-item-tail::after {
            background-color: #e20000 !important;
          }

          /* Change color for the icon border in finished and processing steps */
          .ant-steps-item-process .ant-steps-item-icon,
          .ant-steps-item-finish .ant-steps-item-icon {
            border-color: #e20000 !important;
          }

          /* Ensure lines before the current step are also colored correctly */
          .ant-steps-item-finish + .ant-steps-item .ant-steps-item-tail::after {
            background-color: #e20000 !important;
          }
        `}
        </style>
        <Steps
          // responsive
          current={cookies?.form_stage}
          direction="horizontal"
          labelPlacement="vertical"
          className="mx-auto"
          size= "small"
          // style={{ width: "500px" }}
          items={[
            {
              title: <Label content="Event Details" />,
              className: "font-BricolageGrotesqueRegular",
              description: "",
              icon: (
                <div
                  style={{
                    height: "33px",
                    background: "#E20000",
                    borderRadius: "100%",
                    padding: "7px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MdOutlineEdit size={19} color="#fff" />
                </div>
              ),
              status: "process",
            },
            {
              title: <Label content="Event Page" />,
              className: "font-BricolageGrotesqueRegular",
              description: "",
              icon: (
                <div
                  style={{
                    height: "33px",
                    background:
                      cookies?.stage_two === "finish" ? "#E20000" : "#fff", // Background color based on stage
                    borderRadius: "100%",
                    padding: "7px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IoImageOutline
                    size={19}
                    color={cookies?.stage_two === "finish" ? "#fff" : "#000"} // Icon color based on stage
                  />
                </div>
              ),
              status: cookies.stage_two,
            },
            {
              title: <Label content="Tickets Creation" />,
              className: "font-BricolageGrotesqueRegular",
              description: "",
              icon: (
                <div
                  style={{
                    height: "33px",
                    background:
                      cookies.stage_three === "finish" ? "#E20000" : "#fff", // Background color based on stage
                    borderRadius: "100%",
                    padding: "7px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IoTicketOutline
                    size={19}
                    color={cookies.stage_three === "finish" ? "#fff" : "#000"} // Icon color based on stage
                  />
                </div>
              ),
              status: cookies.stage_three,
            },
          ]}
          // size="default"
        />
      </div>
    </>
  );
}

export default Steppers;
