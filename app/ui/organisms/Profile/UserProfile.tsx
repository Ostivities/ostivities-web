import Button from "../../atoms/Button";
import H4 from "../../atoms/H4";
import Input from "../../atoms/Input";
import { Controller } from "react-hook-form";
import "@/app/globals.css";

const UserProfile = () => {
  const inputStyle = {
    height: "40px", // Adjust the height as needed
    padding: "8px 12px",
    fontSize: "14px",
    border: "1px solid #d9d9d9",
    borderRadius: "4px",
    transition: "border-color 0.3s",
    width: "100%", // Ensure the input takes up the full width of the container
  };

  const inputFocusStyle = {
    borderColor: "#40a9ff",
    outline: "none",
    boxShadow: "0 0 0 2px rgba(24, 144, 255, 0.2)",
  };

  return (
    <form className="px-12 flex flex-col items-center py-5">
      <H4 content="Profile" className="mb-10 self-start" />

      <div className="grid grid-cols-2 gap-x-14 items-start w-full">
        <div className="grid gap-y-9">
          <Controller
            name="accountType"
            render={({ field }) => (
              <div className="input-container">
                <label className="input-label">Account Type</label>
                <Input
                  {...field}
                  placeholder="Enter Account Type"
                  style={inputStyle}
                  className="input-field"
                />
              </div>
            )}
          />
          <Controller
            name="firstName"
            render={({ field }) => (
              <div className="input-container">
                <label className="input-label">First Name</label>
                <Input
                  {...field}
                  placeholder="Enter First Name"
                  style={inputStyle}
                  className="input-field"
                />
              </div>
            )}
          />
          <Controller
            name="lastName"
            render={({ field }) => (
              <div className="input-container">
                <label className="input-label">Last Name</label>
                <Input
                  {...field}
                  placeholder="Enter Last Name"
                  style={inputStyle}
                  className="input-field"
                />
              </div>
            )}
          />
        </div>

        <div className="grid gap-y-9">
          <Controller
            name="email"
            render={({ field }) => (
              <div className="input-container">
                <label className="input-label">Email Address</label>
                <Input
                  {...field}
                  placeholder="Enter Email Address"
                  style={inputStyle}
                  className="input-field"
                />
              </div>
            )}
          />
          <Controller
            name="phoneNumber"
            render={({ field }) => (
              <div className="input-container">
                <label className="input-label">Phone Number</label>
                <Input
                  {...field}
                  placeholder="Enter Phone Number"
                  style={inputStyle}
                  className="input-field"
                />
              </div>
            )}
          />
        </div>
      </div>

      <H4
        content="Update Password"
        className="text-base text-OWANBE_PRY font-BricolageGrotesqueRegular mt-10 mb-8 self-start"
      />
      <div className="grid grid-cols-2 gap-x-14 items-end w-full">
        <div className="grid gap-y-9">
          <Controller
            name="oldPassword"
            render={({ field }) => (
              <div className="input-container">
                <label className="input-label">Old Password</label>
                <Input
                  {...field}
                  type="password"
                  placeholder="Enter Old Password"
                  style={inputStyle}
                  className="input-field"
                />
              </div>
            )}
          />
          <Controller
            name="newPassword"
            render={({ field }) => (
              <div className="input-container">
                <label className="input-label">New Password</label>
                <Input
                  {...field}
                  type="password"
                  placeholder="Enter New Password"
                  style={inputStyle}
                  className="input-field"
                />
              </div>
            )}
          />
        </div>

        <Controller
          name="repeatPassword"
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
        />
      </div>

      <Button
        label="Save"
        size="lg"
        className="mt-16 max-w-xs font-BricolageGrotesqueBold"
      />
    </form>
  );
};

export default UserProfile;
