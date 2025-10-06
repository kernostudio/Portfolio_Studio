import React from "react";

export default function ExceptionalWork() {
  return (
    <div className="w-11/12 mx-auto mt-32">
      <h1 className="text-center font-bold text-xl md:text-[40px]">
        Features That Set Us Apart
      </h1>
      <div className="grid lg:grid-cols-3 mt-20 gap-5">
        <div className="bg-white rounded-xl py-7 shadow-xs">
          <h1 className="text-center text-xl font-bold">Custom Domain</h1>
          <p className="text-center mt-3">
            Connect your own domain or use our free <br /> subdomain with SSL
            certificate included.
          </p>
        </div>
        <div className="bg-white rounded-xl py-7 shadow-xs">
          <h1 className="text-center text-xl font-bold">Real-Time Preview</h1>
          <p className="text-center mt-3">
            See exactly how your portfolio looks as you <br /> edit. No
            surprises when you publish.
          </p>
        </div>
        <div className="bg-white rounded-xl py-7 shadow-xs">
          <h1 className="text-center text-xl font-bold">Image Optimization</h1>
          <p className="text-center mt-3">
            We automatically optimize your images for <br /> fast loading
            without quality loss.
          </p>
        </div>
      </div>
    </div>
  );
}
