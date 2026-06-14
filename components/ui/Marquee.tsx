type Props = {
  items: string[];
  reverse?: boolean;
  duration?: string;
  className?: string;
  itemClassName?: string;
};

/** Infinite scrolling ticker. Content is duplicated; CSS animates -50%. */
export default function Marquee({
  items,
  reverse = false,
  duration = "45s",
  className = "",
  itemClassName = "",
}: Props) {
  const anim = reverse ? "animate-marquee-reverse" : "animate-marquee";
  return (
    <div className={`marquee-group overflow-hidden ${className}`}>
      <div
        className={`flex w-max ${anim}`}
        style={{ "--marquee-duration": duration } as React.CSSProperties}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
            {items.map((item) => (
              <span
                key={`${copy}-${item}`}
                className={`flex items-center whitespace-nowrap ${itemClassName}`}
              >
                {item}
                <span className="mx-6 inline-block size-1.5 rounded-full bg-gradient-to-r from-violet to-magenta md:mx-10" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
