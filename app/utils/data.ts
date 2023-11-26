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

export const ADVANTAGES: IFeatures[] = [
  {
    icon: Star,
    title: "Diverse Celebrations:",
    content:
      "Explore a rich tapestry of events, from weddings, Hangouts, Birthdays, music shows. Ówànbè ensures there's a celebration for every taste.",
  },
  {
    icon: Cube,
    title: "Community Connection:",
    content:
      "Forge meaningful connections by joining and creating events that resonate with your cultural spirit. Ówànbè is where like-minded individuals unite!",
  },
  {
    icon: Star,
    title: "Secure Transactions:",
    content:
      "For paid and private events, trust our secure payment system, ensuring seamless transactions while you focus on enjoying the celebration.",
  },
];
