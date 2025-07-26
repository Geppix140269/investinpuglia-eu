// components/HeroPuglia.tsx
import Image from "next/image";

export default function HeroPuglia() {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <Image
        src="/puglia-bg.jpg"
        alt="Puglia landscape"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        priority
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center px-6">
        <div className="text-center text-white max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Discover the Power of Property Intelligence
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-light">
            Invest smart in Puglia with clarity, speed, and full control.
          </p>
        </div>
      </div>
    </section>
  );
}
