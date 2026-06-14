type Props = {
  className?: string;
  color?: "violet" | "cyan" | "magenta" | "blue" | "orange";
};

/** Soft ambient glow blob for section backgrounds. Position via className. */
export default function GradientBlob({ className = "", color = "violet" }: Props) {
  const gradients = {
    violet: "radial-gradient(circle, rgba(168,85,247,0.26) 0%, transparent 70%)",
    cyan: "radial-gradient(circle, rgba(34,228,255,0.17) 0%, transparent 70%)",
    magenta: "radial-gradient(circle, rgba(255,61,190,0.22) 0%, transparent 70%)",
    blue: "radial-gradient(circle, rgba(77,124,255,0.22) 0%, transparent 70%)",
    orange: "radial-gradient(circle, rgba(255,122,61,0.18) 0%, transparent 70%)",
  };
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={{ background: gradients[color] }}
    />
  );
}
