"use client";
import { Label } from "@/app/components/typography/Typography";
import { STATES_IN_NIGERIA } from "@/app/utils/data";
// import { EVENT_INFO } from "@/app/utils/enums";
import { IFormInput } from "@/app/utils/interface";
import { UploadOutlined } from "@ant-design/icons";
// import { schema } from "@/app/utils/validations";
// import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Space,
  Upload,
} from "antd";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

function Details(): JSX.Element {
  const { Option } = Select;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<IFormInput> = (data: any) => console.log(data);
  return (
    <form
      //@ts-ignore
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 gap-x-4"
    >
      <div className="flex flex-col space-y-4 pr-6">
        <Controller
          name="eventName"
          control={control}
          render={({ field }) => (
            <Space direction="vertical" size={"small"}>
              <Label content="Event Name" className="" htmlFor="eventName" />
              <Input {...field} placeholder="Enter Event Name" />
            </Space>
          )}
        />

        <Controller
          name="eventDetails"
          control={control}
          render={({ field }) => (
            <Space direction="vertical" size={"small"}>
              <Label content="Event Details" className="" htmlFor="eventName" />
              <Input.TextArea
                {...field}
                placeholder="Enter Event Details"
                style={{
                  height: "200px !important",
                  paddingTop: "10px !important",
                }}
                className="py-3"
              />
            </Space>
          )}
        />

        <Controller
          name="eventState"
          control={control}
          render={({ field }) => (
            <Space direction="vertical" size={"small"} className="w-full">
              <Label content="Event State" className="" htmlFor="eventName" />
              <Select
                placeholder="Select State"
                {...field}
                style={{ width: "100%" }}
              >
                {STATES_IN_NIGERIA.map((_i) => (
                  <Option value={_i.state} key={_i.state}>
                    {_i.state}
                  </Option>
                ))}
              </Select>
            </Space>
          )}
        />

        <Controller
          name="eventAddress"
          control={control}
          render={({ field }) => (
            <Space direction="vertical" size={"small"}>
              <Label content="Event Address" className="" htmlFor="eventName" />
              <Input {...field} placeholder="Enter Address" />
            </Space>
          )}
        />
      </div>

      <div className="flex flex-col space-y-4 pl-6">
        <Controller
          name="customURL"
          control={control}
          render={({ field }) => (
            <Space direction="vertical" size={"small"}>
              <Label content="Custom URL" className="" htmlFor="eventName" />

              <Space.Compact className="w-full">
                <Input
                  style={{
                    width: "40%",
                    borderTopRightRadius: "0px !important",
                    borderBottomRightRadius: "0px !important",
                  }}
                  defaultValue={"https://ostivities.com/discover"}
                  value={"https://ostivities.com/discover"}
                  readOnly
                />
                <Input
                  style={{
                    width: "60%",
                    borderTopLeftRadius: "0px !important",
                    borderBottomLeftRadius: "0px !important",
                  }}
                  {...field}
                  placeholder=""
                />
              </Space.Compact>
            </Space>
          )}
        />

        <Controller
          name="document"
          control={control}
          render={({ field }) => (
            <Space direction="vertical" size={"small"}>
              <Label content="Supporting Doc" htmlFor="eventName" />

              <Space.Compact className="w-full h-11">
                <Input
                  style={{
                    width: "75%",
                    borderTopRightRadius: "0px !important",
                    borderBottomRightRadius: "0px !important",
                  }}
                  placeholder="Enter file name (optional)"
                />
                <Upload
                  style={{ height: "41px !important", width: "60%" }}
                  className="upload-button"
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Space.Compact>
            </Space>
          )}
        />

        <Controller
          name="eventType"
          control={control}
          render={({ field }) => (
            <Space direction="vertical" size={"small"} className="w-full">
              <Label content="Event Type" className="" htmlFor="eventType" />
              <Select
                placeholder="Select Event Type"
                {...field}
                style={{ width: "100%" }}
              >
                {STATES_IN_NIGERIA.map((_i) => (
                  <Option value={_i.state} key={_i.state}>
                    {_i.state}
                  </Option>
                ))}
              </Select>
            </Space>
          )}
        />
      </div>
    </form>
  );
}

export default Details;
