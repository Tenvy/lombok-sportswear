import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

export default function RefundPolicyPage() {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-[1400px] px-4 py-16 lg:px-8">
      <h1 className="mb-10 text-2xl font-bold uppercase tracking-[0.1em]">
        Refund Policy
      </h1>

      <div className="space-y-8 text-sm leading-relaxed text-gray-600">
        <section>
          <h2 className="mb-3 text-base font-semibold text-black">
            1. Eligibility for Refunds
          </h2>
          <p>
            We accept refund requests within <strong>14 days</strong> of
            delivery. Items must be unworn, unwashed, and in their original
            condition with all tags attached. Items that are damaged, used, or
            missing tags will not be eligible for a refund.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-black">
            2. How to Request a Refund
          </h2>
          <p>
            To initiate a refund, please contact our support team through the
            Contact page or email us at support@lomboksportswear.com with your
            order number and reason for the return. Our team will review your
            request and respond within <strong>2 business days</strong>.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-black">
            3. Refund Process
          </h2>
          <p>
            Once your returned item is received and inspected, we will notify
            you of the approval or rejection of your refund. If approved, the
            refund will be processed to your original payment method within
            <strong> 5–10 business days</strong>. Shipping costs are
            non-refundable.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-black">
            4. Sale Items
          </h2>
          <p>
            Items purchased during sales or promotional events are eligible for
            a refund only if they meet the conditions outlined above. Sale items
            may be refunded at the discounted purchase price, not the original
            retail price.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-black">
            5. Damaged or Defective Items
          </h2>
          <p>
            If you receive a damaged or defective item, please contact us
            immediately with photos of the product. We will arrange a full
            refund or replacement at no additional cost to you.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-black">
            6. Exchanges
          </h2>
          <p>
            We currently do not offer direct exchanges. If you need a different
            size or color, please return the original item for a refund and
            place a new order.
          </p>
        </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
