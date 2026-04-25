import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

export default function ShippingPolicyPage() {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-[1400px] px-4 py-16 lg:px-8">
      <h1 className="mb-10 text-2xl font-bold uppercase tracking-[0.1em]">
        Shipping Policy
      </h1>

      <div className="space-y-8 text-sm leading-relaxed text-gray-600">
        <section>
          <h2 className="mb-3 text-base font-semibold text-black">
            1. Shipping Areas
          </h2>
          <p>
            We currently ship across <strong>Indonesia</strong>. International
            shipping may be available for select regions. Please check
            availability at checkout.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-black">
            2. Processing Time
          </h2>
          <p>
            Orders are processed within <strong>1–3 business days</strong>{" "}
            (Monday–Friday, excluding public holidays). Orders placed on weekends
            or holidays will be processed the next business day.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-black">
            3. Delivery Times
          </h2>
          <ul className="ml-4 list-disc space-y-1">
            <li>
              <strong>Java:</strong> 2–4 business days
            </li>
            <li>
              <strong>Outside Java:</strong> 4–7 business days
            </li>
            <li>
              <strong>Remote Areas:</strong> 7–14 business days
            </li>
          </ul>
          <p className="mt-2">
            Delivery times are estimates and may vary due to weather, carrier
            delays, or peak seasons.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-black">
            4. Shipping Costs
          </h2>
          <p>
            Shipping costs are calculated at checkout based on destination,
            package weight, and selected courier. Free shipping may be available
            for orders above a minimum amount, as indicated during promotions.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-black">
            5. Order Tracking
          </h2>
          <p>
            Once your order is shipped, you will receive a tracking number via
            email or WhatsApp. You can use this number to track your package
            through the courier&apos;s website.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-black">
            6. Shipping Issues
          </h2>
          <p>
            If your package is lost, delayed beyond the estimated delivery time,
            or arrives damaged, please contact our support team at
            support@lomboksportswear.com. We will work with the courier to
            resolve the issue as quickly as possible.
          </p>
        </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
