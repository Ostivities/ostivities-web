import Button from "../../atoms/Button";
import H4 from "../../atoms/H4";
import Input from "../../atoms/Input";

const OrganizationProfile = () => {
  return (
    <form className="px-12 flex flex-col items-center py-5">
      <H4 content="Profile" className="mb-10 self-start" />

      <div className="grid grid-cols-2 gap-x-14 items-start w-full">
        <div className="grid gap-y-9">
          <Input label="Account Type" className="ml-14" />
          <Input label="Business Name" className="ml-12" />
        </div>

        <div className="grid gap-y-9">
          <Input label="Email Address" className="ml-12" />
          <Input label="Phone Number" className="ml-11" />
        </div>
      </div>

      <H4
        content="Update Password"
        className="text-base text-OWANBE_PRY font-BricolageGrotesqueRegular mt-10 mb-8 self-start"
      />
      <div className="grid grid-cols-2 gap-x-14 items-end w-full">
        <div className="grid gap-y-9">
          <Input label="Old Password" className="ml-14" type="password" />
          <Input label="New Password" className="ml-12" type="password" />
        </div>

        <Input label="Confirm Password" className="ml-12" type="password" />
      </div>

      <Button
        label="Save"
        size="lg"
        className="mt-16 max-w-xs font-BricolageGrotesqueBold"
      />
    </form>
  );
};

export default OrganizationProfile;
