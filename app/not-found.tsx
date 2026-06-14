import MagneticButton from "@/components/ui/MagneticButton";
import GradientBlob from "@/components/ui/GradientBlob";

export default function NotFound() {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <GradientBlob className="top-1/4 left-1/2 size-[600px] -translate-x-1/2" color="violet" />
      <div className="relative">
        <p className="font-display text-[clamp(6rem,20vw,14rem)] font-bold leading-none text-gradient-animated">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-bold text-ink md:text-3xl">
          This page didn&apos;t go viral. It went missing.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          The link you followed is broken or the page has moved. Let&apos;s get you
          back to the good stuff.
        </p>
        <div className="mt-10">
          <MagneticButton href="/">Back to Home</MagneticButton>
        </div>
      </div>
    </section>
  );
}
