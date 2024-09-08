import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, message, Modal } from 'antd';
import H4 from "../../atoms/H4";
import Image from 'next/image';
import { useProfile, useUpdateProfile } from "../../../hooks/auth/auth.hook";
import "@/app/globals.css"; // Assuming this is where your global styles are imported

const PersonalProfile = () => {
  const [profileImage, setProfileImage] = useState<string>("/images/emptyimage.png"); // State for profile image URL
  const [uploadButton, setUploadButton] = useState<string>("Update"); // State for button text
  const [isImageUploaded, setIsImageUploaded] = useState<boolean>(false); // State to track if image is uploaded
  const [form] = Form.useForm();
  const { profile } = useProfile();


  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        accountType: profile?.data?.data?.data?.accountType,
        firstName: profile?.data?.data?.data?.firstName,
        lastName: profile?.data?.data?.data?.lastName,
        emailAddress: profile?.data?.data?.data?.email,
        phoneNumber: profile?.data?.data?.data?.phoneNumber,
      });
    }
  }, [profile])
  // Function to handle file upload
  const handleImageUpload = (options: any) => {
    const { file, onSuccess, onError } = options;

    // Check file format and size
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
      icon: null,
      onOk() {
        setProfileImage("/images/emptyimage.png"); // Reset profile image to default
        setUploadButton("Update"); // Change button text back to "Update"
        setIsImageUploaded(false); // Set image upload state to false
        message.success('Profile picture removed successfully');
      },
      onCancel() {},
    });
  };

  // Function to save changes
  const handleSaveChanges = async () => {
    try {
      await form.validateFields(); // Validate all required fields except the phone number
      const phoneNumber = form.getFieldValue('phoneNumber');

      if (!phoneNumber) {
        message.warning('Phone number is optional, but it is currently empty.');
      }

      message.success('Profile updated successfully');
      // Implement the logic to save the profile
      console.log("Profile saved:", form.getFieldsValue());
      setUploadButton("Update");
      setIsImageUploaded(false);
    } catch (error) {
      message.error('Please fill in the required fields.');
    }
  };

  return (
    <div style={{ maxWidth: '1100px', marginLeft: '50px' }}>
      
      <div className="flex items-center space-x-6 mb-6"> {/* Flex container for profile picture and buttons */}
        <div className="relative profile-image-container">
        <Image
    src={profileImage} // Display the profile image dynamically
    alt="Profile Picture"
    width={96} // Equivalent to w-24
    height={96} // Equivalent to h-24
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
      <div style={{ maxWidth: '1100px', marginLeft: '-10px' }}>
      <br />
      <Form
        layout="vertical"
        className="w-full space-y-6 px-8 py-5"
        style={{ marginBottom: '20px' }} // Margin bottom for form container
        form={form}
      >
        <div className="grid grid-cols-2 gap-x-14">
          <div className="grid gap-y-6">
            <Form.Item
              label="Account Type"
              name="accountType"
            >
              <Input placeholder="Personal" disabled style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: "Please input your first name!" }]}
            >
              <Input placeholder="Enter your first name" disabled style={{ width: '100%' }} />
            </Form.Item>
          </div>
          

          <div className="grid gap-y-6">
            <Form.Item
              label="Email Address"
              name="emailAddress"
              rules={[{ required: true, message: "Please input the email address!" }]}
            >
              <Input placeholder="Enter email address" disabled style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: "Please input your last name!" }]}
            >
              <Input placeholder="Enter your last name" disabled style={{ width: '100%' }} />
            </Form.Item>
          </div>
          <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[{ required: true, message: "Please input your phone number!" }]}
            >
              <Input placeholder="Enter phone number" style={{ width: '100%' }} />
            </Form.Item>

        </div>

        {/* <H4
          className="pt-10 pb-5" content={"Update Password"} />

<div className="grid grid-cols-2 gap-x-14">
  <div className="grid gap-y-6">
    <Form.Item
      label="Old Password"
      name="oldPassword"
      rules={[{ required: true, message: "Please input the old password!" }]}
    >
      <Input.Password placeholder="Enter old password" style={{ width: '100%' }} />
    </Form.Item>
  </div>

  <div className="grid grid-cols-2 gap-x-6">
    <Form.Item
      label="New Password"
      name="newPassword"
      rules={[{ required: true, message: "Please input the new password!" }]}
    >
      <Input.Password placeholder="Enter new password" style={{ width: '100%' }} />
    </Form.Item>

    <Form.Item
      label="Confirm Password"
      name="confirmPassword"
      rules={[{ required: true, message: "Please confirm the new password!" }]}
    >
      <Input.Password placeholder="Confirm new password" style={{ width: '100%' }} />
    </Form.Item>
  </div>
</div> */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Button
            type="default"
            size="large"
            className="font-BricolageGrotesqueSemiBold continue font-bold custom-button equal-width-button"
            style={{ marginBottom: '20px' }}
            htmlType='submit'
            onClick={handleSaveChanges}
          >
            Save changes
          </Button>
        </div>
      </Form>
    </div>
    </div>
  );
};

export default PersonalProfile;