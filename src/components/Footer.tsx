import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import Image from "next/image";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-rebel-light dark:bg-rebel-dark text-rebel-dark dark:text-rebel-light border-t border-rebel-dark  dark:border-rebel-light">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Image
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=50&h=50&fit=crop"
              alt="The Rebel Logo"
              width={48} // TailwindCSS w-12 = 48px
              height={48} // TailwindCSS h-12 = 48px
              className="object-cover rounded-full mb-4"
            />
            <p className=" text-rebel-dark dark:text-rebel-light font-impact">
              Dare to be different.
            </p>
          </div>
          <div>
            <h4 className="text-lg text-rebel-dark dark:text-rebel-light font-nofex font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-rebel-dark dark:text-rebel-light hover:text-purple-500 transition-colors font-impact"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-rebel-dark dark:text-rebel-light hover:text-purple-500 transition-colors font-impact"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-rebel-dark dark:text-rebel-light hover:text-purple-500 transition-colors font-impact"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-rebel-dark dark:text-rebel-light hover:text-purple-500 transition-colors font-impact"
                >
                  Shipping
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-nofex font-semibold text-rebel-dark dark:text-rebel-light mb-4">
              Follow Us
            </h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-rebel-dark dark:text-rebel-light text-lg  hover:text-purple-500 transition-colors"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-rebel-dark dark:text-rebel-light text-lg  hover:text-purple-500 transition-colors"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-rebel-dark dark:text-rebel-light text-lg  hover:text-purple-500 transition-colors"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-rebel-dark dark:text-rebel-light text-lg nofex font-semibold mb-4">
              Newsletter
            </h4>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-transparent border border-rebel-dark dark:border-rebel-light/20 rounded-full focus:outline-none focus:border-rebel-light transition-colors font-impact"
              />
              <button className="w-full bg-rebel-dark dark:bg-rebel-light text-rebel-light dark:text-rebel-dark px-6 py-2 rounded-full hover:bg-rebel-light/80 transition-colors font-impact">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="border-t border-rebel-light/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-center text-rebel-dark dark:text-rebel-light font-impact">
            © {currentYear} The Rebel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
