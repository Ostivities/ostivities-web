"use client";
import React from 'react';
import { Steps } from 'antd';
import { MdOutlineEdit } from 'react-icons/md';
import { IoImageOutline, IoTicketOutline } from 'react-icons/io5';
import { useFormContext } from '@/app/contexts/form-context/FormContext';
import { Label } from '../typography/Typography';

function Steppers(): JSX.Element {
  const { formState } = useFormContext();

  const stepsCount = formState?.stages?.length || 3; // Handle potential missing stages

  return (
    <>
       <style>
        {`
          /* Change color for lines after finished and processing steps */
          .ant-steps-item-finish .ant-steps-item-tail::after,
          .ant-steps-item-process .ant-steps-item-tail::after {
            background-color: #e20000 !important;
          }

          /* Change color for the icon border in finished and processing steps */
          .ant-steps-item-process .ant-steps-item-icon,
          .ant-steps-item-finish .ant-steps-item-icon {
            border-color: #e20000 !important;
          }

          /* Ensure lines before the current step are also colored correctly */
          .ant-steps-item-finish + .ant-steps-item .ant-steps-item-tail::after {
            background-color: #e20000 !important;
          }
        `}
      </style>
      <Steps
        responsive
        current={formState?.stage}
        direction="horizontal"
        labelPlacement="vertical"
        className="mx-auto"
        style={{ width: '500px' }}
        items={[
          {
            title: <Label content="Event Details" />,
            description: '',
            className: 'font-BricolageGrotesqueRegular',
            icon: (
              <div
                style={{
                  width: '33px',
                  height: '33px',
                  background: '#E20000', // Fixed color for the first step icon
                  borderRadius: '100%',
                  padding: '7px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MdOutlineEdit
                  size={19}
                  color="#fff" // Fixed color for the first step icon
                />
              </div>
            ),
            status: 'process', // Always set status to 'process' for the first step
          },
          {
            title: <Label content="Event Page" />,
            description: '',
            className: 'font-BricolageGrotesqueRegular',
            icon: (
              <div
                style={{
                  width: '33px',
                  height: '33px',
                  background: formState?.stage >= 1 ? '#E20000' : '#fff', // Background color based on stage
                  borderRadius: '100%',
                  padding: '7px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IoImageOutline
                  size={19}
                  color={formState?.stage >= 1 ? '#fff' : '#000'} // Icon color based on stage
                />
              </div>
            ),
            status: formState?.stage === 1 ? 'process' : formState?.stage > 1 ? 'finish' : 'wait',
          },
          {
            title: <Label content="Tickets Creation" />,
            description: '',
            className: 'font-BricolageGrotesqueRegular',
            icon: (
              <div
                style={{
                  width: '33px',
                  height: '33px',
                  background: formState?.stage >= 2 ? '#E20000' : '#fff', // Background color based on stage
                  borderRadius: '100%',
                  padding: '7px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IoTicketOutline
                  size={19}
                  color={formState?.stage >= 2 ? '#fff' : '#000'} // Icon color based on stage
                />
              </div>
            ),
            status: formState?.stage === 2 ? 'process' : formState?.stage > 2 ? 'finish' : 'wait',
          },
        ]}
        size="default"
      />
    </>
  );
}

export default Steppers;

