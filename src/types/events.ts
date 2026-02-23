export type EventName =
  | 'landing_page_view'
  | 'cta_whatsapp_click'
  | 'cta_call_click'
  | 'cta_book_consultation_click'
  | 'lead_form_start'
  | 'lead_form_submit'
  | 'lead_form_submit_success'
  | 'lead_form_submit_error'
  | 'thank_you_view'
  | 'deadline_calculator_use'
  | 'readiness_checklist_interaction'
  | 'plan_selected'
  | 'faq_expand'

export interface EventEnvelope {
  event_id: string
  event_name: EventName
  event_time: string
  event_time_unix: number
  session_id: string
  anonymous_id: string
  lead_id?: string
  page_url: string
  page_path: string
  referrer: string
  attribution?: Record<string, unknown>
  first_touch_utm_source?: string
  first_touch_utm_medium?: string
  first_touch_utm_campaign?: string
  first_touch_utm_term?: string
  first_touch_utm_content?: string
  first_touch_utm_id?: string
  first_touch_referrer?: string
  first_touch_time?: string
  last_touch_utm_source?: string
  last_touch_utm_medium?: string
  last_touch_utm_campaign?: string
  last_touch_utm_term?: string
  last_touch_utm_content?: string
  last_touch_utm_id?: string
  gclid?: string
  gbraid?: string
  wbraid?: string
  fbclid?: string
  ttclid?: string
  ad_user_data_consent?: boolean
  ad_personalization_consent?: boolean
  properties?: Record<string, unknown>
}
