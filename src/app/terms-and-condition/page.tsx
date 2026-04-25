import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

export default function TermsAndConditionPage() {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-[1400px] px-4 py-16 lg:px-8">
      <h1 className="mb-10 text-2xl font-bold uppercase tracking-[0.1em]">
        Terms &amp; Conditions
      </h1>

      <div className="space-y-8 text-sm leading-relaxed text-gray-600">
        <section>
          <h2 className="mb-3 text-base font-semibold text-black">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using the Lombok Sportswear website and
            marketplace, you agree to be bound by these Terms &amp; Conditions.
            If you do not agree, please do not use our platform.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-black">
            2. Account Registration
          </h2>
          <p>
            To make purchases, you may need to create an account. You are
            responsible for maintaining the confidentiality of your account
            credentials and for all activities under your account. Please notify
            us immediately of any unauthorized use.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-black">
            3. Products &amp; Pricing
          </h2>
          <ul className="ml-4 list-disc space-y-1">
            <li>
              All product images and descriptions are accurate to the best of
              our ability. Slight variations in color may occur due to screen
              settings.
            </li>
            <li>
              Prices are listed in Indonesian Rupiah (IDR) and are subject to
              change without prior notice.
            </li>
            <li>
              We reserve the right to limit order quantities and refuse orders
              at our discretion.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-black">
            4. Payment
          </h2>
          <p>
            We accept major payment methods as displayed at checkout. Payment
            must be completed in full before an order is processed. All
            transactions are secured with industry-standard encryption.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-black">
            5. Intellectual Property
          </h2>
          <p>
            All content on this platform, including logos, text, images, and
            designs, is the property of Lombok Sportswear and is protected by
            intellectual property laws. Unauthorized use, reproduction, or
            distribution is prohibited.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-black">
            6. User Conduct
          </h2>
          <p>You agree not to:</p>
          <ul className="ml-4 mt-2 list-disc space-y-1">
            <li>Use the platform for any unlawful purpose</li>
            <li>Provide false or misleading information</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>
              Interfere with or disrupt the platform&apos;s functionality
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-black">
            7. Limitation of Liability
          </h2>
          <p>
            Lombok Sportswear is not liable for any indirect, incidental, or
            consequential damages arising from the use of our platform or
            products. Our total liability shall not exceed the amount paid for
            the relevant order.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-black">
            8. Governing Law
          </h2>
          <p>
            These Terms &amp; Conditions are governed by and construed in
            accordance with the laws of the Republic of Indonesia. Any disputes
            shall be resolved in the courts of Indonesia.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-black">
            9. Changes to These Terms
          </h2>
          <p>
            We reserve the right to update these Terms &amp; Conditions at any
            time. Changes will be posted on this page. Your continued use of the
            platform after any changes constitutes acceptance of the revised
            terms.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-black">
            10. Contact Us
          </h2>
          <p>
            For any questions regarding these Terms &amp; Conditions, please
            contact us at support@lomboksportswear.com.
          </p>
        </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
