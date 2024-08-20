"use client";
import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, Modal, Row, Col, Space } from 'antd';
import Image from 'next/image';
import "@/app/globals.css";
import { LinkOutlined, XOutlined, FacebookFilled, InstagramFilled } from '@ant-design/icons';
import { Controller, useForm } from 'react-hook-form';
import { IFormInput } from '@/app/utils/interface';
import { useRouter } from 'next/navigation';

const VendorsDetails = () => {
  const [profileImage, setProfileImage] = useState<string>("/images/emptyimage.png");
  const [uploadButton, setUploadButton] = useState<string>("Update");
  const [isImageUploaded, setIsImageUploaded] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    trigger,
  } = useForm<IFormInput>({
    mode: "all",
  });

  const router = useRouter(); // useRouter hook to navigate

  // Function to handle file upload
  const handleImageUpload = (options: any) => {
    const { file, onSuccess, onError } = options;

    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt10M = file.size / 1024 / 1024 < 10;

    if (!isJpgOrPng) {
      message.error('You can only upload JPEG or PNG files!');
      onError(new Error('You can only upload JPEG or PNG files!'));
      return;
    }
    if (!isLt10M) {
      message.error('Image must be smaller than 10MB!');
      onError(new Error('Image must be smaller than 10MB!'));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setProfileImage(reader.result as string);
      setUploadButton("Remove");
      setIsImageUploaded(true);
      message.success(`${file.name} file uploaded successfully`);
      onSuccess('ok');
    };
    reader.onerror = () => {
      message.error('Image upload failed!');
      onError(new Error('Image upload failed!'));
    };
    reader.readAsDataURL(file);
  };

  // Function to handle image removal
  const handleRemoveImage = () => {
    Modal.confirm({
      title: 'Are you sure you want to remove your profile picture?',
      onOk() {
        setProfileImage("/images/emptyimage.png");
        setUploadButton("Update");
        setIsImageUploaded(false);
        message.success('Profile picture removed successfully');
      },
    });
  };

  // Function to save changes
  const handleSaveChanges = () => {
    console.log("Image saved:", profileImage);
    setUploadButton("Update");
    setIsImageUploaded(false);
  };
  const handleApprove = () => {
    console.log("Vendor approved");
  };

  const handleDecline = () => {
    console.log("Vendor declined");
  };
  
  const handleBack = () => {
    router.back();
  };

  

  return (
    <div style={{ maxWidth: '1700px', marginLeft: '50px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <Button
          type="default"
          className="back-button"
          style={{ borderRadius: '25px', width: '120px' }}
          onClick={handleBack}
        >
          Back
        </Button>
      </div>

      <div className="flex items-center space-x-6 mb-6">
        <div className="relative profile-image-container">
          <Image
            src={profileImage}
            alt="Profile Picture"
            width={96}
            height={96}
            className="object-cover w-24 h-24 rounded-full"
          />
        </div>
      </div>

      <div style={{ maxWidth: '1300px', marginLeft: '-20px' }}>
        <Form
          layout="vertical"
          className="w-full space-y-6 px-8 py-5"
          style={{ marginBottom: '20px' }}
        >
          <div className="grid grid-cols-2 gap-x-14">
            {/* First Row */}
            <Form.Item label="Vendor's Name" name="vendorName" style={{
              fontSize: "14.5px",
              fontFamily: "BricolageGrotesqueregular",
            }}>
              <Input placeholder="Name" disabled style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Vendor's Email Address" name="vendorEmailAddress" style={{
              fontSize: "14.5px",
              fontFamily: "BricolageGrotesqueregular",
            }}>
              <Input placeholder="Email" disabled style={{ width: '100%' }} />
            </Form.Item>

            {/* Second Row */}
            <Form.Item label="Vendor's Phone Number" name="vendorPhoneNumber" style={{
              fontSize: "14.5px",
              fontFamily: "BricolageGrotesqueregular",
            }}>
              <Input placeholder="Phone Number" disabled style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Vendor's Address" name="vendorAddress" style={{
              fontSize: "14.5px",
              fontFamily: "BricolageGrotesqueregular",
            }}>
              <Input placeholder="Address" disabled style={{ width: '100%' }} />
            </Form.Item>

            {/* Third Row */}
            <Form.Item label="Vendor's Specialties" name="specialties" style={{
              fontSize: "14.5px",
              fontFamily: "BricolageGrotesqueregular",
            }}>
              <Input placeholder="Specialties" disabled style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Status" name="status" style={{
              fontSize: "14.5px",
              fontFamily: "BricolageGrotesqueregular",
            }}>
              <Input placeholder="Pending Approval" disabled style={{ width: '100%' }} />
            </Form.Item>

            {/* Fourth Row */}
            <div className="grid gap-y-1">
              <Space
                direction="vertical"
                size="small"
                style={{ marginBottom: "4px" }}
              >
                <label
                  htmlFor="socialdetails"
                  style={{
                    marginBottom: "4px",
                    fontSize: "14.5px",
                    fontFamily: "BricolageGrotesqueregular",
                  }}
                >
                  Social Media Details{" "}
                </label>
                <Row gutter={[16, 8]}>
                  <Col xs={24} sm={12}>
                    <Controller
                      name="websiteUrl"
                      control={control}
                      render={({ field }) => (
                        <Input
                          prefix={<LinkOutlined />}
                          style={{ width: "100%", marginTop: "8px" }}
                          {...field}
                          placeholder="Name" disabled />
                      )}
                    />
                  </Col>

                  <Col xs={24} sm={12}>
                    <Controller
                      name="twitterUrl"
                      control={control}
                      render={({ field }) => (
                        <Input
                          prefix={<XOutlined />}
                          style={{ width: "100%", marginTop: "8px" }}
                          {...field}
                          placeholder="Name" disabled />
                      )}
                    />
                  </Col>

                  <Col xs={24} sm={12}>
                    <Controller
                      name="facebookUrl"
                      control={control}
                      render={({ field }) => (
                        <Input
                          prefix={<FacebookFilled />}
                          style={{ width: "100%", marginTop: "8px" }}
                          {...field}
                          placeholder="Name" disabled />
                      )}
                    />
                  </Col>

                  <Col xs={24} sm={12}>
                    <Controller
                      name="instagramUrl"
                      control={control}
                      render={({ field }) => (
                        <Input
                          prefix={<InstagramFilled />}
                          style={{ width: "100%", marginTop: "8px" }}
                          {...field}
                          placeholder="Name" disabled />
                      )}
                    />
                  </Col>
                </Row>
              </Space>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '60px' }}>

          <Button
              type="default"
              size="large"
              className="font-BricolageGrotesqueSemiBold continue cursor-pointer font-bold equal-width-button"
              style={{ marginBottom: '20px', marginRight: '10px' }}
              onClick={handleDecline}
            >
              Decline
            </Button>

            <Button
              type="primary"
              size="large"
              className="font-BricolageGrotesqueSemiBold continue font-bold custom-button equal-width-button"
              style={{ marginBottom: '20px' }}
              onClick={handleApprove}
            >
              Approve
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default VendorsDetails;
