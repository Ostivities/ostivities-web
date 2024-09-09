import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message, Modal, FormProps } from "antd";
import H4 from "../../atoms/H4";
import Image from "next/image";
import { useProfile, useUpdateProfile } from "../../../hooks/auth/auth.hook";
import "@/app/globals.css"; // Assuming this is where your global styles are imported
import axios from "axios";
import { IUpdateUser } from "@/app/utils/interface";
import { successFormatter } from "@/app/utils/helper";

const preset: any = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
const cloud_name: any = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const cloud_api: any = process.env.NEXT_PUBLIC_CLOUDINARY_API_URL;

const PersonalProfile = () => {
  const [profileImage, setProfileImage] = useState<string>(
    "/images/emptyimage.png"
  ); // State for profile image URL
  const [uploadButton, setUploadButton] = useState<string>("Update"); // State for button text
  const [isImageUploaded, setIsImageUploaded] = useState<boolean>(false); // State to track if image is uploaded
  const [form] = Form.useForm();
  const { profile } = useProfile();
  console.log(profile?.data?.data?.data);
  const { updateProfile } = useUpdateProfile();
  const [loader, setLoader] = useState(false);
  const [saveLoader, setSaveLoader] = useState(false);

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        accountType: profile?.data?.data?.data?.accountType,
        firstName: profile?.data?.data?.data?.firstName,
        lastName: profile?.data?.data?.data?.lastName,
        emailAddress: profile?.data?.data?.data?.email,
        phone_number: profile?.data?.data?.data?.phone_number,
      });
    }
  }, [profile]);
  // Function to handle file upload
  const handleFileInputChange = async (file: any) => {
    setLoader(true);
    const formData = new FormData();
    console.log(file?.originFileObj);
    formData.append("file", file?.originFileObj);
    formData.append("upload_preset", preset);
    await axios
      .post(`${cloud_api}/${cloud_name}/auto/upload`, formData)
      .then(async (response: any) => {
        const urlString: string | any =
          response?.data?.secure_url || response?.data?.url;
        const res = await updateProfile.mutateAsync({
          image: urlString,
          id: profile?.data?.data?.data?.id,
        });
        if (res.status === 200) {
          setLoader(false);
          profile.refetch();
        }
        // setFields(urlString);
        // console.log(response)
      })
      .catch((error) => {
        return error?.response;
      });
  };

  // Function to handle image removal
  const handleRemoveImage = () => {
    Modal.confirm({
      title: "Are you sure you want to remove your profile picture?",
      icon: null,
      onOk() {
        setProfileImage("/images/emptyimage.png"); // Reset profile image to default
        setUploadButton("Update"); // Change button text back to "Update"
        setIsImageUploaded(false); // Set image upload state to false
        message.success("Profile picture removed successfully");
      },
      onCancel() {},
    });
  };

  // Function to save changes
  const handleSaveChanges = async () => {
    try {
      await form.validateFields(); // Validate all required fields except the phone number
      const phoneNumber = form.getFieldValue("phone_number");

      if (!phoneNumber) {
        message.warning("Phone number is optional, but it is currently empty.");
      }

      // message.success('Profile updated successfully');
      // Implement the logic to save the profile
      // console.log("Profile saved:", form.getFieldsValue());
      setUploadButton("Update");
      setIsImageUploaded(false);
    } catch (error) {
      message.error("Please fill in the required fields.");
    }
  };

  const onFinish: FormProps<IUpdateUser>["onFinish"] = async (value) => {
    setSaveLoader(true);
    // console.log(value);
    const { phone_number, ...rest } = value;
    if (value) {
      const response = await updateProfile.mutateAsync({
        phone_number,
        id: profile?.data?.data?.data?.id,
      });
      if (response.status === 200) {
        successFormatter(response);
        setSaveLoader(false);
        profile.refetch();
      }
    }
  };
  return (
    <div style={{ maxWidth: "1100px", marginLeft: "50px" }}>
      <div className="flex items-center space-x-6 mb-6">
        {" "}
        {/* Flex container for profile picture and buttons */}
        <div className="relative profile-image-container">
          <Image
            src={profile?.data?.data?.data?.image || "/images/emptyimage.png"} // Display the profile image dynamically
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
            onChange={(info) => handleFileInputChange(info.file)} // Handle upload action
          >
            <Button
              type="default"
              className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold w-25 rounded-2xl float-end"
              style={{
                borderRadius: "20px",
                fontFamily: "BricolageGrotesqueMedium",
              }}
              loading={loader}
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
      <div style={{ maxWidth: "1100px", marginLeft: "-10px" }}>
        <br />
        <Form
          layout="vertical"
          className="w-full space-y-6 px-8 py-5"
          style={{ marginBottom: "20px" }} // Margin bottom for form container
          form={form}
          onFinish={onFinish}
        >
          <div className="grid grid-cols-2 gap-x-14">
            <div className="grid gap-y-6">
              <Form.Item label="Account Type" name="accountType">
                <Input
                  placeholder="Personal"
                  disabled
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  { required: true, message: "Please input your first name!" },
                ]}
              >
                <Input
                  placeholder="Enter your first name"
                  disabled
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>

            <div className="grid gap-y-6">
              <Form.Item
                label="Email Address"
                name="emailAddress"
                rules={[
                  {
                    required: true,
                    message: "Please input the email address!",
                  },
                ]}
              >
                <Input
                  placeholder="Enter email address"
                  disabled
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  { required: true, message: "Please input your last name!" },
                ]}
              >
                <Input
                  placeholder="Enter your last name"
                  disabled
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
            <Form.Item
              label="Phone Number"
              name="phone_number"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input
                placeholder="Enter phone number"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </div>
          <div style={{ textAlign: "center", marginTop: "60px" }}>
            <Button
              type="default"
              size="large"
              className="font-BricolageGrotesqueSemiBold continue font-bold custom-button equal-width-button"
              style={{ marginBottom: "20px" }}
              htmlType="submit"
              onClick={handleSaveChanges}
              loading={saveLoader}
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
