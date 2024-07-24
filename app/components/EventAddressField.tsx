import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Modal, Input, Button, Space } from 'antd';
import Map from './map'; // Ensure you have the correct path to your Map component

const EventAddressField = () => {
  const { control, setValue } = useForm();
  const [isMapVisible, setIsMapVisible] = useState(false);

  const openMap = () => {
    setIsMapVisible(true);
  };

  const handleMapOk = (address: string) => {
    setValue("eventAddress", address); // Update the form field value
    setIsMapVisible(false); // Close the map overlay
  };

  const handleMapCancel = () => {
    setIsMapVisible(false); // Close the map overlay
  };

  return (
    <div>
      <Controller
        name="eventAddress"
        control={control}
        render={({ field }) => (
          <Space direction="vertical" size={"small"}>
            <label htmlFor="eventAddress">Event Address</label>
            <Space direction="horizontal" size={"small"}>
              <Input {...field} placeholder="Enter Address" />
              <Button type="primary" onClick={openMap}>Select from Map</Button>
            </Space>
            <Modal
              title="Select Address from Map"
              visible={isMapVisible}
              onOk={() => handleMapOk(field.value)}
              onCancel={handleMapCancel}
              okText="Select"
              cancelText="Cancel"
            >
              <Map onSelectAddress={handleMapOk} />
            </Modal>
          </Space>
        )}
      />
    </div>
  );
};

export default EventAddressField;
