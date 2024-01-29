import { NextPage } from 'next';
import Image from 'next/image';

const Privacy: NextPage = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-gradient-to-bl  from-[#41acc9]  via-[#075985] to-[#2d6aa6] text-gray-100 p-5 sm:p-10">
      <div className='w-full max-w-7xl mx-auto'>
      <Image
        src="/assets/png/waterflare.png"
        height={1000}
        width={1000}
        alt="flare"
        className="absolute opacity-40 z-10 top-0 right-0"
        priority
      />

      <h1 className={`titleFont text-5xl mb-3 pt-24 text-center`}>
        Incridea 2023 Privacy Policy
      </h1>
      <div className="bodyFont mt-10">

        <p>
          At Incridea, we take your privacy seriously and are committed to
          protecting your personal information. This privacy policy explains how
          we collect, use, and safeguard your data. By registering for our
          festival competition, you agree to the terms of this privacy policy.
        </p>

        <h2 className="text-2xl mt-4">Consent</h2>
        <p className="mt-2">
          By registering and submitting your personal information, you are
          indicating your consent to the collection, utilization, and sharing of
          your data in accordance with the terms outlined in our privacy policy.
          If any aspect of this policy is not agreeable to you, we kindly
          request that you refrain from submitting your information or
          participating in our festival competition.
        </p>

        <h2 className="text-2xl mt-4">Information Collection</h2>
        <p className="mt-2">
          We collect personally identifiable information from you when you
          voluntarily provide it to us through the festival registration form.
          The information we collect may include your name, email address, phone
          number, date of birth, and financial information such as credit card
          number and expiration date, debit card information and UPI ID.
        </p>
        <h2 className="text-2xl mt-4">Use of Information</h2>
        <p className="mt-2">
          We will use the information collected during the registration process
          to communicate with you about festival events and services, including
          but not limited to sending promotional emails, newsletters, and event
          updates. You will have the option to opt-out of these communications
          at any time by contacting us using the email address or phone number
          provided on our website. We will not use your contact information for
          any other purpose without your explicit consent. We will delete all
          personally identifiable information collected during the registration
          process after 7 days of login unless we are required by law to retain
          it for a longer period. This includes all data provided by the user,
          such as name, email address, phone number, date of birth, and
          financial information.
        </p>

        <h2 className="text-2xl mt-4">Sharing of Information</h2>
        <p className="mt-2">
          We do not sell or rent your personal information to any third party.
          We may share your personal data with partners, vendors, or service
          providers only as necessary to provide the services you have requested
          or authorized, such as processing payments or providing technical
          support. We will only share the minimum amount of information
          necessary to perform these services, and we will require all third
          parties to maintain the confidentiality and security of your data. We
          may also disclose your information if required by law or to protect
          our rights or the rights of others.
        </p>

        <h2 className="text-2xl mt-4">Third-party services</h2>
        <p className="mt-2">
          We only allow third-party providers to collect, use, and disclose your
          information to the extent necessary for them to provide the services
          they offer. However, some providers may have their own privacy
          policies for purchase-related transactions, such as payment gateways
          and processors. It is recommended that you review their policies to
          understand how they handle your personal information. It&apos;s
          important to note that some providers may be located in a different
          jurisdiction than you or us. If you proceed with a transaction that
          involves a third-party service provider, your information may be
          subject to the laws of the jurisdiction(s) in which the provider or
          its facilities are located. Please be aware that once you leave our
          website or are redirected to a third-party website or application,
          this Privacy Policy and our website&apos;s Terms of Service no longer
          apply.
        </p>
        <h2 className="text-2xl mt-4">Your Control Over Information</h2>
        <p className="mt-2">
          You have the right to access, correct, or delete your personal
          information at any time. You may also opt-out of receiving future
          communications from us by contacting us through the email address or
          phone number provided on our website.
        </p>
        <h2 className="text-2xl mt-4">Cookies</h2>
        <p className="mt-2">
          We use cookies to maintain your session and to personalize your
          experience on our website. We do not use cookies to collect personally
          identifiable information or to track your activity on other websites.
        </p>

        <h2 className="text-2xl mt-4">Security Measures</h2>
        <p className="mt-2">
          Our website is secured with SSL encryption, and we use
          industry-standard security measures to protect your personal
          information from unauthorized access, disclosure, or misuse. We
          encrypt sensitive information, such as your name and date of birth,
          during transmission and storage. We restrict access to your data only
          to employees who need it to perform their job duties.
        </p>

        <h2 className="text-2xl mt-4">Registrations</h2>
        <p className="mt-2">
          When you register for our festival competition, we collect your
          contact and financial information to process your payment and fulfil
          your registration. We use this information only for billing purposes
          and to communicate with you about your registration.
        </p>
        <h2 className="text-2xl mt-4">Payment Processing and Security</h2>
        <p className="mt-2">
          We offer multiple modes of payment on our website, including debit
          card, UPI ID, and other digital payment options. All payment details
          provided by you are encrypted and processed securely through our
          payment gateway partner, Razorpay. As mentioned earlier, your card
          data is not stored on our or Razorpay&apos;s servers, and all purchase
          transaction data is only used to complete your purchase and will not
          be saved. Our payment gateway follows the PCI-DSS standards set by the
          PCI Security Standards Council, which includes leading credit and
          debit card brands like Visa, Mastercard, American Express, and
          Discover, ensuring the secure handling of payment information by our
          store and its service providers. For more information on
          Razorpay&apos;s terms and conditions and their secure handling of
          payment information, please refer to their website at{" "}
          <a href="https://razorpay.com" target="_blank" rel="noreferrer">
            https://razorpay.com
          </a>
          .
        </p>
        <h2 className="text-2xl mt-4">Links to Other Sites</h2>
        <p className="mt-2">
          Our website may contain links to other sites that are not owned or
          operated by us. We are not responsible for the privacy practices or
          content of those sites, and we encourage you to review their privacy
          policies before providing any personal information.
        </p>
        <h2 className="text-2xl mt-4">Changes to privacy policy</h2>
        <p className="mt-2">
          We reserve the right to modify this privacy policy at any time, and we
          encourage you to review it frequently. Any changes or clarifications
          will take effect immediately upon being posted on our website. Should
          we make significant changes to this policy, we will notify you through
          our website, providing information on the type of information we
          collect, how we use it, and the circumstances under which we may use
          or disclose it.
        </p>
        <p className="mt-2">
          We understand the importance of safeguarding your personal
          information, and we are committed to protecting it in accordance with
          applicable data protection laws and regulations.
        </p>
        <p className="mt-2">
          Our privacy policy upholds our commitment to protect and responsibly
          use personal information in compliance with data protection laws.
        </p>
        <p className="mt-2">
          We value your trust and remain dedicated to ensuring the highest
          standards of data protection and privacy.
        </p>
        <p className="text-lg mt-4 font-semibold">
          For inquiries or clarifications on our privacy policy or personal data
          handling, you may reach us at <a href="mailto:incridea@nmamit.in" className='hover:underline'>incridea@nmamit.in</a> or{" "}
          <a href="tel:9448815186" className='hover:underline'>+91 9448815186</a>.
        </p>
      </div>
      <div className={`flex w-full -translate-x-10 translate-y-10 opacity-75`}>
        <Image
          src={"/assets/png/atlantis.png"}
          width={750}
          height={50}
          className="object-center"
          alt="atlantis"
        />
        <Image
          src={"/assets/png/atlantis.png"}
          width={750}
          height={50}
          className="object-center"
          alt="atlantis"
        />
      </div>
      </div>
    </div>
  );
};

export default Privacy;
