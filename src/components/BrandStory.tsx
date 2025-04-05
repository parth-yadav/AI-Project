import Image from "next/image";
const BrandStory = () => {
  return (
    <section className="py-16  bg-rebel-light dark:bg-rebel-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-nofex font-bold mb-6">Our Story</h2>
            <p className=" text-rebel-dark dark:text-rebel-light text-lg leading-relaxed">
              Born from the spirit of rebellion, THE REBEL is more than just a
              clothing brand – it is a movement. We combine edgy aesthetics with
              premium quality to create clothing that empowers you to express
              your unique identity. Join us in breaking free from conventional
              fashion norms.
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src="https://therebel.org.in/assets/symbol-BaBtzzzl.svg" // External URL
              alt="The Rebel Logo" // Alt text for accessibility
              width={256} // Specify the width (e.g., 256px for w-64)
              height={256} // Specify the height (e.g., 256px for h-64)
              className="w-64 h-64 object-cover rounded-lg" // Apply styles
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
