import Image from "next/image";

const cards = [
  {
    id: "hero-men",
    href: "#men",
    src: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=700&h=930&fit=crop",
    alt: "Men",
  },
  {
    id: "hero-women",
    href: "#women",
    src: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=700&h=930&fit=crop",
    alt: "Women",
  },
  {
    id: "hero-tops",
    href: "#",
    src: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=700&h=930&fit=crop",
    alt: "Tops",
  },
  {
    id: "hero-bottoms",
    href: "#",
    src: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=700&h=930&fit=crop",
    alt: "Bottoms",
  },
];

export default function HeroSection() {
  return (
    <section className="px-2 pb-2 pt-5 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-4 gap-1 lg:grid-cols-4 lg:gap-3.5">
          {cards.map((card) => (
            <a
              key={card.id}
              id={card.id}
              href={card.href}
              className="group block aspect-[3/4] overflow-hidden bg-gray-100"
            >
              <Image
                src={card.src}
                alt={card.alt}
                width={1800}
                height={2400}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </a>
          ))}
        </div>

        <div className="py-10 text-center md:py-14">
          <h1 className="text-3xl font-semibold tracking-wide leading-none md:text-8xl lg:text-10xl">
            New Collection 2025
          </h1>
        </div>
      </div>
    </section>
  );
}
