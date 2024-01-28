import * as React from "react";
import { SVGProps } from "react";
const FilterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    fill="none"
    {...props}
  >
    <path
      fill="#989C9F"
      d="M4.125 6.688 1 2H.375V.75h11.25V2H11L7.875 6.688V12h-3.75V6.687ZM2.502 2l2.873 4.309v4.441h1.25V6.309L9.498 2H2.503Z"
    />
  </svg>
);
export default FilterIcon;
