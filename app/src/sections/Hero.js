import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <div className="relative isolate overflow-hidden ">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="px-6 pb-10 sm:pb-12 lg:col-span-7 lg:px-0 lg:pb-20 lg:pt-8 xl:col-span-6">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-6xl">
              <span className="text-secondary-500">
                Have an AI idea but don&apos;t know where to start?
              </span>{" "}
              Fast-track your AI initiatives with our rapid prototyping service.
            </h1>
            <p className="mt-6 text-lg leading-8 text-grey-700 dark:text-gray-300">
              Prove the value of AI by testing, refining and validating your
              ideas before making investments. We will help you build a custom
              AI prototype usually in less than a week. Faster time to market,
              lower risk, and lower cost.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <a
                href="#contact"
                className="rounded-md dark:bg-primary-700/90 bg-primary-600/90 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
              >
                Get started
              </a>
              <a
                href="/demo"
                className="text-sm font-semibold leading-6 text-white"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
          <Image
            className="aspect-[3/2] w-full object-cover object-top lg:absolute lg:inset-0 lg:aspect-auto lg:h-full  rounded-xl"
            src="/static/images/hero.png"
            alt="Stylized self-portrait of Van Gogh holding a phone taking a selfie."
            fill
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
