export default function HowItWorks() {
  return (
    <div className="w-11/12 mx-auto mt-32">
      <h1 className="font-bold text-center text-xl md:text-[48px]">
        How It Works
      </h1>
      <p className="text-center mt-5">
        From template selection to live portfolio in under 10 minutes
      </p>
      <div className="flex justify-center">
        <div className="mt-20 grid lg:grid-cols-2 gap-28">
          <div className="flex items-start gap-8">
            <div>
              <h1 className="font-bold text-5xl">01</h1>
            </div>
            <div>
              <h1 className="font-black text-2xl">Choose Your Template</h1>
              <p>
                Browse our collection by category and select a design that{" "}
                <br /> matches your style and profession.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-8">
            <div>
              <h1 className="font-bold text-5xl">02</h1>
            </div>
            <div>
              <h1 className="font-black text-2xl">Customize Your Content</h1>
              <p>
                Add your projects, write your bio, upload images, and
                personalize <br /> colors – all with simple clicks.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-8">
            <div>
              <h1 className="font-bold text-5xl">03</h1>
            </div>
            <div>
              <h1 className="font-black text-2xl">Publish Instantly</h1>
              <p>
                Click publish and get your custom URL. Your portfolio is live
                and <br /> ready to share with the world.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-8">
            <div>
              <h1 className="font-bold text-5xl">04</h1>
            </div>
            <div>
              <h1 className="font-black text-2xl">Share & Grow</h1>
              <p>
                Share your portfolio URL anywhere. Track visitors and update
                your <br /> work anytime to keep it fresh.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
