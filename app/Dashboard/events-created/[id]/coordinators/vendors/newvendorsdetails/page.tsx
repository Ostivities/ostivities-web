"use client";
import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, Modal, Row, Col, Space } from 'antd';
import Image from 'next/image';
import "@/app/globals.css";
import { LinkOutlined, XOutlined, FacebookFilled, InstagramFilled, TwitterOutlined } from '@ant-design/icons';
import { Controller, useForm } from 'react-hook-form';
import { IFormInput } from '@/app/utils/interface';
import { useRouter } from 'next/navigation';
import { Label } from '@/app/components/typography/Typography';

const NewVendorsDetails = () => {
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
           size={"large"}
           className={`font-BricolageGrotesqueSemiBold button-style sign-in cursor-pointer font-bold`}
           style={{ width: "150px" }} 
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
         
        {/* Conditional rendering for upload and remove buttons */}
        {uploadButton === "Update" ? (
          <Upload
            name="avatar"
            showUploadList={false} // Hide the file list after upload
            customRequest={handleImageUpload} // Handle upload action
          >
            <Button
              type="default"
              className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold w-25 rounded-2xl float-end"
              style={{
                borderRadius: "20px",
                fontFamily: "BricolageGrotesqueMedium",
              }}
            >
              Update
            </Button>
          </Upload>
        ) : (
          <Button
            type="default"
            className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold w-25 rounded-2xl float-end"
            style={{
              borderRadius: "20px",
              fontFamily: "BricolageGrotesqueMedium",
            }}
            onClick={handleRemoveImage} // Handle remove image action
          >
            Remove
          </Button>
        )}
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
        <Input placeholder="Enter vendors name" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Vendor's Email Address" name="vendorEmailAddress" style={{
        fontSize: "14.5px",
        fontFamily: "BricolageGrotesqueregular",
      }}>
        <Input placeholder="Enter vendors email"  style={{ width: '100%' }} />
      </Form.Item>

      {/* Second Row */}
      <Form.Item label="Vendor's Phone Number" name="vendorPhoneNumber" style={{
        fontSize: "14.5px",
        fontFamily: "BricolageGrotesqueregular",
      }}>
        <Input placeholder="Enters phone number"  style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Vendor's Address" name="vendorAddress" style={{
        fontSize: "14.5px",
        fontFamily: "BricolageGrotesqueregular",
      }}>
        <Input placeholder="Enter vendors address" style={{ width: '100%' }} />
      </Form.Item>

      {/* Third Row */}
      <Form.Item label="Vendor's Specialties" name="specialties" style={{
        fontSize: "14.5px",
        fontFamily: "BricolageGrotesqueregular",
      }}>
        <Input placeholder="select Specialties" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Status" name="status" style={{
        fontSize: "14.5px",
        fontFamily: "BricolageGrotesqueregular",
      }}>
        <Input placeholder="Pending Approval"  style={{ width: '100%' }} />
      </Form.Item>

      {/* Fourth Row */}
      <div className="col-span-2 grid grid-cols-2 gap-x-14">
        {/* Social Media Details */}
        <div>
          <label
            htmlFor="socialdetails"
            style={{
              marginBottom: "4px",
              fontSize: "14.5px",
              fontFamily: "BricolageGrotesqueregular",
            }}
          >
             Social Media Details{" "}
                          <span style={{ color: "#e20000" }}>(optional)</span>
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
                    placeholder="Website" />
                )}
              />
            </Col>
            <Col xs={24} sm={12}>
              <Controller
                name="twitterUrl"
                control={control}
                render={({ field }) => (
                  <Input
                    prefix={<TwitterOutlined />}
                    style={{ width: "100%", marginTop: "8px" }}
                    {...field}
                    placeholder="Twitter" />
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
                    placeholder="Facebook" />
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
                    placeholder="Instagram" />
                )}
              />
            </Col>
          </Row>
        </div>

        {/* Extra Details */}
        <div>
          <label
            htmlFor="extradetails"
            style={{
              fontSize: "14.5px",
              fontFamily: "BricolageGrotesqueregular",
              marginBottom: "10px",
            }}
          >
            Extra Details
          </label>
          <Controller
            name="eventDetails"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                {...field}
                placeholder="Enter extra details"
                style={{
                  minHeight: "150px",
                  maxHeight: "150px",
                  width: "100%",
                  paddingTop: "10px",
                }}
                className="py-3"
              />
            )}
          />
        </div>
      </div>
      </div>
    
          <div style={{ textAlign: 'center', marginTop: '60px' }}>

            <Button
              type="primary"
              size="large"
              className="font-BricolageGrotesqueSemiBold continue font-bold custom-button equal-width-button"
              style={{ marginBottom: '20px' }}
              onClick={handleApprove}
            >
              Add Vendor
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default NewVendorsDetails;
