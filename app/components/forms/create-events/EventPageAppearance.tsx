import React, { useState } from 'react';
import { Space, Upload, message } from 'antd';
import { CameraFilled } from '@ant-design/icons';
import Image from 'next/image';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';

const EventPageAppearance: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>("/images/emptyimage2.png");

  const handleUpload: UploadProps['onChange'] = (info) => {
    const { file } = info;

    // Check if file and file size are defined
    if (!file || !file.size) {
      return false; // Or handle the error as needed
    }

    // Check file format and size
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt10M = file.size / 1024 / 1024 < 10;
  
    if (!isJpgOrPng) {
      message.error('You can only upload JPEG or PNG files!');
      return false;
    }
    if (!isLt10M) {
      message.error('Image must be smaller than 10MB!');
      return false;
    }

    if (info.file.status === 'done') {
      const reader = new FileReader();
      reader.readAsDataURL(info.file.originFileObj as RcFile);
      reader.onload = () => {
        if (reader.result) {
          setImageUrl(reader.result as string);
          message.success(`${info.file.name} Event Image Updated successfully`);
        }
      };
    }
  };


  return (
    <Space direction="vertical" size={"large"}>
      <Space direction="vertical" size={"small"}></Space>
      <div className="flex gap-12">
        <div className="relative w-[424px] h-[520px] rounded-[3.125rem] overflow-hidden">
          <Image
            src={imageUrl}
            alt="Event Image"
            fill
            style={{ objectFit: "cover" }}
            className=""
          />
          <Upload
            showUploadList={false}
            onChange={handleUpload}
            className="absolute top-2 right-2 z-10"
          >
            <button className="bg-white p-4 rounded-full shadow flex items-center justify-center">
            <CameraFilled style={{ fontSize: '24px', color: '#e20000', background: 'none' }} />
            </button>
          </Upload>
        </div>
        <div className="py-8">
          <h2 className="font-semibold text-2xl">About this event</h2>
          <div className="mt-12 flex flex-col gap-12">
            <div className="flex gap-3 items-center">
              <div className="bg-OWANBE_PRY/20 p-2 rounded-xl flex items-center justify-center">
                <Image
                  src="/icons/calendar.svg"
                  alt=""
                  height={30}
                  width={30}
                />
              </div>
              <div>
                <div className="text-sm" style={{ fontWeight: 600 }}>Date</div>
                <div>xx xxxx, xxxx</div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="bg-OWANBE_PRY/20 p-2 rounded-xl flex items-center justify-center">
                <Image src="/icons/time.svg" alt="" height={30} width={30} />
              </div>
              <div>
                <div className="text-sm" style={{ fontWeight: 600 }}>Time</div>
                <div>xx:xx - xx:xx</div>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="bg-OWANBE_PRY/20 p-2 rounded-xl flex items-center justify-center">
                <Image
                  src="/icons/location.svg"
                  alt=""
                  height={30}
                  width={30}
                />
              </div>
              <div>
                <div className="text-sm" style={{ fontWeight: 600 }}>Location</div>
                <div>xxxxxxxx</div>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="bg-OWANBE_PRY/20 p-2 rounded-xl flex items-center justify-center">
                <Image src="/icons/phone.svg" alt="" height={30} width={30} />
              </div>
              <div>
                <div className="text-sm" style={{ fontWeight: 600 }}>Contact Us</div>
                <div className="flex items-center gap-4 mt-1">
                  <div className="bg-black w-6 h-6 rounded-full flex items-center justify-center">
                    <Image
                      src="/icons/instagram.svg"
                      alt=""
                      height={14}
                      width={14}
                    />
                  </div>
                  <div className="bg-black w-6 h-6 rounded-full flex items-center justify-center">
                    <Image src="/icons/x.svg" alt="" height={14} width={14} />
                  </div>
                  <div className="bg-black w-6 h-6 rounded-full flex items-center justify-center">
                    <Image
                      src="/icons/facebook.svg"
                      alt=""
                      height={10}
                      width={10}
                    />
                  </div>
                  <div className="bg-black w-6 h-6 rounded-full flex items-center justify-center">
                    <Image
                      src="/icons/youtube.svg"
                      alt=""
                      height={16}
                      width={16}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 h-fit my-auto border-l border-black px-5" style={{ marginTop: '150px' }}>
          <p>
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum 
            Lorem ipsum Lorem 
          </p>
        </div>
      </div>
    </Space>
  );
};

export default EventPageAppearance;
