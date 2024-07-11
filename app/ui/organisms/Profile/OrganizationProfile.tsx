import React from 'react';
import { Form, Input, Button } from 'antd';
import H4 from "../../atoms/H4";
import { global } from "styled-jsx/css";
import "@/app/globals.css";

const OrganizationProfile = () => {
  return (
    <div style={{ maxWidth: '1100px', marginLeft: '50px' }}>
      <Form
        layout="vertical"
        className="px-8 flex flex-col items-center py-5"
        style={{ marginBottom: '20px' }} // Margin bottom for form container
      >
        <H4 content="Profile" className="mb-10 self-start" />

        <div className="grid grid-cols-2 gap-x-14 items-start w-full">
          <div className="grid gap-y-2"> {/* Increased gap between rows */}
            <Form.Item label="Account Type" className="ml-14">
              <Input value="Organization" disabled style={{ width: '90%' }} />
            </Form.Item>
            <Form.Item label="Business Name" className="ml-12">
              <Input placeholder="Enter business name" style={{ width: '90%' }} />
            </Form.Item>
          </div>

          <div className="grid gap-y-2"> {/* Increased gap between rows */}
            <Form.Item label="Email Address" className="ml-12">
              <Input placeholder="Enter email address" style={{ width: '90%' }} />
            </Form.Item>
            <Form.Item label="Phone Number" className="ml-11">
              <Input placeholder="Enter phone number" style={{ width: '90%' }} />
            </Form.Item>
          </div>
        </div>

        <H4
          content="Update Password"
          className="text-base text-OWANBE_PRY font-BricolageGrotesqueRegular mt-10 mb-8 self-start"
        />

        <div className="grid grid-cols-2 gap-x-14 items-end w-full">
          <div className="grid gap-y-2"> {/* Increased gap between rows */}
            <Form.Item label="Old Password" className="ml-14">
              <Input.Password placeholder="Enter old password" style={{ width: '90%' }} />
            </Form.Item>
            <Form.Item label="New Password" className="ml-12">
              <Input.Password placeholder="Enter new password" style={{ width: '90%' }} />
            </Form.Item>
          </div>

          <Form.Item label="Confirm Password" className="ml-12">
            <Input.Password placeholder="Confirm new password" style={{ width: '90%' }} />
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
