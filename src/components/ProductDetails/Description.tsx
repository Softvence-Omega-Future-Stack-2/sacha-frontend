interface DescriptionProps {
  ad: any;
}

const Description: React.FC<DescriptionProps> = ({ ad }) => {
  return (
    <div className="container mt-8 mx-auto flex justify-start  px-4 lg:px-0 ">
      <div className="max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Description
        </h2>
        <div className="text-[#646492] mb-8 whitespace-pre-wrap leading-relaxed">
          {ad.description}
        </div>

        <div className="border-t border-gray-100 pt-8 mt-8">
          <p className="text-[#061251] font-semibold mb-4">How to apply for accommodation?</p>
          <ol className="text-[#646492] space-y-4 mb-8 list-decimal pl-5">
            <li>Create your account on MY APPART.</li>
            <li>Submit your complete tenant application.</li>
            <li>Become a premium member to apply for available accommodations.</li>
          </ol>

          <p className="text-[#646492] mb-4 bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500 italic">
            Access to applications is available from €9.90 for a 3-day trial, then
            €12.49/month with a 1-year commitment, or €34.90/month with no
            commitment.
          </p>

          <p className="text-[#646492] mb-4">
            On MY APPART, everything is handled directly between individuals, with
            no agency fees, only platform fees. A transparent, simple, secure, and
            efficient service to find your accommodation quickly.
          </p>
        </div>
      </div>

      <div className="w-full" ></div>
    </div>
  );
};

export default Description;
