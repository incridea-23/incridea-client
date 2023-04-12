import { titleFont } from '@/src/utils/fonts';
import { NextPage } from 'next';
import Image from 'next/image';

const Privacy: NextPage = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden overflow-y-auto bg-gradient-to-bl  from-[#41acc9]  via-[#075985] to-[#2d6aa6] text-gray-100 p-5 sm:p-10">
      <Image src="/assets/png/waterflare.png" height={1000} width={1000} alt="flare" className="absolute opacity-40 z-10 top-0 right-0" />
      <h1 className={`${titleFont.className} text-5xl mb-3 pt-24 text-center`}>Privacy Policy</h1>
      <div className="mt-8">
        <p>
          This privacy notice discloses the privacy practices for{' '}
          <a href="https://www.incridea.in" className="hover:underline italic">
            https://www.incridea.in
          </a>{' '}
          .This privacy notice applies solely to information collected by this
          website. It will notify you of the following:
        </p>
        <ol className="list-decimal ml-10">
          <li>
            What personally identifiable information is collected from you
            through the website, how it is used and with whom it may be shared.
          </li>
          <li>
            {' '}
            What choices are available to you regarding the use of your data.
          </li>
          <li>
            The security procedures in place to protect the misuse of your
            information.
          </li>
          <li>How you can correct any inaccuracies in the information.</li>
        </ol>

        <h2 className="text-2xl mt-4">
          Information Collection, Use, and Sharing
        </h2>
        <p className="mt-2">
          We are the sole owners of the information collected on this site. We
          only have access to/collect information that you voluntarily give us
          via email or other direct contact from you. We will not sell or rent
          this information to anyone. We will use your information to respond to
          you, regarding the reason you contacted us. We will not share your
          information with any third party outside of our organization, other
          than as necessary to fulfil your request, e.g: To issue your
          Participant ID or Accommodation Order. The email address and phone
          number you give will be used to only to contact you regarding the
          service you have opted in while providing those details. The contact
          information given wont be used to contact you for anything else.
        </p>

        <h2 className="text-2xl mt-4">
          Your Access to and Control Over Information
        </h2>
        <p className="mt-2">
          You may opt out of any future contacts from us at any time. You can do
          the following at any time by contacting us via the email address or
          phone number given on our website:
        </p>
        <ul className="list-disc ml-10">
          <li>See what data we have about you, if any.</li>
          <li>Change/correct any data we have about you.</li>
          <li>Have us delete any data we have about you.</li>
          <li>Express any concern you have about our use of your data.</li>
        </ul>

        <h2 className="text-2xl mt-4">Security</h2>
        <p className="mt-2">
          We take precautions to protect your information. When you submit
          sensitive information via the website, your information is protected
          both online and offline. Wherever we collect sensitive information
          (such as name and date of birth), that information is encrypted and
          transmitted to us in a secure way. You can verify this by looking for
          a lock icon in the address bar and looking for &quot;https&quot; at
          the beginning of the address of the Web page. While we use encryption
          to protect sensitive information transmitted online, we also protect
          your information offline. Only employees who need the information to
          perform a specific job (for example, billing or customer service) are
          granted access to personally identifiable information. The
          computers/servers in which we store personally identifiable
          information are kept in a secure environment.
        </p>

        <h2 className="text-2xl mt-4">Orders</h2>
        <p className="mt-2">
          We request information from you on our order form{' '}
          <a
            href="https://registration.incridea.in"
            className="hover:underline italic"
          >
            https://registration.incridea.in
          </a>
          . To buy from us, you must provide contact information (like name and
          date of birth) and financial information (like credit card number,
          expiration date). This information is used for billing purposes and to
          fullfil your orders. If we have trouble processing an order,
          we&apos;ll use this information to contact you. The contact
          information collected while ordering from us will be only used to send
          order related details and information and wont be used for anything
          else.
        </p>

        <h2 className="text-2xl mt-4">Links</h2>
        <p className="mt-2">
          This website contains links to other sites. Please be aware that we
          are not responsible for the content or privacy practices of such other
          sites. While we have read and verified the linked websites privacy
          policy to comply with our standards, we encourage our users to be
          aware when they leave our site and to read the privacy statements of
          any other site that collects personally identifiable information.
        </p>

        <h3 className="text-lg mt-4 font-semibold">
          If you feel that we are not abiding by this privacy policy, you should
          contact us immediately via telephone at +91 phone no or via email
        </h3>
      </div>
      <div className={`flex w-full -translate-x-10 translate-y-10 opacity-75`}>
        <Image
          src={'/assets/png/atlantis.png'}
          width={750}
          height={50}
          className="object-center"
          alt="atlantis"
        />
        <Image
          src={'/assets/png/atlantis.png'}
          width={750}
          height={50}
          className="object-center"
          alt="atlantis"
        />
      </div>
    </div>
  );
};

export default Privacy;
