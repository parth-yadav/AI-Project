import { FiGift, FiTruck, FiRefreshCw, FiCreditCard } from 'react-icons/fi';

const features = [
  {
    icon: FiGift,
    title: "Earn Points",
    description: "Get 1 point for every $1 spent"
  },
  {
    icon: FiTruck,
    title: "Free Shipping",
    description: "Free shipping on orders over $100"
  },
  {
    icon: FiRefreshCw,
    title: "Easy Returns",
    description: "30-day hassle-free returns"
  },
  {
    icon: FiCreditCard,
    title: "Member Discounts",
    description: "Exclusive deals for members"
  }
];

const LoyaltyBonus = () => {
  return (
    <section className="py-8 border-t border-b border-rebel-dark dark:border-rebel-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-4">
              <feature.icon className="w-8 h-8 text-orange-500" />
              <div>
                <h3 className="text-lg text-rebel-dark dark:text-rebel-light font-nofex mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-rebel-dark dark:text-rebel-light/70">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoyaltyBonus;