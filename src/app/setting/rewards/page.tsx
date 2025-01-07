import React from 'react';

const PointsCouponsPage = () => {
  return (
    <>
      <div className="w-full bg-slate-300 p-6 rounded-xl">
        <p className="text-3xl">
          <strong className="text-4xl">100000</strong> pts
        </p>
        <p className="text-xs">*30000 points will be expired in 12 January 2025</p>
      </div>
      <div className="flex flex-wrap">
        <div className="w-56 h-32 bg-slate-200 p-4">
          <p>Coupon 50% All events</p>
          <p>expired on 12 January 2025</p>
          <p>min transaction: 30k</p>
        </div>
      </div>
    </>
  );
};

export default PointsCouponsPage;
