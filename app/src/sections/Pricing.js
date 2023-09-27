import { CheckIcon } from "@heroicons/react/24/outline";

const Pricing = () => {
  return (
    <div className="w-full py-10">
      <div className="relative flex flex-col px-5 mx-auto space-y-5 md:w-3/4">
        <div className="flex flex-col items-center space-y-5">
          <h6 className="font-bold text-center text-blue-600 uppercase">
            Pricing
          </h6>
          <h2 className="text-4xl font-bold text-center">
            <span className="block">
              Choose the plan that works best for your business
            </span>
          </h2>
          <p className="text-center text-gray-600">
            No hidden fees. No monthly fees. No annual fees. No setup fees. No
            fees fees. Just a simple, one-time payment for the AI prototype you
            need.
          </p>
        </div>
        <div className="flex flex-col p-10 space-x-0 space-y-5 bg-gray-200 rounded-lg md:space-y-0 md:space-x-5 md:flex-row">
          <div className="flex flex-col items-start overflow-hidden bg-white border rounded-lg md:w-1/2">
            <div className="w-full p-10 space-y-5">
              <span className="px-5 py-1 text-sm text-blue-600 uppercase bg-blue-100 rounded-full">
                Concept
              </span>
              <h2 className="space-x-2 text-6xl">
                <span className="font-extrabold">$599</span>
                <small className="text-lg text-gray-400">/ project</small>
              </h2>
            </div>
            <div className="flex flex-col w-full h-full p-10 space-y-5 bg-gray-100 border-t">
              <a
                className="px-10 py-3 text-lg text-center text-blue-600 bg-white rounded shadow hover:bg-blue-50"
                href="#!"
              >
                Get Started with Concept
              </a>
              <div className="space-y-5">
                <h6 className="uppercase">What&apos;s Included</h6>
                <ul className="leading-10 list-none list-inside">
                  <li className="flex items-center space-x-3">
                    <CheckIcon className="w-5 h-5 text-green-600" />
                    <span>Complete AI Tool, Custom Built</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckIcon className="w-5 h-5 text-green-600" />
                    <span>Embeddable Widget</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckIcon className="w-5 h-5 text-green-600" />
                    <span>Landing Page</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckIcon className="w-5 h-5 text-green-600" />
                    <span>Concept Writeup and Business Plan</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start overflow-hidden bg-white border rounded-lg md:w-1/2">
            <div className="w-full p-10 space-y-5">
              <span className="px-5 py-1 text-sm text-blue-600 uppercase bg-blue-100 rounded-full">
                Build And Test
              </span>
              <h2 className="space-x-2 text-6xl">
                <span className="font-extrabold">$799</span>
                <small className="text-lg text-gray-400">/ project</small>
              </h2>
            </div>
            <div className="flex flex-col w-full h-full p-10 space-y-5 bg-gray-100 border-t">
              <a
                className="px-10 py-3 text-lg text-center text-blue-600 bg-white rounded shadow hover:bg-blue-50"
                href="#!"
              >
                Get Started with Build and Test
              </a>
              <div className="space-y-5">
                <h6 className="uppercase">What&apos;s Included</h6>
                <ul className="leading-10 list-disc list-inside">
                  <li className="flex items-center space-x-5">
                    <CheckIcon className="w-5 h-5 text-green-600" />
                    <span>Everything in Concept</span>
                  </li>
                  <li className="flex items-center space-x-5">
                    <CheckIcon className="w-5 h-5 text-green-600" />
                    <span>Custom Domain Name</span>
                  </li>
                  <li className="flex items-center space-x-5">
                    <CheckIcon className="w-5 h-5 text-green-600" />
                    <span>Analytics</span>
                  </li>
                  <li className="flex items-center space-x-5">
                    <CheckIcon className="w-5 h-5 text-green-600" />
                    <span>Up to 5 Team Members</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
