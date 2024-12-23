import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  Modal,
  FormProps,
  UploadProps,
} from "antd";
import H4 from "../../atoms/H4";
import Image from "next/image";
import "@/app/globals.css"; // Assuming this is where your global styles are imported
import { useProfile, useUpdateProfile } from "../../../hooks/auth/auth.hook";
import { IUpdateUser } from "@/app/utils/interface";
import axios from "axios";
import { successFormatter } from "@/app/utils/helper";

const preset: any = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
const cloud_name: any = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const cloud_api: any = process.env.NEXT_PUBLIC_CLOUDINARY_API_URL;
const profile_pictures: any = process.env.NEXT_PUBLIC_OSTIVITIES_USER_PROFILE_PICTURE

const OrganizationProfile = () => {
  const [fields, setFields] = useState<any>();
  const [profileImage, setProfileImage] = useState<string>(
    "/empty.svg"
  ); // State for profile image URL
  const [uploadButton, setUploadButton] = useState<string>("Update"); // State for button text
  const [isImageUploaded, setIsImageUploaded] = useState<boolean>(false); // State to track if image is uploaded
  const { profile } = useProfile();
  const { updateProfile } = useUpdateProfile();
  const [loader, setLoader] = useState(false);
  const [saveLoader, setSaveLoader] = useState(false);
  const [form] = Form.useForm();


  const initialProfileData = (() => {
    if (typeof window !== "undefined") {
      const storedProfileData = localStorage.getItem("profileData");
      if (
        storedProfileData &&
        storedProfileData !== "undefined" &&
        storedProfileData !== "null"
      ) {
        try {
          return JSON.parse(storedProfileData); // Return parsed data if valid
        } catch (error) {
          console.error("Failed to parse profileData:", error);
        }
      }
      return null;
    }
  })();

  const [profileData, setProfileData] = useState(initialProfileData);
  const [isProfileReady, setIsProfileReady] = useState(false);

  // 

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProfileData = localStorage.getItem("profileData");
      if (
        storedProfileData &&
        storedProfileData !== "undefined" &&
        storedProfileData !== "null" &&
        JSON.stringify(initialProfileData) !== storedProfileData
      ) {
        try {
          setProfileData(JSON.parse(storedProfileData));
        } catch (error) {
          console.error("Failed to parse profileData:", error);
        }
      }
      setIsProfileReady(true);
    }
  }, [initialProfileData]);

  useEffect(() => {
    if (profile && profileData && isProfileReady) {
      form.setFieldsValue({
        accountType: profile?.data?.data?.data?.accountType || profileData?.accountType,
        businessName: profile?.data?.data?.data?.businessName || profileData?.businessName,
        emailAddress: profile?.data?.data?.data?.email || profileData?.email,
        phone_number: profile?.data?.data?.data?.phone_number || profileData?.phone_number,
      });
    }
  }, [profile, profileData]);

  const props: UploadProps = {
    name: "image",
    maxCount: 1,
    action: `${cloud_api}/${cloud_name}/auto/upload`,
    beforeUpload: (file, fileList) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", profile_pictures);
      formData.append("upload_preset", preset);
    },
    async customRequest({ file, onSuccess, onError }) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", profile_pictures);
      formData.append("upload_preset", preset);
      setLoader(true)
      try {
        const response = await axios.post(
          `${cloud_api}/${cloud_name}/auto/upload`,
          formData
        );
        if (response.status === 200) {
          const urlString: string | any =
            response?.data?.secure_url || response?.data?.url;
          const res = await updateProfile.mutateAsync({
            image: urlString,
            id: profileData?.id,
          });
          if (res.status === 200) {
            setLoader(false);
            // profile.refetch();
            setProfileData(res?.data?.data);
            setFields(urlString);
            localStorage.setItem('profileData', JSON.stringify(res?.data?.data));
          }
        }
      } catch (error) {}
    },
    async onChange(info) {
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
      } else if (info.file.status === "error") {
      }
    },
    showUploadList: false,
  };

  const handleRemoveImage = () => {
    Modal.confirm({
      title: "Are you sure you want to remove your profile picture?",
      icon: null,
      onOk() {
        setProfileImage("/empty.svg"); // Reset profile image to default
        setUploadButton("Update"); // Change button text back to "Update"
        setIsImageUploaded(false); // Set image upload state to false
        delete profileData?.image;
        message.success("Profile picture removed successfully");
      },
      onCancel() {},
    });
  };

  const handleSaveChanges = async () => {
    try {
      await form.validateFields(); // Validate all required fields except the phone number
      const phoneNumber = form.getFieldValue("phone_number");

      if (!phoneNumber) {
        message.warning("Phone number is optional, but it is currently empty.");
      }
      // Implement the logic to save the profile
      setUploadButton("Update");
      setIsImageUploaded(false);
    } catch (error) {
      message.error("Please fill in the required fields.");
    }
  };

  const onFinish: FormProps<IUpdateUser>["onFinish"] = async (value) => {
    setSaveLoader(true);
    const { phone_number, ...rest } = value;
    if (value) {
      const response = await updateProfile.mutateAsync({
        phone_number,
        id: profileData?.id,
      });
      if (response.status === 200) {
        
        successFormatter(response);
        setSaveLoader(false);
        // profile.refetch();
        setProfileData(response?.data?.data);
        localStorage.setItem('profileData', JSON.stringify(response?.data?.data));
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
            src={profileData?.image || fields || "/empty.svg"} // Display the profile image dynamically
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
            {...props}
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
          <div className="grid grid-cols-2 gap-x-10">
            <div className="grid gap-y-6">
              <Form.Item label="Account Type" name="accountType">
                <Input
                  placeholder="Organization"
                  disabled
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                label="Business Name"
                name="businessName"
                rules={[
                  {
                    required: true,
                    message: "Please input your business name!",
                  },
                ]}
              >
                <Input
                  placeholder="Enter business name"
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
                label="Phone Number"
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input
                  placeholder="Enter phone number"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
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

export default OrganizationProfile;
