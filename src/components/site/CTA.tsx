import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <section className="relative overflow-hidden border-y border-white/5">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/15 blur-[140px]" />
        <div className="absolute right-0 top-0 size-[280px] rounded-full bg-violet-500/15 blur-[120px]" />
      </div>
      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/80">Stop guessing about your money</p>
        <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
          Turn messy money data into a clear future model.
        </h2>
        <p className="max-w-2xl text-base text-slate-300 md:text-lg">
          A single visual layer over your financial life. See where you are, where you’re headed, and the
          highest-leverage paths to multiply your net worth.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button href="/demo" size="lg">
            Try the demo
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Request early access
          </Button>
        </div>
        <p className="max-w-md text-xs text-slate-500">
          Educational projections only. Not financial, tax, legal, or investment advice.
        </p>
      </div>
    </section>
  );
}
