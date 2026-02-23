# Campaign Tracking Architecture

## Attribution Logic

Model: deterministic UTM-based, Last Paid Click primary, First Touch secondary.

Priority order:
1. If `gclid` / `fbclid` / `ttclid` exists, attribute to that ad platform click.
2. Else if `utm_source` exists (non-direct), attribute to UTM.
3. Else if `referrer` exists, attribute to organic referral.
4. Else attribute to `direct / unknown`.

Storage:
- `first_touch_*`: set once on first session with UTMs (not overwritten).
- `last_touch_*`: updated when new UTMs are present.
- `click_ids`: stored when present.
- Persistence window: 30 days in localStorage + first-party cookie.

## Frontend -> Backend Flow

1. User lands on the page.
2. `useUTM` parses UTMs + click IDs and persists first-touch and last-touch attribution.
3. `track('landing_page_view')` sends the event to:
   - `window.dataLayer`
   - `POST /api/events`
4. User interactions (CTA clicks, tool interactions, FAQ expands, form events) call `track(eventName, properties)`.
5. Form submit success includes `lead_id` in `lead_form_submit_success`.
6. Thank-you views emit `thank_you_view`.

## Conversion Feedback to Ad Platforms

### Google Ads
1. Capture `gclid` at landing and store with lead context.
2. Use enhanced conversions for leads with SHA-256 hashed email/phone.
3. Upload conversions via Google Ads API or Data Manager.
4. Support lifecycle conversions: Lead, Qualified Lead, Closed.
5. Batch offline upload via scheduled backend job (e.g., every 15 minutes).

### Meta Ads
1. Capture `fbclid` on landing.
2. Send browser + server events with shared `event_id` for dedupe.
3. Match keys: hashed email, hashed phone, `fbclid`, external/anonymous ID.
4. Browser events: view/contact.
5. Server events: Lead + downstream qualification/close updates.

### TikTok Ads
1. Capture `ttclid` on landing.
2. Pair browser pixel + server Events API with shared `event_id`.
3. Match keys: hashed email/phone, `ttclid`, external ID.
4. Server events: Lead and conversion lifecycle events.

### WhatsApp Leads
1. All WhatsApp CTAs use `wa.me` deep links with prefilled message and lead token.
2. Lead token uses anonymous user identity plus attribution context.
3. Sales/CRM maps lead token back to stored attribution.
4. Qualification/close statuses can then be pushed to ad platforms as offline conversions.
