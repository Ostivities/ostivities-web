import { IModal } from "@/app/utils/interface";
import { Button, Input, Modal, Space, Form, Row, Col, Select } from "antd";
import React, { useState, useEffect } from "react";
import { Heading5 } from "../typography/Typography"; // Assuming this is a custom component
import { useGetEventCoordinatorInfo } from "@/app/hooks/coordinators/coordinators.hook";
import { ICoordinatorData } from "@/app/utils/interface";
import { STAFF_ROLE } from "@/app/utils/enums";


// Define the field types for the form

const CoordinatorsDetail = ({ open, onCancel, onOk, data, id }: IModal) => {
  const { Option } = Select;
  const { getEventCoordinatorInfo } = useGetEventCoordinatorInfo(id)
  const coordinatorsDetails = getEventCoordinatorInfo?.data?.data?.data
  console.log(getEventCoordinatorInfo, "getEventCoordinatorInfo")
  const [role, setRole] = useState<string | null>('Ticketing Agent'); // Preselect "Ticketing Agent"
  const [form] = Form.useForm(); 
  const staffRole = Form.useWatch("staff_role", form)

  console.log(staffRole)
  const onFinish = (values: ICoordinatorData) => {
    // handle form submission
    console.log('Form Values:', values);
    onOk(); // Close the modal on successful submission
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if(coordinatorsDetails) {
      form.setFieldsValue({
        staff_name: coordinatorsDetails?.staff_name,
        staff_email: coordinatorsDetails?.staff_email,
        staff_phone_number: coordinatorsDetails?.staff_phone_number,
        staff_role: coordinatorsDetails?.staff_role,
        password: coordinatorsDetails?.password_text
      })
    }
  }, [coordinatorsDetails])

  return (
    <Modal
      title={
        <>
          <Heading5
            content={"Coordinator's Details"} 
            className=""
            styles={{ fontSize: "16px" }} // Adjust font size here
          />
          <br />
        </>
      }
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      footer={
        <Space className=" mx-auto text-center w-full flex flex-row justify-center pb-5">
        </Space>
      }
      width={700}
    >
      <Form<ICoordinatorData>
        id="add-event-coordinator-form"
        form={form}
        name="basic"
        initialValues={{ coordinatorsRole: 'Ticketing Agent' }} // Set initial value for role
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item<ICoordinatorData>
              label="Coordinator's Name"
              name="staff_name"
              rules={[{ required: true, message: "Please input coordinator's name!" }]}
              style={{ marginBottom: '8px' }}
            >
              <Input placeholder="Coordinator's name" readOnly value={data?.coordinatorsName} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item<ICoordinatorData>
              label="Coordinator's Email"
              name="staff_email"
              rules={[{ required: true, message: "Please input coordinator's email!" }]}
              style={{ marginBottom: '8px' }}
            >
              <Input placeholder="Coordinator's email" readOnly value={data?.coordinatorsEmail} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item<ICoordinatorData>
              label="Coordinator's Phone Number"
              name="staff_phone_number"
              rules={[{ required: true, message: "Please input coordinator's phone number!" }]}
              style={{ marginBottom: '8px' }}
            >
              <Input placeholder="Coordinator's phone number" readOnly value={data?.coordinatorsphoneNumber} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item<ICoordinatorData>
              label="Coordinator's Role"
              name="staff_role"
              rules={[{ required: true, message: "Please select coordinator's role!" }]}
              style={{ marginBottom: '8px' }}
            >
              <Select
                placeholder="Select role type"
                onChange={(value) => setRole(value)} // Update role state on selection
                disabled // Disable the select input
                value={role}
              >
                <Option value={STAFF_ROLE.AGENT}>Ticketing Agent</Option>
                <Option value={STAFF_ROLE.AUDITOR}>Auditor</Option>
                <Option value={STAFF_ROLE.USHER}>Usher</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Conditionally render the password field if "Ticketing Agent" is selected */}
        {staffRole === STAFF_ROLE.AGENT && (
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item<ICoordinatorData>
                label="Password"
                name="password_text"
                rules={[{ required: true, message: "Please generate a password for the Ticketing Agent!" }]}
                style={{ marginBottom: '24px' }} // Add margin bottom to the last form item
              >
                <Input.Password
                  placeholder="password"
                  style={{ width: '100%' }}
                  readOnly
                  value={data?.password}
                />
              </Form.Item>
            </Col>
          </Row>
        )}
      </Form>
    </Modal>
  );
};

export default CoordinatorsDetail;
