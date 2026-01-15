export default function DecorativeOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.06]
        bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),
            linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]
        bg-[size:80px_80px]"
      />

      {/* Diagonal accent lines */}
      <div
        className="absolute inset-0 opacity-[0.05]
        bg-[repeating-linear-gradient(
          135deg,
          rgba(139,92,246,0.25),
          rgba(139,92,246,0.25)_1px,
          transparent_1px,
          transparent_140px
        )]"
      />

      {/* Floating shapes */}
      <div className="absolute top-[15%] left-[8%] h-24 w-24 rounded-2xl border border-white/15 bg-white/5 rotate-12" />
      <div className="absolute bottom-[20%] right-[10%] h-32 w-32 rounded-full border border-violet-500/20 bg-violet-500/10" />
      <div className="absolute top-[40%] right-[30%] h-14 w-14 rounded-xl border border-indigo-500/20 bg-indigo-500/10 rotate-45" />
    </div>
  );
}
