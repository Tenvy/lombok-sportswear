import Image from "next/image";

const cards = [
  {
    id: "hero-men",
    href: "#men",
    src: "https://i.ibb.co/5xJbMv0x/DEN00296.webp",
    alt: "Men",
  },
  {
    id: "hero-women",
    href: "#women",
    src: "https://i.ibb.co/931xcZcC/DEN00474.webp",
    alt: "Women",
  },
  {
    id: "hero-tops",
    href: "#",
    src: "https://i.ibb.co/3YF8xhYD/swift-tt-black-1.webp",
    alt: "Tops",
  },
  {
    id: "hero-bottoms",
    href: "#",
    src: "https://i.ibb.co/KpXyhNDq/Tshirtto-Black-5copy-eaba8905-1f4e-4f3e-94e8-647698f1f92e.webp",
    alt: "Bottoms",
  },
];

export default function HeroSection() {
  return (
    <section className="px-2 pb-2 pt-5 lg:px-8">
      <div className="mx-auto max-w-350">
        <div className="grid grid-cols-4 gap-1 lg:grid-cols-4 lg:gap-3.5">
          {cards.map((card) => (
              <Image
                key={card.id}
                src={card.src}
                alt={card.alt}
                width={1800}
                height={2400}
                className="object-cover h-full duration-300 group block aspect-3/4 overflow-hidden bg-gray-100"
              />
          ))}
        </div>

        <div className="py-10 text-center md:py-14">
          <h1 className="text-3xl font-semibold tracking-wide leading-none md:text-8xl lg:text-10xl">
            Activewear for Everyone
          </h1>
        </div>
      </div>
    </section>
  );
}
