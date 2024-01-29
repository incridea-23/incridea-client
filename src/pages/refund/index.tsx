import { NextPage } from 'next';
import Image from 'next/image';

const Refund: NextPage = () => {
  return (
    <div className="relative min-h-screen overflow-y-hidden overflow-x-hidden bg-gradient-to-bl  from-[#41acc9]  via-[#075985] to-[#2d6aa6] text-gray-100 p-5 sm:p-10">
      <div className="w-full max-w-7xl mx-auto">
        <Image
          src="/assets/png/waterflare.png"
          height={1000}
          width={1000}
          alt="flare"
          className="absolute opacity-40 z-10 top-0 right-0"
          priority
        />
        <h1 className={`titleFont text-5xl mb-3 pt-24 text-center`}>
          Refund Policy
        </h1>
        <div className="mt-[3em] bodyFont">
          <h2 className="text-2xl mt-4">Introduction</h2>
          <p className="mt-2">
            We offer a seamless registration process using Razorpay, a secure
            payment gateway. This page outlines our refund policy to provide
            clarity and peace of mind in case of any issues with your payment.
          </p>

          <h2 className="text-2xl mt-4">Payment Process</h2>
          <p className="mt-2">
            Our payment process is designed to be easy and convenient for you.
            We offer multiple payment options, including credit/debit cards, net
            banking, and UPI. Once you select your preferred payment method, you
            will be redirected to Razorpay&apos;s secure payment gateway to
            complete the payment process.
          </p>
          <h2 className="text-2xl mt-4">Refund Policy</h2>
          <p className="mt-2">
            We understand that sometimes processing errors or technical glitches
            can occur during the payment process, leading to an unsuccessful
            transaction. In such cases, the amount paid by you will be credited
            back to your account automatically within 5-7 business days. Please
            note that this refund is only applicable in the case of an
            unsuccessful transaction due to processing errors and not for any
            other reasons.
          </p>

          <h2 className="text-2xl mt-4">Non-Refundable Services</h2>
          <p className="mt-2">
            Please note that our registration services are non-refundable and
            cannot be cancelled once payment has been made. This policy is in
            place to ensure that we can deliver the best possible experience for
            all our customers.
          </p>

          <h2 className="text-2xl mt-4">Payment Security</h2>
          <p className="mt-2">
            We take the safety and security of your payment information very
            seriously. Our payment gateway partner, Razorpay, ensures that all
            transactions are secure and protected by industry-standard
            encryption. You can be confident that your payment information is
            safe when you use our website for registration.
          </p>
          <h2 className="text-2xl mt-4">Contact Information</h2>
          <p className="mt-2">
            If you have any questions or concerns about our refund policy or
            payment process, please do not hesitate to contact our team. You can
            reach us at{' '}
            <a
              href="mailto:incridea@nmamit.in"
              className="cursor-pointer text-semibold underline"
            >
              incridea@nmamit.in
            </a>{' '}
            or contact
            <span className="inline-block mr-1">
              +91 9620788383 (Technical committte)
            </span>
            or
            <span className="inline-block ml-1">
              +91 7348896751 (Finance committte)
            </span>
            , and we will be happy to assist you.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Refund;
