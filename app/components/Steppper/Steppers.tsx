"use client";
import { useFormContext } from '@/app/contexts/form-context/FormContext';
import { MdOutlineEdit } from 'react-icons/md';
import { IoImageOutline, IoTicketOutline } from 'react-icons/io5';
import { Steps } from 'antd';
import React from 'react';
import { Label } from '../typography/Typography';

function Steppers(): JSX.Element {
  const { formState } = useFormContext();

  const stepsCount = formState?.stages?.length || 3; // Handle potential missing stages

  return (
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
    >
      {/* Customizing the line between steps */}
      <Steps.Step status={formState?.stage >= 1 ? 'finish' : 'wait'} />
      <Steps.Step status={formState?.stage >= 2 ? 'finish' : 'wait'} />
    </Steps>
  );
}

export default Steppers;
