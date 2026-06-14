import MagneticButton from "@/components/ui/MagneticButton";
import TextReveal from "@/components/ui/TextReveal";
import GradientBlob from "@/components/ui/GradientBlob";

type Props = {
  eyebrow?: string;
  title?: string;
  body?: string;
  buttonLabel?: string;
};

export default function CtaSection({
  eyebrow = "Ready when you are",
  title = "Your brand's viral moment is one conversation away.",
  body = "Tell us where you want to be. We'll engineer the campaign that gets you there.",
  buttonLabel = "Start a Project",
}: Props) {
  return (
    <section className="relative overflow-hidden py-32 md:py-44">
      <GradientBlob className="top-1/4 left-1/2 size-[800px] -translate-x-1/2" color="violet" />
      <GradientBlob className="bottom-0 right-0 size-[400px]" color="cyan" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <p className="eyebrow mb-6">{eyebrow}</p>
        <TextReveal
          as="h2"
          text={title}
          className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl"
        />
        <p className="mx-auto mt-8 max-w-xl text-lg text-muted">{body}</p>
        <div className="mt-12">
          <MagneticButton href="/#contact" className="!px-12 !py-5 !text-base">
            {buttonLabel} <span aria-hidden>→</span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
