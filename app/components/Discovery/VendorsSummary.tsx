'use client';

import Link from 'next/link';
import { useState } from 'react';
import { global } from "styled-jsx/css";
import "@/app/globals.css";
import { Heading5 } from '../typography/Typography';
import { ForwardOutlined, PlusCircleOutlined, PlusOutlined, PlusSquareOutlined } from '@ant-design/icons';

interface SummaryProps {
  continueBtn?: boolean;
  to?: string | any;
  paymentBtn?: boolean;
}

const Summary = ({ continueBtn, to, paymentBtn }: SummaryProps) => {
  const [showInput, setShowInput] = useState(false);


  return (
    <section className="flex-1">
      <Heading5 className="text-3xl text-center" content={"Summary"} />
      <section className="mt-14 px-20 h-4/5 border-l border-[#525252]">
        <div>
          <h3 className="text-OWANBE_PRY text-lg font-BricolageGrotesqueRegular">Event name</h3>
          <span className="text-OWANBE_FADE text-s font-BricolageGrotesqueRegular">Concert with Davido</span>
        </div>
        <div className="mt-3">
              </div>
              <div className="flex-center gap-3 w-full mt-3">
                
        </div>
        <div>
          <div className="mt-3 border-b border-[#525252] pb-10">
            <h3 className="text-OWANBE_PRY text-lg font-BricolageGrotesqueRegular">Payment details</h3>
            <div className="flex flex-col gap-2 mt-2 text-OWANBE_FADE text-s font-BricolageGrotesqueRegular">
              <div className="flex-center justify-between">
                <div>Exhibition Space x 2</div>
                <div>₦50,000.00</div>
              </div>
              <div className="flex-center justify-between">
                <div>Fees</div>
                <div>₦500.00</div>
              </div>
              <div className="flex-center justify-between">
                <div>Subtotal</div>
                <div>₦50,500.00</div> {/* Adjust this based on your calculation */}
              </div>
            </div>
          </div>
          <div className="flex-center justify-between font-BricolageGrotesqueMedium text-2xl text-OWANBE_PRY my-6">
            <div>Total</div>
            <div>₦25,500.00</div> {/* Adjust this based on your calculation */}
          </div>
          {continueBtn && (
            <div className="flex justify-center mt-12 mb-6 w-full">
              <Link href={to} className="primary-btn hover:none w-full text-center">
                Continue
              </Link>
            </div>
          )}
          {paymentBtn && (
            <div className="flex justify-center mt-12 mb-6 w-full">
              <button className="primary-btn w-full">Make Payment</button>
            </div>
          )}
        </div>
      </section>
    </section>
  );
};

export default Summary;