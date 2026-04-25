import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-[1400px] px-4 py-16 lg:px-8">
      <h1 className="mb-10 text-2xl font-bold uppercase tracking-[0.1em]">
        Privacy Policy
      </h1>

      <div className="space-y-8 text-sm leading-relaxed text-gray-600">
        <section>
          <h2 className="mb-3 text-base font-semibold text-black">
            1. Information We Collect
          </h2>
          <p>We may collect the following types of information:</p>
          <ul className="ml-4 mt-2 list-disc space-y-1">
            <li>
              <strong>Personal Information:</strong> Name, email address, phone
              number, shipping address, and payment details provided during
              checkout or account registration.
            </li>
            <li>
              <strong>Usage Data:</strong> Browser type, IP address, pages
              visited, time spent on pages, and device information collected
              automatically when you use our platform.
            </li>
            <li>
              <strong>Cookies:</strong> We use cookies and similar tracking
              technologies to enhance your browsing experience and analyze site
              traffic.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-black">
            2. How We Use Your Information
          </h2>
          <ul className="ml-4 list-disc space-y-1">
            <li>Process and fulfill your orders</li>
            <li>Communicate order updates and promotions</li>
            <li>Improve our website and user experience</li>
            <li>Provide customer support</li>
            <li>Prevent fraud and enhance security</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-black">
            3. Information Sharing
          </h2>
          <p>
            We do not sell your personal information. We may share your data
            with trusted third parties only as necessary to operate our
            business, including:
          </p>
          <ul className="ml-4 mt-2 list-disc space-y-1">
            <li>
              <strong>Logistics Partners:</strong> To deliver your orders.
            </li>
            <li>
              <strong>Payment Providers:</strong> To process transactions
              securely.
            </li>
            <li>
              <strong>Analytics Services:</strong> To understand site usage and
              improve performance.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-black">
            4. Data Security
          </h2>
          <p>
            We implement industry-standard security measures to protect your
            personal data, including encryption, secure servers, and access
            controls. However, no method of transmission over the internet is
            100% secure.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-black">
            5. Your Rights
          </h2>
          <p>You have the right to:</p>
          <ul className="ml-4 mt-2 list-disc space-y-1">
            <li>Access and review your personal data</li>
            <li>Request correction or deletion of your data</li>
            <li>Opt out of marketing communications</li>
            <li>Request a copy of your data</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-black">
            6. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will
            be posted on this page with an updated effective date. Continued use
            of our platform after changes constitutes acceptance of the revised
            policy.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold text-black">
            7. Contact Us
          </h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at support@lomboksportswear.com.
          </p>
        </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
