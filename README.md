# Finanshels Corporate Tax Filing - Landing Page

## Deliverables Status
| Deliverable | Status | Link / Notes |
|-------------|--------|--------------|
| Live demo link (Vercel / Netlify) | Complete | https://tax-landing-marketing.vercel.app/ |
| GitHub repo | Complete | https://github.com/v1pu1/tax-landing-marketing |
| Component structure explanation (brief) | Complete | See `Component Structure` section below |
| List of tracked events | Complete | See `Tracked Events` section below |

## Quick Start
```bash
npm install
npm run dev          # Start dev server
npm run api          # Start mock events server (port 3001)
```

## Deployment
```bash
# Vercel
vercel login
vercel deploy

# Netlify
netlify login
netlify deploy --prod
```

## Environment Variables
```bash
VITE_WHATSAPP_NUMBER=971XXXXXXXXX
VITE_API_ENDPOINT=/api/events
VITE_PHONE_NUMBER=+971XXXXXXXXX
```

## Component Structure
- `TopNav`: fixed navigation, desktop/mobile CTA entry points.
- `Hero`: primary conversion message, dual CTAs, trust badges, visual status cards.
- `SocialProofStrip`: counter-based credibility strip with animated metrics.
- `ProblemSection`: founder pain points with high-signal problem framing.
- `SolutionSection`: pipeline visual + compliance solution narrative.
- `InteractiveTools/DeadlineCalculator`: computes due date + WhatsApp reminder CTA.
- `InteractiveTools/ReadinessChecklist`: interactive progress checklist + expert-review CTA.
- `HowItWorks`: four-step process timeline.
- `PricingPlans`: revenue-band plan selector with plan-level CTA tracking.
- `Testimonials`: horizontal snap slider.
- `FAQ`: accordion with analytics on expand.
- `LeadFormSection`: validated lead capture form + inline success state.
- `Footer`: final conversion block + policy links.
- `FloatingWhatsApp`: always-visible WhatsApp trigger.
- `MobileStickyFooter`: mobile-only sticky conversion bar.
- `ThankYou`: `/thank-you` route with next-step flow and direct CTAs.

## Tracked Events
| Event | Trigger | Properties |
|-------|---------|------------|
| `landing_page_view` | Page mount | `page` |
| `cta_whatsapp_click` | WhatsApp button click | `placement`, optional context |
| `cta_call_click` | Call button click | `placement` |
| `cta_book_consultation_click` | Consultation CTA click | `placement` |
| `lead_form_start` | First field focus (+ per-step focus hooks) | optional `step` |
| `lead_form_submit` | Submit button click | - |
| `lead_form_submit_success` | Form success | `lead_id` |
| `lead_form_submit_error` | Validation/API error | `error`, optional fields |
| `thank_you_view` | Thank-you state/route render | optional `lead_id` |
| `deadline_calculator_use` | Calculate button click | `fy_end`, `computed_deadline` |
| `readiness_checklist_interaction` | Checklist toggle / CTA | `action`, `item`, `checked_count`, optional `items_missing` |
| `plan_selected` | Plan tab or plan CTA selection | `plan`, `revenue_band` |
| `faq_expand` | FAQ item expand | `question` |

## Attribution Logic
See `TRACKING_ARCHITECTURE.md`.

## Campaign Tracking Architecture
- `useUTM` captures and persists UTMs and click IDs (`first_touch`, `last_touch`, `click_ids`) in localStorage + first-party cookie.
- `track()` builds a shared event envelope with identity, page context, and attribution.
- Every track call pushes to `window.dataLayer` and POSTs to `/api/events`.
- Express mock endpoint logs and stores events in memory for local verification.

## API Mock
`/api/events.js` provides:
- `POST /api/events` (validates minimum event payload and logs)
- `GET /api/events` (debug event list)

## Scripts
```bash
npm run dev
npm run api
npm run lint
npm run typecheck
npm run build
```
