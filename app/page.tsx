import Image from "next/image";
import OwanbeWebLayout from "./components/WebLayout/OwanbeWebLayout";

export default function Home() {
  return (
    <OwanbeWebLayout>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900">Owanbe Web</h1>
      </div>
    </OwanbeWebLayout>
  );
}
