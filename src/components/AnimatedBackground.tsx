export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Radial gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_800px_at_20%_10%,rgba(249, 248, 250, 0.25),transparent_60%),radial-gradient(900px_700px_at_85%_30%,rgb(184, 206, 241),transparent_55%),radial-gradient(900px_700px_at_50%_90%,rgb(243, 245, 242),transparent_55%)]" />

      {/* Animated conic glow */}
      <div
        className="absolute -inset-[40%] opacity-70 blur-3xl animate-[spin_22s_linear_infinite]
        bg-[conic-gradient(from_90deg,rgba(168,85,247,0.18),rgba(59,130,246,0.16),rgba(16,185,129,0.14),rgba(168,85,247,0.18))]"
      />


    </div>
  );
}