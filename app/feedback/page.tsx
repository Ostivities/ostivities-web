import OwanbeWebLayout from "@/app/components/WebLayout/OwanbeWebLayout";
import soon from "@/public/feedback.svg";
import Image from "next/image";
import Link from "next/link"; // Fixed import
import AuthLayout from '@/app/components/feedbacklayout/feedbacklayout';
import Feedbackform from "../components/forms/FeedbackForm";
import { Small, Heading5 } from "../components/typography/Typography";

function Feedback(): JSX.Element {
  return (
    <OwanbeWebLayout>
      <section className="overflow-hidden">
        <Image
          src={soon}
          alt="RefundPolicy"
          style={{ width: "100%", height: "auto", marginTop: "60px" }}
        />
        
        <div className="flex flex-col space-y-8">
          <span>
            <Link href="/signin">
              
            </Link>
          </span>
          <br />
          <br />
          <div className="w-4/5 mx-auto flex flex-col space-y-8">
            <Heading5 content="Fill the form to submit your feedback" />
            <Feedbackform />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </section>
    </OwanbeWebLayout>
  );
}

export default Feedback;
