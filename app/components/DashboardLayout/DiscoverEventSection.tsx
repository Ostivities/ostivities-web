import { ForwardOutlined } from '@ant-design/icons';
import Link from 'next/link';
import React from 'react';
import Select, { StylesConfig } from "react-select";
import { useRouter } from "next/navigation";

interface PropsI {
  title: string;
  uri?: string;
  children: React.ReactNode;
  titleClass?: string;  // Add the optional titleClass prop
  style?: React.CSSProperties; 
}

const EventSection: React.FC<PropsI> = ({ title, uri, children, titleClass = 'font-bricolage-grotesque font-semibold text-2xl mb-6', style }) => {
  const childrenArray = React.Children.toArray(children);
  const limitedChildren = childrenArray.slice(0, 5); // Get the first 6 children
  const router = useRouter();

  const options = [
    { value: "Wedding", label: "Wedding" },
    { value: "Birthday", label: "Birthday" },
    { value: "Concert", label: "Concert" },
    { value: "Paint & Sip", label: "Paint & Sip" },
    { value: "Hangout", label: "Hangout" },
    { value: "Carnival", label: "Carnival" },
    { value: "Seminar", label: "Seminar" },
    { value: "Conference", label: "Conference" },
    { value: "Tech Event", label: "Tech Event" },
    { value: "Art Exhibition", label: "Art Exhibition" },
    { value: "Holiday Camp", label: "Holiday Camp" },
    { value: "Others", label: "Others" },
  ];

  // Type for custom styles in react-select
  const customStyles: StylesConfig = {
    control: (base) => ({
      ...base,
      borderRadius: '12px', // Rounded corners
      borderColor: '#ccc', // Border color
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
      fontFamily: "'Bricolage Grotesque', sans-serif", // Custom font
      fontSize: '14px',
      padding: '2px 8px', // Adjust padding to make it more compact
      height: '30px', // Set a custom height for the search bar
      display: 'flex',
      alignItems: 'center', // Vertically center the text inside the control
      lineHeight: '20px', // Adjust line-height to vertically center the text
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: "8px", // Rounded corners for the dropdown menu
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Bricolage Grotesque', sans-serif",
    }),
    option: (base: any, { isFocused }: any) => ({
      ...base,
      backgroundColor: isFocused ? "#f0f0f0" : "#fff", // Highlight color on hover
      color: "#333", // Text color
      fontFamily: "'Bricolage Grotesque', sans-serif",
      fontSize: "14px",
      padding: "5px 10px", // Added padding on the left side
      paddingLeft: "15px", // Left padding specifically
    }),
    placeholder: (base: any) => ({
      ...base,
      fontFamily: "'Bricolage Grotesque', sans-serif",
      color: "#aaa",
    }),
  };

  const handleChange = (selectedOption: any) => {
    if (selectedOption) {
      router.push(`/discover/search?query=${selectedOption.value}`);
    }
  };

  return (
    <section>
    <div className="flex items-center justify-between mb-8">
      <h2 className={`${titleClass} text-xl md:text-2xl `} style={style}>{title}</h2>
      
      <div className="sm:w-94 md:w-64 flex-shrink-0">  {/* Ensure it doesn't shrink */}
        <Select
          options={options}
          placeholder="Search events"
          styles={customStyles} // This is correct for styling
          onChange={handleChange}
        />
      </div>

      {/* {uri && (
        <Link href={uri} className="font-bricolage-grotesque font-semibold text-OWANBE_PRY">
          See More {<ForwardOutlined />}
        </Link>
      )} */}
    </div>
    <div className="flex gap-4 overflow-x-auto">{limitedChildren}</div>
  </section>
);
};

export default EventSection;
