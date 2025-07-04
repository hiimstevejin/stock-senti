import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TextEffectPerLine } from "@/app/_components/text-effect-perline";
import { InfiniteSlider } from "@/app/_components/infinite-slider";
import { ProgressiveBlur } from "@/app/_components/progressive-blur";
import HeroNavbar from "@/app/_components/hero-navbar";

export function HeroSection() {
  return (
    <>
      <HeroNavbar />
      <main className="overflow-x-hidden">
        <section>
          <div className="pb-24 pt-44 md:pb-32 lg:pb-56 lg:pt-44">
            <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
              <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
                <h1 className="mt-16 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl">
                  SignalFeed
                </h1>
                <TextEffectPerLine>
                  {
                    "SignalFeed reads the news.\nYou read the charts.\nNow trade in sync."
                  }
                </TextEffectPerLine>
                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                  <Button asChild size="lg" className="px-5 text-base">
                    <Link href="/dashboard">
                      <span className="text-nowrap">Start Investing</span>
                    </Link>
                  </Button>
                  <Button
                    key={2}
                    asChild
                    size="lg"
                    variant="ghost"
                    className="px-5 text-base"
                  >
                    <Link
                      href="https://github.com/hiimstevejin/stock-senti"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.396.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-nowrap">Github</span>
                    </Link>
                  </Button>
                </div>
              </div>
              {/* <img
                className="pointer-events-none order-first ml-auto h-56 w-full object-cover invert sm:h-96 lg:absolute lg:inset-0 lg:-right-20 lg:-top-96 lg:order-last lg:h-max lg:w-2/3 lg:object-contain dark:mix-blend-lighten dark:invert-0"
                src="https://ik.imagekit.io/lrigu76hy/tailark/abstract-bg.jpg?updatedAt=1745733473768"
                alt="Abstract Object"
                height="4000"
                width="3000"
              /> */}
            </div>
          </div>
        </section>
        <section className="bg-background pb-16 md:pb-32">
          <div className="group relative m-auto max-w-6xl px-6">
            <div className="flex flex-col items-center md:flex-row">
              <div className="md:max-w-44 md:border-r md:pr-6">
                <p className="text-end text-sm">Tickers</p>
              </div>
              <div className="relative py-6 md:w-[calc(100%-11rem)]">
                <InfiniteSlider gap={112}>
                  <div className="flex">
                    <Image
                      className="mx-auto h-12 w-fit dark:invert"
                      src="/icons/microsoft.svg"
                      alt="Microsoft Logo"
                      height="20"
                      width="50"
                    />
                  </div>

                  <div className="flex">
                    <Image
                      className="mx-auto h-12 w-fit dark:invert"
                      src="/icons/nvidia.svg"
                      alt="Nvidia Logo"
                      height="20"
                      width="50"
                    />
                  </div>

                  <div className="flex">
                    <Image
                      className="mx-auto h-12 w-fit dark:invert"
                      src="/icons/apple.svg"
                      alt="Apple Logo"
                      height="20"
                      width="50"
                    />
                  </div>

                  <div className="flex">
                    <Image
                      className="mx-auto h-12 w-fit dark:invert"
                      src="/icons/amazon.svg"
                      alt="Amazon Logo"
                      height="20"
                      width="50"
                    />
                  </div>

                  <div className="flex">
                    <Image
                      className="mx-auto h-12 w-fit dark:invert"
                      src="/icons/google.svg"
                      alt="Google Logo"
                      height="20"
                      width="50"
                    />
                  </div>

                  <div className="flex">
                    <Image
                      className="mx-auto h-12 w-fit dark:invert"
                      src="/icons/meta.svg"
                      alt="Meta Logo"
                      height="20"
                      width="50"
                    />
                  </div>

                  <div className="flex">
                    <Image
                      className="mx-auto h-12 w-fit dark:invert"
                      src="/icons/tesla.svg"
                      alt="Tesla Logo"
                      height="20"
                      width="50"
                    />
                  </div>
                </InfiniteSlider>

                <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                <ProgressiveBlur
                  className="pointer-events-none absolute left-0 top-0 h-full w-20"
                  direction="left"
                  blurIntensity={1}
                />
                <ProgressiveBlur
                  className="pointer-events-none absolute right-0 top-0 h-full w-20"
                  direction="right"
                  blurIntensity={1}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
