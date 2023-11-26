import Cube from "@/public/cube.svg";
import Star from "@/public/star.svg";
import { IFeatures, INavLinks } from "./interface";

export const NAV_LINKS: INavLinks[] = [
  { link: "/", name: "Home" },
  { link: "/", name: "Features" },
  { link: "/", name: "FAQs" },
  { link: "/", name: "Contact" },
];

export const FEATURES: IFeatures[] = [
  {
    icon: Star,
    title: "Instant Invitation cards and Ticketing Made Easy",
    content:
      "Be the architect of your celebration! Create invitation cards and Get event tickets effortlessly with our user-friendly event creation tools.",
  },
  {
    icon: Cube,
    title: "Secure Access with Barcodes:",
    content:
      "For paid and Private events, our barcode system guarantees secure access, making entry hassle-free for you and your guests.",
  },
  {
    icon: Star,
    title: "Localized Discovery:",
    content:
      "Filter events based on regions and states, bringing you closer to culturally rich experiences right in your community.",
  },
];
