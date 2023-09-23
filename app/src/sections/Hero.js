import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  const { status: sessionStatus } = useSession();
  const [showMenu, setMenuVisibility] = useState(false);

  const toggleMenu = () => setMenuVisibility(!showMenu);

  return (
    <div className="w-full py-10">
      <div className="relative flex flex-col px-10 mx-auto space-y-5 md:w-3/4">
        <div>
          <div className="flex flex-col items-center justify-center pt-10 mx-auto ">
            <h1 className="text-6xl font-extrabold text-center">
              <span className="block">Turn Your AI/ML vision into reality</span>
              <span className="block text-secondary-500">in just 7 days.</span>
            </h1>
            <h2>
              <p className="mt-5 text-3xl text-center text-gray-800">
                Fast-track your AI initiatives with our rapid prototyping
                service. Affordable, Quick, Proven.
              </p>
            </h2>
          </div>
          <div className="flex items-center justify-center space-x-5">
            <a className="px-10 py-3 text-center text-white bg-primary-600 rounded shadow hover:bg-primary-500">
              Get Started
            </a>
            <a className="px-10 py-3 text-center text-primary-600 rounded shadow hover:bg-primary-50">
              Live Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
