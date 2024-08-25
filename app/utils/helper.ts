import { message } from "antd";
import { AxiosError, AxiosResponse } from "axios";

export const generateRandomString = (length: number): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
};

const eventNames = [
  "Music Concert",
  "Art Exhibition",
  "Tech Conference",
  "Food Festival",
  "Sports Meet",
  "Charity Gala",
  "Comedy Show",
  "Theater Play",
  "Film Screening",
  "Book Fair",
];

// Function to get a random event name from the array
export const getRandomEventName = () =>
  eventNames[Math.floor(Math.random() * eventNames.length)];

export const getRandomNigerianPhoneNumber = (): string => {
  const prefixes = ["070", "080", "081", "090", "091"];
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];

  const getRandomDigit = () => Math.floor(Math.random() * 10);

  const lineNumber = `${getRandomDigit()}${getRandomDigit()}${getRandomDigit()}${getRandomDigit()}${getRandomDigit()}${getRandomDigit()}${getRandomDigit()}`;

  return `${randomPrefix}${lineNumber}`;
};

export const getRandomName = (): string => {
  const firstNames: string[] = [
    "James",
    "Mary",
    "John",
    "Patricia",
    "Robert",
    "Jennifer",
    "Michael",
    "Linda",
    "William",
    "Elizabeth",
    "David",
    "Barbara",
    "Richard",
    "Susan",
    "Joseph",
    "Jessica",
    "Thomas",
    "Sarah",
    "Charles",
    "Karen",
    "Christopher",
    "Nancy",
    "Daniel",
    "Lisa",
    "Matthew",
    "Betty",
    "Anthony",
    "Margaret",
    "Donald",
    "Sandra",
    "Mark",
    "Ashley",
  ];

  const lastNames: string[] = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzalez",
    "Wilson",
    "Anderson",
    "Thomas",
    "Taylor",
    "Moore",
    "Jackson",
    "Martin",
    "Lee",
    "Perez",
    "Thompson",
    "White",
    "Harris",
    "Sanchez",
    "Clark",
    "Ramirez",
    "Lewis",
    "Robinson",
    "Walker",
  ];

  const randomFirstName: string =
    firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName: string =
    lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${randomFirstName} ${randomLastName}`;
};

export const successFormatter = (data: AxiosResponse) => {
  message.success(data?.data?.message);
};

export const errorFormatter = (error: AxiosError | any) => {
  const errorMessage = error?.response?.data?.message;
  typeof errorMessage === "string"
    ? message.error(error?.response?.data?.message)
    : message.error(error?.response?.data?.message?.[0]);
};
