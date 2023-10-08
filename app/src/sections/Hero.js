import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <div className="relative isolate overflow-hidden ">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="relative px-8 py-12 lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
          <div className="relative h-full overflow-hidden rounded-3xl bg-gray-900 px-6 pb-12 pt-64 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10 ">
            <Image
              priority
              src="/static/images/hero.png"
              fill
              className="object-cover absolute inset-0 w-full h-full "
              alt="Stylized self-portrait of Van Gogh holding a phone taking a selfie."
            />
          </div>
        </div>
        <div className="px-6 sm:pb-12 lg:col-span-7 lg:px-0 lg:pb-20 lg:pt-8 xl:col-span-6">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="mt-10 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-5xl">
              <span className="text-secondary-500">
                Have an AI idea but don&apos;t know where to start?
              </span>
            </h1>
            <h2 className="text-2xl sm:text-4xl mt-6">
              {"  "}
              Fast-track your AI initiatives with our rapid prototyping service.
            </h2>
            <p className="mt-6 text-xl leading-8 text-grey-700 dark:text-gray-300">
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
      </div>
    </div>
  );
}

export default Hero;
