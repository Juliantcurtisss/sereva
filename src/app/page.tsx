import HeroField from "@/components/HeroField";
import ModelViewer from "@/components/ModelViewer";
import SpotlightCard from "@/components/SpotlightCard";
import {
  DrawnRule,
  HeroDrift,
  MotionProvider,
  Reveal,
  ScrollProgress,
  SpecList,
  SpecRow,
  WordReveal,
} from "@/components/Motion";

type Model = {
  name: string;
  modelSrc?: string;
  tagline: string;
  summary: string;
  specs: { label: string; value: string }[];
};

type Range = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  models: Model[];
};

const ceCompliance =
  "Class I medical device, CE marked under Regulation (EU) 2017/745 (MDR), registered in EUDAMED";

const ranges: Range[] = [
  {
    id: "products",
    eyebrow: "Bed bathing",
    title: "The bed bath, reinvented.",
    summary:
      "Body and hair washed directly in bed. A single nozzle sprays water and draws it away at the same moment — no transfer, no soap or rinsing, and the bed stays dry.",
    models: [
      {
        name: "SEREVA 02",
        modelSrc: "/models/sereva-02.glb",
        tagline: "For highly dependent people",
        summary:
          "A full wash of body and hair without leaving the bed. Separate clean and waste water tanks, water held at the temperature you choose, and battery power to move from room to room.",
        specs: [
          { label: "Tanks", value: "12 L clean water / 12 L waste water" },
          { label: "Temperature", value: "0–50 °C, adjustable" },
          { label: "Power", value: "DC 24 V battery" },
          { label: "Control", value: "Digital display" },
          { label: "Use", value: "Body and hair" },
        ],
      },
    ],
  },
  {
    id: "transfers",
    eyebrow: "Transfers and lifting",
    title: "From bed to chair, with a single caregiver.",
    summary:
      "Two transfer chairs and a stand aid: three ways to move a person with limited mobility safely, seated and supported, without carrying them by hand.",
    models: [
      {
        name: "TC04",
        modelSrc: "/models/tc04.glb",
        tagline: "Transfer chair with manual hydraulic lift",
        summary:
          "Lifts and moves the person in a seated position. The pump-operated lift needs no battery or charging, and the chair doubles as a commode. Sturdy enough for daily use.",
        specs: [
          { label: "Lifting", value: "Hydraulic, pump-operated" },
          { label: "Function", value: "Commode chair" },
          {
            label: "Ideal for",
            value: "Occasional transfers, nursing homes, long-term care units",
          },
          { label: "Compliance", value: ceCompliance },
        ],
      },
      {
        name: "TC06",
        modelSrc: "/models/tc06.glb",
        tagline: "Transfer chair with battery-powered electric lift",
        summary:
          "Raised and lowered by remote control. It passes under beds with as little as 13 cm of clearance and opens to 180° so the person can be seated easily.",
        specs: [
          { label: "Lifting", value: "Electric, rechargeable battery" },
          { label: "Brakes", value: "Pedal and hand brake" },
          {
            label: "Features",
            value: "Removable armrests, meal tray, commode function",
          },
          {
            label: "Ideal for",
            value: "Frequent transfers, geriatrics, rehabilitation units",
          },
          { label: "Compliance", value: ceCompliance },
        ],
      },
      {
        name: "IHR01",
        modelSrc: "/models/ihr01.glb",
        tagline: "Stand aid and patient lift",
        summary:
          "Two uses in one device: help with standing up, and full lifting from the bed to a wheelchair, the toilet or a commode. A steel frame on quiet castors that encourages the person to take part as they stand.",
        specs: [
          { label: "Load", value: "200 kg" },
          { label: "Weight", value: "37 kg" },
          {
            label: "Dimensions",
            value: "L 1,180 × inner W 510 × H 1,500 mm",
          },
          {
            label: "Suited to",
            value: "Rehabilitation units, nursing homes and home care",
          },
        ],
      },
    ],
  },
];

const principles = [
  {
    title: "Selected, not stocked",
    body: "A short, deliberate range. Every product is chosen for reliability and ease of use.",
  },
  {
    title: "Clear specifications",
    body: "Plain documentation for each device, so you know exactly what you are ordering.",
  },
  {
    title: "Support after delivery",
    body: "Setup guidance, servicing and spare parts from people who know the equipment.",
  },
];

const contactSteps = [
  {
    title: "You send a short note",
    body: "Tell us about your practice and what you are looking for.",
  },
  {
    title: "We come back with options",
    body: "Suitable devices, with the specifications for each.",
  },
  {
    title: "You receive a quote",
    body: "A clear price for the equipment you choose.",
  },
];

export default function Home() {
  return (
    <MotionProvider>
      <ScrollProgress />
      <header className="fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-deep/85 text-white backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <a href="#top" className="text-lg font-medium tracking-tight">
            Sereva
          </a>
          <nav className="hidden items-center gap-8 text-sm text-white/70 sm:flex">
            <a href="#products" className="transition-colors hover:text-white">
              Bed bathing
            </a>
            <a href="#transfers" className="transition-colors hover:text-white">
              Transfers
            </a>
            <a href="#approach" className="transition-colors hover:text-white">
              Approach
            </a>
            <a href="#contact" className="transition-colors hover:text-white">
              Contact
            </a>
          </nav>
          <a
            href="#contact"
            className="rounded-full border border-white/40 px-4 py-2 text-sm transition-colors hover:border-white hover:bg-white hover:text-deep"
          >
            Request a quote
          </a>
        </div>
      </header>

      <main id="top" className="flex-1">
        <section className="relative overflow-hidden bg-linear-to-b from-deep via-[#0d2f8f] to-accent text-white">
          <HeroField />
          <HeroDrift className="relative mx-auto w-full max-w-6xl px-6 pt-40 pb-28 sm:pt-52 sm:pb-40">
            <Reveal>
              <p className="text-sm tracking-wide text-glow">Medical equipment</p>
            </Reveal>
            <h1 className="mt-6 max-w-3xl text-4xl leading-[1.1] font-medium tracking-tight sm:text-6xl">
              <WordReveal
                text="Equipment you can rely on, for the care you provide."
                delay={0.1}
              />
            </h1>
            <Reveal delay={0.55}>
              <p className="mt-8 max-w-xl text-lg leading-8 text-white/75">
                Sereva supplies clinics, practices and home care with a
                considered range of medical equipment — clearly specified and
                properly supported.
              </p>
            </Reveal>
            <Reveal delay={0.7} className="mt-10 flex flex-wrap gap-4">
              <a
                href="#products"
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-deep transition-opacity hover:opacity-90"
              >
                Browse the range
              </a>
              <a
                href="#contact"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-medium transition-colors hover:border-white"
              >
                Talk to us
              </a>
            </Reveal>
          </HeroDrift>
        </section>

        {ranges.map((range) => (
          <section
            key={range.id}
            id={range.id}
            className="scroll-mt-16 border-t border-line"
          >
            <div className="mx-auto w-full max-w-6xl px-6 py-24">
              <Reveal>
                <p className="text-sm tracking-wide text-accent">{range.eyebrow}</p>
              </Reveal>
              <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
                <WordReveal text={range.title} />
              </h2>
              <Reveal delay={0.25}>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
                  {range.summary}
                </p>
              </Reveal>

              <div className="mt-20 flex flex-col gap-24">
                {range.models.map((model, index) => (
                  <article
                    key={model.name}
                    className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
                  >
                    <div className={index % 2 === 1 ? "md:order-2" : undefined}>
                      <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">
                        <WordReveal text={model.name} />
                      </h3>
                      <Reveal delay={0.1}>
                        <p className="mt-2 text-accent">{model.tagline}</p>
                        <p className="mt-6 leading-7 text-muted">{model.summary}</p>
                      </Reveal>
                      <SpecList className="mt-8">
                        {model.specs.map((spec) => (
                          <SpecRow
                            key={spec.label}
                            className="grid grid-cols-[7.5rem_1fr] gap-4 py-3 text-sm"
                          >
                            <dt className="text-muted">{spec.label}</dt>
                            <dd className="font-medium">{spec.value}</dd>
                          </SpecRow>
                        ))}
                      </SpecList>
                    </div>
                    <ModelViewer name={model.name} src={model.modelSrc} />
                  </article>
                ))}
              </div>

              <p className="mt-16 text-xs text-muted">
                Specifications provided by the manufacturer and subject to change.
              </p>
            </div>
          </section>
        ))}

        <section id="approach" className="scroll-mt-16 border-t border-line bg-surface">
          <div className="mx-auto w-full max-w-6xl px-6 py-24">
            <Reveal>
              <p className="text-sm tracking-wide text-accent">Our approach</p>
            </Reveal>
            <h2 className="mt-4 max-w-3xl text-3xl font-medium tracking-tight sm:text-5xl sm:leading-[1.1]">
              <WordReveal text="Fewer products, chosen carefully, backed properly." />
            </h2>
            <ul className="mt-16 grid gap-6 md:grid-cols-3">
              {principles.map((principle, index) => (
                <li key={principle.title}>
                  <Reveal delay={0.15 + index * 0.15} className="h-full">
                    <SpotlightCard className="flex h-full flex-col p-8">
                      <span
                        aria-hidden="true"
                        className="font-mono text-5xl font-light tracking-tight text-accent"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="mt-16">
                        <DrawnRule delay={0.3 + index * 0.15} />
                        <h3 className="pt-6 text-lg font-medium">{principle.title}</h3>
                        <p className="mt-3 leading-7 text-muted">{principle.body}</p>
                      </div>
                    </SpotlightCard>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" className="scroll-mt-16 border-t border-line">
          <div className="mx-auto w-full max-w-6xl px-6 py-24">
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-deep via-[#0d2f8f] to-accent text-white">
              <HeroField intensity={0.45} />
              <div className="relative grid gap-14 px-6 py-16 sm:px-12 sm:py-20 md:grid-cols-2 md:gap-16">
                <div>
                  <Reveal>
                    <p className="text-sm tracking-wide text-glow">Contact</p>
                  </Reveal>
                  <h2 className="mt-4 text-3xl leading-[1.1] font-medium tracking-tight sm:text-5xl">
                    <WordReveal text="Tell us what your practice needs." />
                  </h2>
                  <Reveal delay={0.3}>
                    <p className="mt-6 max-w-md leading-7 text-white/75">
                      Send us a short note and we will come back with options,
                      specifications and a quote.
                    </p>
                    <a
                      href="mailto:hello@example.com"
                      className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white py-2 pr-2 pl-6 text-sm font-medium text-deep transition-opacity hover:opacity-90"
                    >
                      Get in touch
                      <span
                        aria-hidden="true"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-deep text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-rotate-45"
                      >
                        →
                      </span>
                    </a>
                  </Reveal>
                </div>
                <ol className="flex flex-col justify-center">
                  {contactSteps.map((step, index) => (
                    <li key={step.title}>
                      <Reveal
                        delay={0.2 + index * 0.15}
                        className="flex gap-6 border-t border-white/20 py-6"
                      >
                        <span
                          aria-hidden="true"
                          className="font-mono text-sm text-glow"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="font-medium">{step.title}</h3>
                          <p className="mt-1 leading-7 text-white/70">{step.body}</p>
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-muted">
          <span>© 2026 Sereva</span>
          <span>Medical equipment for clinics, practices and home care.</span>
        </div>
      </footer>
    </MotionProvider>
  );
}
