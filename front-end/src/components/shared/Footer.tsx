import {
  FaLinkedinIn,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="border-t  bg-[#F9FBFF] border-gray-300">
      <div className="w-10/12 mx-auto pt-10">
        <div className="lg:flex justify-between lg:items-center space-y-8 lg:space-y-0">
          <h1 className="text-xl">
            PortFolio <span className="font-bold">Studio</span>
          </h1>
          <div className="flex gap-3 lg:justify-start">
            {[FaLinkedinIn, FaInstagram, FaTiktok, FaXTwitter].map(
              (Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="bg-black text-white p-2 rounded hover:bg-blue-500 transition-colors"
                >
                  <Icon />
                </a>
              )
            )}
          </div>
        </div>

        <div className="py-10 grid grid-cols-2 lg:flex justify-between text-sm text-gray-800 gap-6">
          <div className="flex flex-col">
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2 flex-grow">
              {[
                "AI Resume",
                "AI Coverletter",
                "Pricing",
                "Career",
                "Organization",
                "Outplacement",
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="hover:text-blue-500 text-[12px] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <h3 className="font-semibold mb-4">Blog</h3>
            <ul className="space-y-2 flex-grow">
              {[
                "Is Jobright Legit?",
                "Success Stories from Jobright Users",
                "What Top AI Companies Are Looking For",
                "Jobright AI Agent Launch",
                "Top Entry Level Jobs",
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="hover:text-blue-500 text-[12px] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-items-end">
            <h3 className="font-semibold mb-4">Related Tools</h3>
            <ul className="space-y-2 flex-grow">
              {[
                "AI Job Assistant",
                "AI Cover Letter Generator",
                "AI Resume Helper",
                "AI Job Tracker",
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="hover:text-blue-500 text-[12px] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <h3 className="font-semibold mb-4">Information</h3>
            <ul className="space-y-2 flex-grow">
              {["About Us", "Privacy Policy", "Terms of Service"].map(
                (item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:text-blue-500 text-[12px] transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
