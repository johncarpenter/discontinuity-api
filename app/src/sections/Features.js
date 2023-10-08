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
            invest in a full-scale AI solution. Less than the cost of a single
            consultant taking you to lunch.
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
            <h3 className="text-lg font-bold">Scope Your Idea</h3>
            <p className="text-center text-gray-600">
              First step is to scope out your idea. We&apos;ll work with you to
              work with your goals but also work with the existing capabilities
              of AI.
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
            <h3 className="text-lg font-bold">Prototype and Deploy</h3>
            <p className="text-center text-gray-600">
              Once we have a goal in mind, we can build out the prototype and
              deploy it. Typically within a single week. Applications are
              available as a chat widget, ChatGPT plugin, API or interfaces that
              you have decided.
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
            <h3 className="text-lg font-bold">Validation</h3>
            <p className="text-center text-gray-600">
              Now with a working prototype, we can work with you to validate the
              idea, and communicate the benefits from your data-driven analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
