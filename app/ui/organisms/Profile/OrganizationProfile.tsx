import React from 'react';
import { Form, Input, Button } from 'antd';
import H4 from "../../atoms/H4";
import "@/app/globals.css";

const OrganizationProfile = () => {
  return (
    <div style={{ maxWidth: '1100px', marginLeft: '50px' }}>
      <Form
        layout="vertical"
        className="w-full flex flex-col space-y-6 px-8 py-5"
        style={{ marginBottom: '20px' }} // Margin bottom for form container
      >
        <H4 content="Profile" className="mb-10 self-start" />

        <div className="grid grid-cols-2 gap-x-14 w-full">
          <div className="grid gap-y-6"> {/* Increased gap between rows */}
            <Form.Item
              label="Account Type"
              name="accountType"
              rules={[{ required: true, message: "Please input the account type!" }]}
            >
              <Input placeholder="Organization" disabled style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label="Business Name"
              name="businessName"
              rules={[{ required: true, message: "Please input the business name!" }]}
            >
              <Input placeholder="Enter business name" style={{ width: '100%' }} />
            </Form.Item>
          </div>

          <div className="grid gap-y-6"> {/* Increased gap between rows */}
            <Form.Item
              label="Email Address"
              name="emailAddress"
              rules={[{ required: true, message: "Please input the email address!" }]}
            >
              <Input placeholder="Enter email address" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[{ required: true, message: "Please input the phone number!" }]}
            >
              <Input placeholder="Enter phone number" style={{ width: '100%' }} />
            </Form.Item>
          </div>
        </div>

        <H4
          content="Update Password"
          className="text-base text-OWANBE_PRY font-BricolageGrotesqueRegular mt-10 mb-8 self-start"
        />

        <div className="grid grid-cols-2 gap-x-14 w-full">
          <div className="grid gap-y-6"> {/* Increased gap between rows */}
            <Form.Item
              label="Old Password"
              name="oldPassword"
              rules={[{ required: true, message: "Please input the old password!" }]}
            >
              <Input.Password placeholder="Enter old password" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[{ required: true, message: "Please input the new password!" }]}
            >
              <Input.Password placeholder="Enter new password" style={{ width: '100%' }} />
            </Form.Item>
          </div>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true, message: "Please confirm the new password!" }]}
          >
            <Input.Password placeholder="Confirm new password" style={{ width: '100%' }} />
          </Form.Item>
        </div>
      </Form>

      <div style={{ textAlign: 'center', marginTop: '60px' }}> {/* Increased top margin for the button */}
        <Button
          type="default"
          size="large"
          className="font-BricolageGrotesqueSemiBold continue font-bold custom-button equal-width-button"
          style={{ marginBottom: '20px' }} // Added margin bottom for the button only
        >
          Save changes
        </Button>
      </div>
    </div>
  );
};

export default OrganizationProfile;
