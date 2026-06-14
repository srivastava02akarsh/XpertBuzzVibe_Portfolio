type Props = {
  intensity?: "bold" | "soft";
  className?: string;
};

/** Animated aurora: drifting, hue-shifting blurred color fields. */
export default function Aurora({ intensity = "soft", className = "" }: Props) {
  const opacity = intensity === "bold" ? "" : "opacity-50";
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${opacity} ${className}`}
    >
      <div
        className="aurora-blob animate-aurora-a animate-hue-drift -top-[20%] -left-[10%] h-[70vh] w-[55vw]"
        style={{ background: "radial-gradient(ellipse, rgba(168,85,247,0.5), transparent 65%)" }}
      />
      <div
        className="aurora-blob animate-aurora-b top-[10%] right-[-15%] h-[60vh] w-[50vw]"
        style={{ background: "radial-gradient(ellipse, rgba(77,124,255,0.42), transparent 65%)" }}
      />
      <div
        className="aurora-blob animate-aurora-c bottom-[-20%] left-[20%] h-[55vh] w-[45vw]"
        style={{ background: "radial-gradient(ellipse, rgba(255,61,190,0.34), transparent 65%)" }}
      />
      <div
        className="aurora-blob animate-aurora-b bottom-[5%] right-[15%] h-[40vh] w-[30vw]"
        style={{ background: "radial-gradient(ellipse, rgba(34,228,255,0.25), transparent 65%)" }}
      />
      <div
        className="aurora-blob animate-aurora-a top-[40%] left-[40%] h-[35vh] w-[28vw]"
        style={{ background: "radial-gradient(ellipse, rgba(255,122,61,0.22), transparent 65%)" }}
      />
    </div>
  );
}
