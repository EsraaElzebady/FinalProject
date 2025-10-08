import React from "react";

export default function ShippingProgress({ subtotal }) {
  const FREE_SHIPPING_LIMIT = 100; // threshold
  const progress = Math.min((subtotal / FREE_SHIPPING_LIMIT) * 100, 100);
  const remaining = Math.max(FREE_SHIPPING_LIMIT - subtotal, 0).toFixed(2);

  return (
    <div className="my-6 px-30">
      <p className="text-center text-sm">
        {remaining > 0 ? (
          <>
            Spend <span className="font-bold">${remaining}</span> more to reach free shipping!
          </>
        ) : (
          <span className="font-bold text-green-600">You unlocked free shipping! 🎉</span>
        )}
      </p>

      {/* Progress Bar */}
      <div className="relative w-full h-3 mt-3 rounded-full bg-gray-200 overflow-hidden">
        <div
          className="absolute left-0 top-[0] h-3 bg-gradient-to-r from-yellow-400 to-yellow-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Icon positioned on progress */}
      <div
        className="absolute flex items-center justify-center w-6 h-6 rounded-full bg-white border border-yellow-400 text-yellow-500 text-xs"
        style={{
          left: `calc(${progress}% - 12px)`, // center the icon
          top: "-20px", // adjust vertical alignment
          position: "relative",
        }}
      >
<span className="inline-block scale-x-[-1]">🚚</span>
</div>
    </div>
  );
}
