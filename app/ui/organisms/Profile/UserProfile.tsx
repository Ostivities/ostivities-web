import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Button from '../../atoms/Button';
import H4 from '../../atoms/H4';
import Input from '../../atoms/Input';

const UserProfile = () => {
  const { control, handleSubmit } = useForm();

  const inputStyle = {
    height: '40px',
    padding: '8px 12px',
    fontSize: '14px',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    transition: 'border-color 0.3s',
    width: '100%',
  };

  const onSubmit = (data: any) => {
    console.log(data); // Handle form submission logic here
  };

  return (
    <div style={{ maxWidth: '1100px', marginLeft: '50px' }}>
      <form className="w-full flex flex-col space-y-6 px-8 py-5" onSubmit={handleSubmit(onSubmit)}>

        <div className="grid grid-cols-2 gap-x-14 w-full">
          <div className="grid gap-y-6">
            <Controller
              name="accountType"
              control={control}
              render={({ field }) => (
                <div className="input-container">
                  <label className="input-label">Account Type</label>
                  <Input
                    {...field}
                    placeholder="Individual"
                    style={inputStyle}
                    className="input-field"
                    disabled // Ensure disabled prop is passed correctly
                  />
                </div>
              )}
              rules={{ required: "Please enter the account type" }}
            />
            {/* Repeat for other fields */}
          </div>

          <div className="grid gap-y-6">
            {/* Add other Controller instances for email, phone number, etc. */}
          </div>
        </div>

        <H4
          content="Update Password"
          className="text-base text-OWANBE_PRY font-BricolageGrotesqueRegular mt-10 mb-8 self-start"
        />

        <div className="grid grid-cols-2 gap-x-14 w-full">
          <div className="grid gap-y-6">
            {/* Add Controller instances for oldPassword, newPassword, etc. */}
          </div>

          <Controller
            name="repeatPassword"
            control={control}
            render={({ field }) => (
              <div className="input-container">
                <label className="input-label">Repeat Password</label>
                <Input
                  {...field}
                  type="password"
                  placeholder="Repeat New Password"
                  style={inputStyle}
                  className="input-field"
                />
              </div>
            )}
            rules={{ required: "Please confirm your new password" }}
          />
        </div>

        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Button
            label="Save"
            size="lg"
            className="font-BricolageGrotesqueSemiBold font-bold custom-button equal-width-button"
            style={{ marginBottom: '20px' }}
          />
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
