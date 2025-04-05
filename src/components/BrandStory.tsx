import Image from "next/image";
const BrandStory = () => {
  return (
    <section className="py-16  bg-wolf-light dark:bg-wolf-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-nofex font-bold mb-6">Our Story</h2>
            <p className=" text-wolf-dark dark:text-wolf-light text-lg leading-relaxed">
              Born from the spirit of wolflion, THE wolf is more than just a
              clothing brand – it is a movement. We combine edgy aesthetics with
              premium quality to create clothing that empowers you to express
              your unique identity. Join us in breaking free from conventional
              fashion norms.
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src="/images/white.jpg" // External URL
              alt="The wolf Logo" // Alt text for accessibility
              width={256} // Specify the width (e.g., 256px for w-64)
              height={256} // Specify the height (e.g., 256px for h-64)
              className="w-64 h-64 object-cover block dark:hidden rounded-lg" // Apply styles
            />
            <Image
              src="/images/black.jpg" // External URL
              alt="The wolf Logo" // Alt text for accessibility
              width={256} // Specify the width (e.g., 256px for w-64)
              height={256} // Specify the height (e.g., 256px for h-64)
              className="w-64 h-64 object-cover hidden  dark:block rounded-lg" // Apply styles
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
