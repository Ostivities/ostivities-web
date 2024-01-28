import * as React from "react";
import { SVGProps } from "react";
const SortIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={11}
    height={12}
    fill="none"
    {...props}
  >
    <path fill="#989C9F" d="m.375 7 5 5 5-5M10.375 5l-5-5-5 5" />
  </svg>
);
export default SortIcon;
