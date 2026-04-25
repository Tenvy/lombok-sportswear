import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <Navbar />

      <section className="px-6 pb-20 pt-10 lg:px-8 lg:pb-28 lg:pt-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-400">
              Get in Touch
            </p>
            <h1 className="text-3xl font-black uppercase tracking-wider lg:text-4xl">
              Contact Us
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-500">
              Have questions about our products, orders, or need help with sizing?
              We&apos;re here to help. Reach out to us through any of the channels below.
            </p>
          </div>

          <div className="mb-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 p-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
                <MapPin className="size-5" />
              </div>
              <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.15em]">
                Visit Us
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">
                Jl. Pejanggik No. 12<br />
                Mataram, Lombok<br />
                Nusa Tenggara Barat 83111
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
                <Phone className="size-5" />
              </div>
              <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.15em]">
                Call Us
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">
                +62 370 123 456<br />
                +62 812 3456 7890 (WhatsApp)
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
                <Mail className="size-5" />
              </div>
              <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.15em]">
                Email Us
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">
                hello@lomboksportswear.com<br />
                support@lomboksportswear.com
              </p>
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mb-6 text-lg font-black uppercase tracking-wider">
                Send Us a Message
              </h2>
              <form className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full border-b border-gray-200 bg-transparent py-3 text-sm outline-none transition-colors focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full border-b border-gray-200 bg-transparent py-3 text-sm outline-none transition-colors focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                    Subject
                  </label>
                  <select className="w-full border-b border-gray-200 bg-transparent py-3 text-sm outline-none transition-colors focus:border-black">
                    <option>General Inquiry</option>
                    <option>Order Support</option>
                    <option>Product Question</option>
                    <option>Returns & Exchange</option>
                    <option>Wholesale</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us how we can help..."
                    className="w-full resize-none border-b border-gray-200 bg-transparent py-3 text-sm outline-none transition-colors focus:border-black"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-black px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gray-800"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div>
              <h2 className="mb-6 text-lg font-black uppercase tracking-wider">
                Business Hours
              </h2>
              <div className="mb-8 rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-5">
                  <Clock className="size-4 text-gray-400" />
                  <span className="text-xs font-semibold uppercase tracking-[0.15em]">Store Hours</span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Monday – Friday</span>
                    <span className="font-semibold">09:00 – 21:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Saturday</span>
                    <span className="font-semibold">09:00 – 20:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sunday</span>
                    <span className="font-semibold">10:00 – 18:00</span>
                  </div>
                </div>
              </div>

              <h2 className="mb-6 text-lg font-black uppercase tracking-wider">
                Find Us
              </h2>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                <Image
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
                  alt="Lombok, Indonesia"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-4 left-4 rounded-lg bg-white/90 px-4 py-3 backdrop-blur-sm">
                  <p className="text-xs font-semibold">Lombok Sportswear HQ</p>
                  <p className="text-[10px] text-gray-500">Mataram, Lombok — Indonesia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
