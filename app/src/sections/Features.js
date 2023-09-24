import Image from "next/image";
const Features = () => {
  return (
    <div className="w-full py-10">
      <div className="relative flex flex-col w-3/4 mx-auto space-y-5">
        <div className="flex flex-col items-center space-y-5">
          <h6 className="font-bold text-center text-secondary-600 uppercase">
            Getting Started
          </h6>
          <h2 className="text-4xl font-bold text-center">
            <span className="block">
              Bringing your AI concept to life has never been easier.
            </span>
          </h2>
          <p className="text-center text-xl  text-gray-600">
            Our rapid prototyping service is designed to help you validate your
            AI concept in as little as{" "}
            <span className="text-secondary-500">just one week.</span> Allowing
            you the time and data to make an informed decision on whether to
            invest in a full-scale AI solution.
          </p>
        </div>
        <div className="flex flex-col py-10 space-x-0 space-y-10 md:space-y-0 md:space-x-5 md:flex-row">
          <div className="flex flex-col items-center justify-start px-5 space-y-3 md:w-1/3">
            <div className="flex items-center justify-center w-48 h-48 rounded-lg">
              <Image
                priority
                src="/static/images/rapid_prototyping.png"
                className="rounded-lg"
                width={200}
                height={200}
                alt="A group of artists gathered around a statue arguing over the design"
              />
            </div>
            <h3 className="text-lg font-bold">Rapid Prototyping</h3>
            <p className="text-center text-gray-600">
              Don&apos;t let time hold you back. We deliver a functional AI
              prototype in just one week, allowing you to validate your concept
              faster than ever.
            </p>
          </div>
          <div className="flex flex-col items-center justify-start px-5 space-y-3 md:w-1/3">
            <div className="flex items-center justify-center w-48 h-48 rounded-lg">
              <Image
                priority
                src="/static/images/data_driven.png"
                className="rounded-lg"
                width={200}
                height={200}
                alt="A philosopher giving a presentation in an amphitheater"
              />
            </div>
            <h3 className="text-lg font-bold">Data-Driven Decisions</h3>
            <p className="text-center text-gray-600">
              Our service includes comprehensive documentation and analytics,
              empowering you to make a compelling case for AI investment within
              your organization.
            </p>
          </div>
          <div className="flex flex-col items-center justify-start px-5 space-y-3 md:w-1/3">
            <div className="flex items-center justify-center w-48 h-48 rounded-lg">
              <Image
                priority
                src="/static/images/infrastructure.png"
                className="rounded-lg"
                width={200}
                height={200}
                alt="A mason working on a castle"
              />
            </div>
            <h3 className="text-lg font-bold">Zero Infrastructure Hassle</h3>
            <p className="text-center text-gray-600">
              No data lake? No problem. We handle all the technical details,
              from data aggregation to hosting, so you can focus on your core
              business.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
