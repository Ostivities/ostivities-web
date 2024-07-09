'use client';

import DashboardLayout from '@/app/components/DashboardLayout/DashboardLayout';
import Summary from '@/app/components/Discovery/Summary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Form, Input, Select, Row, Col } from 'antd';
import "@/app/globals.css";

interface Inputs {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  phoneNumber: string;
}

const ContactForm = () => {
  const router = useRouter();
  const title = (
    <div className="flex-center gap-2">
      <Image
        src="/icons/back-arrow.svg"
        alt=""
        height={25}
        width={25}
        onClick={() => router.back()}
        className="cursor-pointer"
      />
      <h1 style={{ fontSize: '24px' }}>Contact Information</h1>
    </div>
  );

  const [form] = Form.useForm();

  const onFinish = (values: Inputs) => {
    console.log(values);
  };

  return (
    <DashboardLayout title={title} isLoggedIn>
      <section className="flex gap-12">
        <section className="flex-1 pr-17">
          <div className=" bg-OWANBE_NOTIFICATION px-4 py-2 border-[0.5px] border-OWANBE_PRY rounded-[0.625rem]">
            We have reserved your tickets please complete checkout within{' '}
            <span className=" text-OWANBE_PRY">10:00</span> to secure your
            tickets.
          </div>
          <div className="pr-full mt-16">
            <Form
              form={form}
              onFinish={onFinish}
              layout="vertical"
              className="form-spacing"
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[{ required: true, message: 'Please provide your first name' }]}
                  >
                    <Input placeholder="Enter First Name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[{ required: true, message: 'Please provide your last name' }]}
                  >
                    <Input placeholder="Enter Last Name" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label="Email Address"
                name="email"
                rules={[{ required: true, message: 'Please provide your email' }]}
              >
                <Input type="email" placeholder="Enter Email Address" />
              </Form.Item>
              <Form.Item
                label="Confirm Email"
                name="confirmEmail"
                rules={[{ required: true, message: 'Please confirm your email' }]}
              >
                <Input type="email" placeholder="Confirm Email Address" />
              </Form.Item>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[{ required: true, message: 'Please provide your phone number' }]}
              >
                <Input
                  addonBefore={
                    <Select defaultValue="231">
                      {Array.from({ length: 5 }, (_, index) => (
                        <Select.Option key={index} value={`23${index + 1}`}>
                          +23{index + 1}
                        </Select.Option>
                      ))}
                    </Select>
                  }
                  placeholder="Enter Phone Number"
                />
              </Form.Item>
            </Form>
          </div>
        </section>
        <Summary continueBtn to={"/Dashboard/payment"} />
      </section>
    </DashboardLayout>
  );
};

export default ContactForm;
