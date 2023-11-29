import Cube from "@/public/cube.svg";
import Polygon from "@/public/polygon.svg";
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
      "Filter events based on regions and states, bringing you closer to rich experiences right in your community.",
  },
];

export const ADVANTAGES: IFeatures[] = [
  {
    icon: Star,
    title: "Diverse Celebrations:",
    content:
      "Explore a rich tapestry of events, from weddings, Hangouts, Birthdays, music shows. Ostivities ensures there's a celebration for every taste.",
  },
  {
    icon: Cube,
    title: "Community Connection:",
    content:
      "Forge meaningful connections by joining and creating events that resonate with your inner spirit. Ostivities is where like-minded individuals unite!",
  },
  {
    icon: Star,
    title: "Secure Transactions:",
    content:
      "For paid and private events, trust our secure payment system, ensuring seamless transactions while you focus on enjoying the celebration.",
  },
];

export const ADVANTAGES_TWO: IFeatures[] = [
  {
    icon: Polygon,
    title: "Connect with Attendees:",
    content:
      "Engage with attendees, share details and make your event truly unforgettable. Ostivities is your canvas to paint the perfect celebration.",
  },
  {
    icon: Cube,
    title: "Localized Discovery:",
    content:
      "Filter events based on regions and states, bringing you closer to rich experiences right in your community.",
  },
  {
    icon: Polygon,
    title: "User-Friendly Security:",
    content:
      "Our robust security phase ensures a safe environment, where your celebrations are enjoyed responsibly.",
  },
  {
    icon: Cube,
    title: "Admin Oversight:",
    content:
      "Rest easy knowing our vigilant administrators maintain a vibrant and respectful community, ensuring the highest standards.",
  },
];

export const LEGAL: INavLinks[] = [
  { link: "/", name: "Terms of Use" },
  { link: "/", name: "Privacy Policy" },
  { link: "/", name: "Cookie Policy" },
];

export const SUPPORT: INavLinks[] = [
  { link: "/", name: "Account" },
  { link: "/", name: "Support Center" },
  { link: "/", name: "Feedback" },
];

export const Questions: string[] = [
  "How do I create an event on Ostivities?.",
  "How can I stay updated on Ostivities's Play Store release?.",
  "Can I customize my event's privacy settings on Ostivities?.",
  "Is Ostivities secure, especially for payment transactions?.",
  "What happens if my event details change after creation?.",
];

export const Answers: IFeatures[] = [
  {
    title: "How do I create an event on Ostivities?",
    content:
      "Creating an event is simple — just navigate to the event section, fill in details, and share the joy with attendees.",
  },
  {
    title: "How can I stay updated on Ostivities's Play Store release?",
    content:
      "Follow our social media and visit our website for updates. Get ready to download and dive into cultural festivities! 🎉 #StayTunedForOstivities",
  },
  {
    title: "Can I customize my event's privacy settings on Ostivities?",
    content:
      "Customize your event's privacy settings on Ostivities. Whether public or Private, you have full control over who joins and sees the details.",
  },
  {
    title: "Is Ostivities secure, especially for payment transactions?",
    content:
      "Absolutely, we prioritize your security. For paid events, our trusted payment system ensures seamless and safe transactions.",
  },
  {
    title: "What happens if my event details change after creation?",
    content:
      "No worries! You can easily update your event details. Keep your attendees informed by making necessary changes and ensuring everyone is on the same page.",
  },
];
