export default function Reviews() {
  return (
    <div id="blog" className="w-10/12 mx-auto mt-20">
      <h1 className=" text-xl text-center  lg:text-[36px]">
        Voice From <span className="font-bold">the world</span>
      </h1>
      <p className="lg:text-[18px] text-center mt-5 text-sm">
        What our users say after using Portfolio Studio and how <br /> it helped
        them improve their Resume
      </p>
      <div className="md:flex mt-10 bg-gradient-to-r from-[#f9fbff] via-[#e3f3ff] to-[#f9fbff] justify-between">
        <div>
          <div className="relative w-80 h-80 mx-auto mt-20">
            <div className="absolute inset-0 m-auto w-[120px] h-[120px] rounded-2xl overflow-hidden">
              <img
                src="https://i.ibb.co.com/p92DXVQ/middle.png"
                alt="Center"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute top-20 left-14 w-[42px] h-[42px] rounded-2xl overflow-hidden">
              <img
                src="https://i.ibb.co.com/Rp3g9wgF/top.png"
                alt="Top Left"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute top-10 right-20 w-[60px] h-[60px] rounded-2xl overflow-hidden">
              <img
                src="https://i.ibb.co.com/W4h4nJkM/topright.png"
                alt="Top Right"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute bottom-10 left-20 w-[60px] h-[60px] rounded-2xl overflow-hidden">
              <img
                src="https://i.ibb.co.com/GQxJDTtK/leftbottom.png"
                alt="Bottom Left"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute bottom-20 right-14 w-[42px] h-[42px] rounded-2xl overflow-hidden">
              <img
                src="https://i.ibb.co.com/bRCLj7hv/rightbottom.png"
                alt="Bottom Right"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <h1 className="flex items-center gap-2">
              <span className="font-semibold">Michelle V.</span>
              <span className="font-light">Sr. Digital Marketing Manager</span>
            </h1>

            <h1 className="flex items-center gap-2">
              <span className="font-semibold">Shiva V.</span>
              <span className="font-light">Senior Recruiter</span>
            </h1>

            <h1 className="flex items-center gap-2">
              <span className="font-semibold">Ken D.</span>
              <span className="font-light">Instructional Designer</span>
            </h1>

            <h1 className="flex items-center gap-2">
              <span className="font-semibold">Ken D.</span>
              <span className="font-light">Senior Recruiter</span>
            </h1>

            <h1 className="flex items-center gap-2">
              <span className="font-semibold">Ken D.</span>
              <span className="font-light">Senior Recruiter</span>
            </h1>
          </div>
        </div>

        <div className="mt-8">
          <div className="max-w-2xl mx-auto bg-white shadow-sm rounded-tl-2xl rounded-bl-2xl rounded-br-2xl p-6">
            <img src="https://i.ibb.co.com/QvsbjmXb/quote.png" alt="" />

            <p className="text-[16px] text-center">
              omg i cannot believe i am getting a interview after using this.
              the recommendations is well thought off. highly recommend everyone
              to use this website.
            </p>

            <div className="flex items-center gap-3 mt-5">
              <img
                src="https://i.ibb.co.com/C36wY2qM/michelb.png"
                alt="Michelle V."
                className="w-8 h-8 rounded-full"
              />
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Michelle V.</span>{" "}
                <span className="text-gray-500">
                  / Sr. Digital Marketing Manager
                </span>
              </p>
            </div>
          </div>

          <div className="max-w-[550px] mt-4 md:ml-30 mx-auto bg-white shadow-sm rounded-tl-2xl rounded-bl-2xl rounded-br-2xl p-6">
            <img src="https://i.ibb.co.com/QvsbjmXb/quote.png" alt="" />

            <p className="text-[16px] text-center">
              The custom resume feature saved me so much time and effort. It
              made sure my resume matched the job descriptions perfectly. I am
              gonna use it for every job I apply.
            </p>

            <div className="flex items-center gap-3 mt-5">
              <img
                src="https://i.ibb.co.com/5pRSKxH/shiva.png"
                alt="Shiva V."
                className="w-8 h-8 rounded-full"
              />
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Ken D.</span>{" "}
                <span className="text-gray-500">Senior Recruiter</span>
              </p>
            </div>
          </div>

          <div className="max-w-xl mt-4 md:ml-24 mx-auto bg-white shadow-sm rounded-tl-2xl rounded-bl-2xl rounded-br-2xl p-6">
            <img src="https://i.ibb.co.com/QvsbjmXb/quote.png" alt="" />

            <p className="text-[16px] text-center">
              Really easy to use and understand. I loved how I could take direct
              action on suggestions and not just learn about them.
            </p>

            <div className="flex items-center gap-3 mt-5">
              <img
                src="https://i.ibb.co.com/2Yf7t7qQ/kend.png"
                alt="Ken D."
                className="w-8 h-8 rounded-full"
              />
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Michelle V.</span>{" "}
                <span className="text-gray-500">
                  / Sr. Digital Marketing Manager
                </span>
              </p>
            </div>
          </div>

          <div className="max-w-xl mt-4 md:ml-24 mx-auto bg-white shadow-sm rounded-tl-2xl rounded-bl-2xl rounded-br-2xl p-6"></div>

          <div className="my-10"></div>
          {/* <button className="flex items-center gap-1 lg:ml-28 mt-10 mb-10 hover:text-blue-800">
            Load more{" "}
            <span>
              <img src="https://i.ibb.co.com/FNqQQSF/loadmore.png" alt="" />
            </span>
          </button> */}
        </div>
      </div>
    </div>
  );
}
