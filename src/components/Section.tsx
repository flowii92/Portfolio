import type { ReactNode } from "react";

export default function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="py-12">
      <h2 className="text-violet-500 text-2xl font-bold">{title}</h2>
      {subtitle && <p className="mt-2 text-white/70">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}
