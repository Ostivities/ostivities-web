import DashboardLayout from '@/app/components/DashboardLayout/DashboardLayout';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Payment = () => {
  const router = useRouter();
  const title = (
    <div className="flex-center gap-2">
      <Image
        src="/icons/back-arrow.svg"
        alt=""
        height={30}
        width={30}
        onClick={() => router.back()}
        className="cursor-pointer"
      />

      <h1>Concert with davido</h1>
    </div>
  );
  return <DashboardLayout title={title}></DashboardLayout>;
};

export default Payment;
