type StatCard = {
  value: string
  label: string
  subline: string
}

const STATS: StatCard[] = [
  {
    value: '6,000+',
    label: 'Business owners',
    subline: 'trusted across UAE',
  },
  {
    value: '4.9★',
    label: 'Trustpilot',
    subline: '700+ verified reviews',
  },
  {
    value: '< 5 min',
    label: 'Fast track filing',
    subline: 'via AI powered portal',
  },
  {
    value: 'Backed by',
    label: 'MBRIF · in5 · Kube VC',
    subline: 'UAE ecosystem partners',
  },
]

export default function SocialProofStrip() {
  return (
    <section className="bg-primary py-8 text-white">
      <div className="mx-auto grid w-[min(1200px,calc(100%-1.5rem))] grid-cols-2 gap-5 md:grid-cols-4">
        {STATS.map((item) => (
          <article key={item.label} className="flex h-full flex-col items-center text-center">
            <p className="font-mono text-2xl font-bold md:text-3xl">{item.value}</p>
            <p className="mt-1 text-sm font-semibold">{item.label}</p>
            <p className="mt-1 text-xs text-white/80">{item.subline}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
