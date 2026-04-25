import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import Image from "next/image";
import Link from "next/link";

const values = [
  {
    title: "Performance First",
    description:
      "Every piece is engineered to enhance athletic performance while maintaining comfort throughout your training.",
  },
  {
    title: "Sustainably Made",
    description:
      "We use eco-friendly materials and ethical manufacturing processes to minimize our environmental footprint.",
  },
  {
    title: "Locally Crafted",
    description:
      "Designed in Lombok with deep roots in Indonesian culture. We celebrate local craftsmanship in every stitch.",
  },
  {
    title: "Accessible Quality",
    description:
      "Premium sportswear shouldn't come with a premium price tag. We make quality gear accessible to every athlete.",
  },
];

const milestones = [
  { year: "2019", event: "Founded in Mataram, Lombok with a mission to create affordable performance sportswear" },
  { year: "2020", event: "Launched our first collection — 12 products designed for tropical training conditions" },
  { year: "2021", event: "Expanded to nationwide shipping across Indonesia, reaching 10,000+ customers" },
  { year: "2022", event: "Introduced women's line and accessories, doubling our product catalog" },
  { year: "2023", event: "Partnered with local athletes and fitness communities across Lombok and Bali" },
  { year: "2024", event: "Crossed 50,000 orders milestone and launched our digital storefront" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <Navbar />

      <section className="px-6 pb-20 pt-10 lg:px-8 lg:pb-28 lg:pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
              Our Story
            </p>
            <h1 className="text-3xl font-black uppercase tracking-wider lg:text-4xl">
              About Lombok Sportswear
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-500">
              Born on the island of Lombok, we create sportswear that fuses
              performance engineering with Indonesian craftsmanship. Our gear is
              built for athletes who train hard and demand more from what they wear.
            </p>
          </div>

          <div className="mb-20 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=1000&fit=crop"
                alt="Athletic training"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                Why We Exist
              </p>
              <h2 className="mb-6 text-2xl font-black uppercase tracking-wider">
                Engineered for the Modern Athlete
              </h2>
              <div className="space-y-4 text-sm leading-relaxed text-gray-500">
                <p>
                  Lombok Sportswear was founded in 2019 with a simple belief: quality
                  sportswear should be accessible to everyone. Based in Mataram, the
                  heart of Lombok, we draw inspiration from the island&apos;s rugged
                  natural beauty and the relentless spirit of its people.
                </p>
                <p>
                  We design gear that performs in tropical heat, holds up through
                  intense training sessions, and looks great on and off the field.
                  From moisture-wicking fabrics to ergonomic cuts, every detail is
                  intentional.
                </p>
                <p>
                  Our mission is to empower athletes and active individuals across
                  Indonesia — and beyond — with apparel that matches their ambition
                  and drive.
                </p>
              </div>
              <Link
                href="/products"
                className="mt-8 inline-block bg-black px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gray-800"
              >
                Shop Collection
              </Link>
            </div>
          </div>

          <div className="mb-20">
            <div className="mb-10 text-center">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                What Drives Us
              </p>
              <h2 className="text-2xl font-black uppercase tracking-wider">Our Values</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-xl border border-gray-200 p-6"
                >
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wider">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <div className="mb-10 text-center">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                Our Journey
              </p>
              <h2 className="text-2xl font-black uppercase tracking-wider">
                Milestones
              </h2>
            </div>
            <div className="mx-auto max-w-2xl">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="flex gap-6 pb-8 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                      {index + 1}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-px flex-1 bg-gray-200" />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className="mb-1 text-xs font-bold text-gray-400">
                      {milestone.year}
                    </p>
                    <p className="text-sm leading-relaxed">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-gray-50 p-10 text-center lg:p-16">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
              Join the Movement
            </p>
            <h2 className="mb-4 text-2xl font-black uppercase tracking-wider">
              Ready to Gear Up?
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-gray-500">
              Explore our latest collection of performance sportswear designed
              for athletes who never settle.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/products"
                className="bg-black px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gray-800"
              >
                Shop Now
              </Link>
              <Link
                href="/category"
                className="border border-black px-8 py-3 text-xs font-semibold uppercase tracking-widest transition-colors hover:bg-black hover:text-white"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
