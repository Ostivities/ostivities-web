import { ToggleSwitchAttributes } from "@/app/lib/types/components";

const ToggleSwitch = ({
  description,
  label,
  isActive,
  onToggle,
}: ToggleSwitchAttributes) => {
  // Correctly handle the change event and call onToggle with the checked value
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggle(e.target.checked); // Pass the boolean value to onToggle
  };

  return (
    <div className="flex gap-x-3 items-center">
      <label
        htmlFor={label}
        className="flex cursor-pointer relative w-12 h-6 rounded-full"
      >
        <input
          type="checkbox"
          id={label}
          className="sr-only peer"
          checked={isActive}
          onChange={handleChange} // Use handleChange to call onToggle
        />
        <span className="bg-[#D0D4D4] w-full h-full absolute rounded-full peer-checked:bg-OWANBE_PRY transition-all duration-300" />
        <span className="w-2/5 h-4/5 bg-white absolute rounded-full left-1 top-[0.15rem] peer-checked:left-6 transition-all duration-300" />
      </label>

      <p className="font-BricolageGrotesqueRegular text-base">{description}</p>
    </div>
  );
};

export default ToggleSwitch;


