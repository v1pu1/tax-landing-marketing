# Campaign Tracking & Feedback System (Ads -> Product -> Ads)

## 1) Architecture Diagram

```mermaid
flowchart LR
    A[Meta Ads / Google Ads / TikTok Ads] --> B[Landing Page (React)]
    B --> C[Tracking SDK (UTM + CTA events)]
    C --> D[Event API (/api/events)]
    D --> E[(Event Store / Warehouse)]
    E --> F[Attribution Processor]
    F --> G[CRM / Lead Pipeline]
    G --> H[Qualified Lead Event]
    H --> I[Offline Conversion Dispatcher]
    I --> J[Meta Conversions API]
    I --> K[Google Ads Enhanced Conversions / Offline Imports]
    I --> L[TikTok Events API]
```

## 2) Central Event Schema

```json
{
  "event_id": "uuid-v4",
  "event_name": "page_view | cta_click | form_submit | form_success | lead_qualified | paid_conversion",
  "event_version": "1.0.0",
  "ts_iso": "2026-02-22T17:35:00.000Z",
  "session_id": "browser-session-id",
  "user_id": "optional-auth-user-id",
  "lead_id": "optional-generated-lead-id",
  "page_url": "https://example.com/corporate-tax-filing",
  "page_path": "/corporate-tax-filing",
  "source_platform": "web",
  "channel": "paid_social | paid_search | organic | referral | direct",
  "attribution": {
    "utm_source": "google",
    "utm_medium": "cpc",
    "utm_campaign": "corporate_tax_q1",
    "utm_term": "business tax filing",
    "utm_content": "headline_a",
    "gclid": "optional",
    "fbclid": "optional",
    "ttclid": "optional",
    "msclkid": "optional"
  },
  "cta": {
    "cta_id": "hero_call",
    "cta_type": "call | whatsapp | form_submit_click | scroll_to_form"
  },
  "lead": {
    "status": "new | qualified | paid",
    "value": 1200,
    "currency": "USD"
  },
  "meta": {
    "ip": "hashed/normalized server-side",
    "user_agent": "raw-or-normalized",
    "consent": true
  }
}
```

## 3) Frontend -> Backend Event Flow

1. Browser captures UTM/click IDs on first load and stores them in session storage.
2. CTA clicks and form events trigger `trackEvent(...)` in React.
3. Tracking utility pushes to `window.dataLayer` and sends POST beacon to `/api/events`.
4. Backend enriches with server timestamp, deduplicates by `event_id`, and stores in warehouse.

## 4) Sample React Event Code

```jsx
import { trackCtaClick } from '../lib/tracking'

<a
  href="tel:18005550142"
  onClick={() => trackCtaClick('hero_call', 'call')}
>
  Call an Expert
</a>
```

## 5) Attribution Logic

- Primary attribution uses first-touch UTM values captured at session start.
- Click IDs (`gclid`, `fbclid`, `ttclid`) are stored alongside UTM to support platform-specific offline conversion APIs.
- Lead-level joins happen on `lead_id` plus nearest-session attribution when conversion occurs later in CRM.

## 6) Conversion Feedback Loop

1. Lead progresses in CRM: `new -> qualified -> paid`.
2. CRM/webhook emits lifecycle updates to event API as `lead_qualified` and `paid_conversion`.
3. Dispatcher maps internal schema to platform payload requirements.
4. Conversions are sent server-side to:
   - Meta Conversions API
   - Google Ads offline conversion import / enhanced conversions
   - TikTok Events API
5. Response IDs and errors are logged for retries, dedupe, and reconciliation reporting.

## 7) Assumptions

- User consent is collected before marketing attribution identifiers are persisted/sent.
- Backend has secure credentials for each ad platform API.
- A stable `lead_id` exists from first qualified form submission onward.
- Currency is normalized to USD in the sample schema.
- Event warehouse supports near-real-time ingestion for daily optimization loops.
