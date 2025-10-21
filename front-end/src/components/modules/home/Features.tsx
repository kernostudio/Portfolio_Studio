export default function Features() {
  return (
    <div className="w-11/12 mx-auto pt-32">
      <h1 className="md:text-[40px] text-xl text-center">
        Why Choose <span className="font-semibold">Portfolio</span>{" "}
        <span className="font-bold">Studio</span>
      </h1>
      <p className="text-center mt-5 md:text-xl ">
        Our users report a 90% higher chance of getting job interviews with{" "}
        <br /> CVs created using Portfolio Studio templates.
      </p>
      <div className=" flex justify-center">
        <div className="mt-16 grid  grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 justify-center">
          <div className="bg-[#e9f4ff] border-4 h-[154px] w-[154px] border-white rounded-2xl">
            <div className="bg-white h-1 mt-7"></div>
            <div className="flex mt-5 justify-center">
              <div>
                <p className="text-2xl text-center font-bold">90%</p>
                <p className="text-gray-600 text-center">Job Interview Rate</p>
              </div>
            </div>
          </div>
          <div className="bg-[#e9f4ff] border-4 h-[154px] w-[154px] border-white rounded-2xl">
            <div className="bg-white h-1 mt-7"></div>
            <div className="flex mt-5 justify-center">
              <div>
                <p className="text-2xl text-center font-bold">50K+</p>
                <p className="text-gray-600 text-center">CVs Created</p>
              </div>
            </div>
          </div>
          <div className="bg-[#e9f4ff] border-4 h-[154px] w-[154px] border-white rounded-2xl">
            <div className="bg-white h-1 mt-7"></div>
            <div className="flex mt-5 justify-center">
              <div>
                <p className="text-2xl text-center font-bold">25+</p>
                <p className="text-gray-600 text-center">
                  Professional Templates
                </p>
              </div>
            </div>
          </div>{" "}
          <div className="bg-[#e9f4ff] border-4 h-[154px] w-[154px] border-white rounded-2xl">
            <div className="bg-white h-1 mt-7"></div>
            <div className="flex mt-5 justify-center">
              <div>
                <p className="text-2xl text-center font-bold">4.9</p>
                <p className="text-gray-600 text-center">User Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
