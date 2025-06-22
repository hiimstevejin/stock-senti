import Link from "next/link";
import Image from "next/image";

export function DashboardHeader() {
  return (
    <header className="py-3 px-4 sm:px-6 border-b border-border bg-background flex justify-between items-center sticky top-0 z-10">
      <Link href="/" aria-label="home" className="flex items-center space-x-2">
        <Image
          src="/icons/signalfeed.svg"
          alt="SignalFeed Logo"
          className="h-12 w-auto"
          height={50}
          width={50}
        />
        <h1 className="text-xl font-semibold text-foreground">SignalFeed</h1>
      </Link>
    </header>
  );
}
