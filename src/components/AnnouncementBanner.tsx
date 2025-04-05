import { useEffect, useState } from 'react';

const announcements = [
  "FREE SHIPPING ON ORDERS OVER $100",
  "NEW COLLECTION DROPS EVERY FRIDAY",
  "JOIN THE REBELLION - GET 10% OFF",
];

const AnnouncementBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-rebel-light text-rebel-dark py-2 text-center font-impact tracking-wider text-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden h-6">
          {announcements.map((text, index) => (
            <div
              key={index}
              className={`absolute w-full transition-transform duration-500 ${
                index === currentIndex
                  ? 'translate-y-0 opacity-100'
                  : '-translate-y-full opacity-0'
              }`}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;