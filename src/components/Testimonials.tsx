const TESTIMONIALS = [
  {
    quote:
      'Fast, professional, and highly communicative. We stopped worrying about compliance the moment we handed it over.',
    author: 'M.A., Founder, UAE SaaS startup',
  },
  {
    quote: 'What used to take us weeks of back and forth was handled cleanly and quickly. Worth every dirham.',
    author: 'S.K., Operations Manager, Dubai eCommerce',
  },
  {
    quote:
      "They flagged a relief we weren't even aware of. That alone paid for the service three times over.",
    author: 'R.T., CEO, Abu Dhabi consulting firm',
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto w-[min(1200px,calc(100%-1.5rem))]">
        <h2 className="font-display text-3xl md:text-5xl">Real founders. Real filings. Real relief.</h2>

        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
          {TESTIMONIALS.map((item) => (
            <article
              key={item.author}
              className="min-w-[min(100%,22rem)] snap-start rounded-xl border border-black/10 bg-white p-5 shadow-card"
            >
              <div className="mb-3 text-accent">★★★★★</div>
              <p className="text-base italic leading-7 text-ink">"{item.quote}"</p>
              <p className="mt-4 text-sm font-semibold text-muted">{item.author}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
