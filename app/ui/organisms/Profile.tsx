import H4 from "../atoms/H4";
import Input from "../atoms/Input";

const Profile = () => {
  return (
    <form className="px-12">
      <H4 content="Profile" className="mb-10" />

      <div className="flex justify-between mb-10">
        <Input label="Account Type" className="flex-[0.8]" />
        <Input label="Email Address" className="flex-[0.8]" />
      </div>
      <Input label="Reg Business Name" className="flex-[0.35]" />
    </form>
  );
};

export default Profile;
