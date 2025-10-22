import {
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="border-t bg-[#F9FBFF] border-gray-200">
      <div className="w-10/12 mx-auto pt-10">
        {/* Top section */}
        <div className="flex flex-col justify-center items-center gap-4 space-y-6">
          <h1 className="text-xl text-gray-800">
            Portfolio <span className="font-bold text-black">Studio</span>
          </h1>

          <div className="flex gap-3">
            {[FaLinkedinIn, FaInstagram, FaTiktok, FaXTwitter].map(
              (Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              )
            )}
          </div>
        </div>

        {/* Divider line */}
        <div className="border-t border-gray-200 mt-10"></div>

        {/* Bottom section */}
        <div className="py-6 flex flex-col lg:flex-row justify-between items-center text-sm text-gray-600">
          <p className="flex items-center gap-1 text-center lg:text-left">
            <span className="text-lg">&copy;</span> {new Date().getFullYear()}{" "}
            Portfolio Studio. All rights reserved.
          </p>
          <p className="mt-2 lg:mt-0">
            Developed by{" "}
            <a
              href="https://www.kernostudio.com/"
              target="_blank"
              className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              Kerno Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
