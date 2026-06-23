import type { ReactNode } from "react";

type SectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  dark?: boolean;
};

export function Section({ eyebrow, title, description, children, dark }: SectionProps) {
  return (
    <section className={dark ? "bg-ink text-white" : "bg-white text-ink"}>
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow ? <p className={dark ? "text-sm font-bold uppercase tracking-[0.16em] text-white/70" : "text-sm font-bold uppercase tracking-[0.16em] text-blue-primary"}>{eyebrow}</p> : null}
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-4xl">{title}</h2>
          {description ? <p className={dark ? "mt-4 text-lg leading-8 text-white/70" : "mt-4 text-lg leading-8 text-ink/68"}>{description}</p> : null}
        </div>
        {children ? <div className="mt-12">{children}</div> : null}
      </div>
    </section>
  );
}
