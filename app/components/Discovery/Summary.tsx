'use client';

import Link from 'next/link';
import { useState } from 'react';

const Summary = ({ continueBtn }: { continueBtn?: boolean }) => {
  const [showInput, setShowInput] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountCode, setDiscountCode] = useState('');

  const handleAddDiscountClick = () => {
    setShowInput(true);
  };

  const handleApplyDiscount = () => {
    // Logic to apply the discount code (e.g., validate code, apply discount)
    setDiscountApplied(true);
  };

  return (
    <section className="flex-1">
      <h2 className="text-3xl text-center">Summary</h2>
      <section className="mt-14 px-20 h-4/5 border-l border-[#525252]">
        <div>
          <h3 className="text-OWANBE_PRY text-xl">Event name</h3>
          <span className="text-OWANBE_FADE">Concert with Davido</span>
        </div>
        <div className="mt-3">
          {!showInput && (
            <div
              onClick={handleAddDiscountClick}
              className="flex-center gap-2 text-OWANBE_PRY text-xl cursor-pointer"
            >
              <h3>Add discount code</h3>
            </div>
          )}
          {showInput && (
            <>
              <div className="mt-3">
                <h3 className="text-OWANBE_PRY text-xl">Enter discount code</h3>
              </div>
              <div className="flex-center gap-3 w-full mt-3">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="border border-[#888] rounded-[0.625rem] w-full py-1 px-3"
                />
                <button
                  onClick={handleApplyDiscount}
                  className="py-1 px-7 rounded-full bg-OWANBE_PRY font-semibold text-white"
                >
                  Add
                </button>
              </div>
              {discountApplied && (
                <span className="text-OWANBE_PRY text-xs block mt-2">
                  Discount code has been applied to checkout!
                </span>
              )}
            </>
          )}
        </div>
        <div>
          <div className="mt-3 border-b border-[#525252] pb-10">
            <h3 className="text-OWANBE_PRY text-xl">Payment details</h3>
            <div className="flex flex-col gap-2 mt-2 text-OWANBE_FADE">
              <div className="flex-center justify-between">
                <div>Ticket fee x 2 - Early Bird</div>
                <div>#10,000.00</div>
              </div>
              <div className="flex-center justify-between">
                <div>Fees</div>
                <div>#300.00</div>
              </div>
              <div className="flex-center justify-between">
                <div>Subtotal</div>
                <div>#10,300.00</div>
              </div>
            </div>
          </div>
          <div className="flex-center justify-between font-semibold text-2xl text-OWANBE_PRY my-6">
            <div>Total</div>
            <div>#10,300.00</div>
          </div>
          {continueBtn && (
            <div className="flex justify-center mt-12 mb-6">
              <Link href="/Dashboard/payment" className="primary-btn hover:none">
                Continue
              </Link>
            </div>
          )}
        </div>
      </section>
    </section>
  );
};

export default Summary;
