import { FormEvent, RefObject, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { PHONE_NUMBER, WHATSAPP_MESSAGES, WHATSAPP_NUMBER } from '../config'
import { useTrack } from '../hooks/useTrack'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import { ArrowIcon, EmailIcon, PhoneIcon, WhatsAppIcon } from './Icons'

type LeadFormSectionProps = {
  sectionRef: RefObject<HTMLElement>
}

type FormValues = {
  fullName: string
  email: string
  countryCode: string
  phone: string
  companyName: string
  consent: boolean
}

const INITIAL_VALUES: FormValues = {
  fullName: '',
  email: '',
  countryCode: '+971',
  phone: '',
  companyName: '',
  consent: false,
}

const COUNTRY_CODES = ['+971', '+966', '+973', '+965', '+974', '+968']

type FormErrors = Partial<Record<keyof FormValues, string>>

function generateLeadId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `lead_${Date.now()}`
}

function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {}

  if (!values.fullName.trim()) {
    errors.fullName = 'Please enter your full name.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid work email.'
  }

  if (!/^\d{7,12}$/.test(values.phone.replace(/\D/g, ''))) {
    errors.phone = 'Please enter a valid phone number.'
  }

  if (!values.companyName.trim()) {
    errors.companyName = 'Please enter your company name.'
  }

  if (!values.consent) {
    errors.consent = 'Please agree to continue.'
  }

  return errors
}

function fieldToStep(field: keyof FormValues): string {
  switch (field) {
    case 'fullName':
      return 'full_name'
    case 'email':
      return 'work_email'
    case 'countryCode':
      return 'country_code'
    case 'phone':
      return 'phone'
    case 'companyName':
      return 'company_name'
    case 'consent':
      return 'consent'
    default:
      return 'unknown'
  }
}

export default function LeadFormSection({ sectionRef }: LeadFormSectionProps) {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES)
  const [errors, setErrors] = useState<FormErrors>({})
  const [started, setStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [leadId, setLeadId] = useState<string | null>(null)

  const trackedSteps = useRef<Set<string>>(new Set())
  const { trackCall, trackEvent, trackWhatsApp } = useTrack()

  const checklistWhatsAppUrl = useMemo(
    () => buildWhatsAppUrl(WHATSAPP_NUMBER, WHATSAPP_MESSAGES.checklist),
    [],
  )

  const defaultWhatsAppUrl = useMemo(
    () => buildWhatsAppUrl(WHATSAPP_NUMBER, WHATSAPP_MESSAGES.callback),
    [],
  )

  function onFieldFocus(field: keyof FormValues) {
    if (!started) {
      setStarted(true)
      trackEvent('lead_form_start')
    }

    const stepName = fieldToStep(field)
    if (!trackedSteps.current.has(stepName)) {
      trackedSteps.current.add(stepName)
      trackEvent('lead_form_start', { step: stepName })
    }
  }

  function setField<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  function validateSingleField(field: keyof FormValues): string | undefined {
    const result = validateForm(values)
    return result[field]
  }

  function onBlurField(field: keyof FormValues) {
    const fieldError = validateSingleField(field)
    setErrors((prev) => ({ ...prev, [field]: fieldError }))
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const validation = validateForm(values)

    trackEvent('lead_form_submit')

    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      trackEvent('lead_form_submit_error', {
        error: 'validation_failed',
        fields: Object.keys(validation),
      })
      return
    }

    setIsLoading(true)

    try {
      await new Promise((resolve) => window.setTimeout(resolve, 700))
      const generatedLeadId = generateLeadId()
      setLeadId(generatedLeadId)

      trackEvent('lead_form_submit_success', { lead_id: generatedLeadId })
      trackEvent('thank_you_view')
    } catch (error) {
      trackEvent('lead_form_submit_error', {
        error: error instanceof Error ? error.message : 'unknown_error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="lead-form" ref={sectionRef} className="py-16 md:py-24">
      <div className="mx-auto grid w-[min(1200px,calc(100%-1.5rem))] gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl leading-tight md:text-5xl">
            Get a callback from a
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            corporate tax expert.
          </h2>
          <p className="mt-4 text-lg text-muted">
            Tell us about your company. We'll confirm what you need, what you don't, and the fastest path to
            submission.
          </p>

          <ul className="mt-6 space-y-3 text-sm font-semibold text-primary">
            <li>✓ Response within 1 business day</li>
            <li>✓ No commitment required</li>
            <li>✓ 4.9★ on Trustpilot</li>
            <li>✓ 700+ clients filed</li>
          </ul>
        </div>

        {!leadId ? (
          <form onSubmit={onSubmit} noValidate className="rounded-xl border border-black/10 bg-white p-5 shadow-card">
            <div className="grid gap-4">
              <Field
                label="Full name"
                value={values.fullName}
                error={errors.fullName}
                onFocus={() => onFieldFocus('fullName')}
                onBlur={() => onBlurField('fullName')}
                onChange={(value) => setField('fullName', value)}
              />

              <Field
                label="Work email"
                type="email"
                value={values.email}
                error={errors.email}
                onFocus={() => onFieldFocus('email')}
                onBlur={() => onBlurField('email')}
                onChange={(value) => setField('email', value)}
              />

              <label className="space-y-1 text-sm font-medium text-ink">
                Phone number (with country code)
                <div className="flex h-11 overflow-hidden rounded-card border border-black/15 bg-base focus-within:border-primary/40">
                  <select
                    className="h-full shrink-0 border-r border-black/10 bg-transparent px-3 text-sm"
                    value={values.countryCode}
                    onFocus={() => onFieldFocus('countryCode')}
                    onBlur={() => onBlurField('countryCode')}
                    onChange={(event) => setField('countryCode', event.target.value)}
                  >
                    {COUNTRY_CODES.map((code) => (
                      <option key={code} value={code}>
                        {code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm outline-none"
                    value={values.phone}
                    onFocus={() => onFieldFocus('phone')}
                    onBlur={() => onBlurField('phone')}
                    onChange={(event) => setField('phone', event.target.value)}
                    placeholder="50 123 4567"
                  />
                </div>
                {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
              </label>

              <Field
                label="Company name"
                value={values.companyName}
                error={errors.companyName}
                onFocus={() => onFieldFocus('companyName')}
                onBlur={() => onBlurField('companyName')}
                onChange={(value) => setField('companyName', value)}
              />

              <label className="flex items-start gap-3 rounded-card border border-black/10 bg-base px-3 py-2 text-sm">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 accent-primary"
                  checked={values.consent}
                  onFocus={() => onFieldFocus('consent')}
                  onBlur={() => onBlurField('consent')}
                  onChange={(event) => setField('consent', event.target.checked)}
                />
                <span>I agree to be contacted about corporate tax filing services.</span>
              </label>
              {errors.consent && <p className="text-xs text-red-600">{errors.consent}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex h-12 items-center justify-center rounded-card bg-primary text-sm font-bold text-accent disabled:opacity-60"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                    Submitting...
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <span>Get my callback</span>
                    <ArrowIcon className="h-4 w-4" />
                  </span>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="rounded-xl border border-primary/25 bg-white p-6 shadow-card">
            <svg viewBox="0 0 120 120" className="h-16 w-16 text-primary" aria-hidden="true">
              <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="6" fill="none" className="opacity-25" />
              <path
                d="M34 62 52 80 88 42"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="check-draw"
              />
            </svg>

            <h3 className="mt-4 font-display text-3xl">You are in, we will reach out shortly.</h3>
            <p className="mt-3 text-muted">
              If you want this faster, WhatsApp us now and we'll pick it up immediately.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={defaultWhatsAppUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-card bg-primary px-4 py-2 text-center text-sm font-bold text-accent"
                onClick={() => trackWhatsApp('lead_form_success')}
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span>WhatsApp now</span>
              </a>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="inline-flex items-center justify-center gap-2 rounded-card border border-primary px-4 py-2 text-center text-sm font-semibold text-primary"
                onClick={() => trackCall('lead_form_success')}
              >
                <PhoneIcon className="h-4 w-4" />
                <span>Call now</span>
              </a>
              <a
                href={checklistWhatsAppUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-card border border-black/10 px-4 py-2 text-center text-sm font-semibold"
                onClick={() => trackWhatsApp('lead_form_success_checklist')}
              >
                <EmailIcon className="h-4 w-4" />
                <span>Send me the document checklist</span>
              </a>
              <Link
                to={`/thank-you?lead_id=${encodeURIComponent(leadId)}`}
                className="rounded-card border border-black/10 px-4 py-2 text-center text-sm font-semibold text-muted"
              >
                Open full thank you page
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

type FieldProps = {
  label: string
  value: string
  error?: string
  type?: string
  onFocus: () => void
  onBlur: () => void
  onChange: (value: string) => void
}

function Field({ label, value, error, type = 'text', onFocus, onBlur, onChange }: FieldProps) {
  return (
    <label className="space-y-1 text-sm font-medium text-ink">
      {label}
      <input
        type={type}
        className="h-11 w-full rounded-card border border-black/15 bg-base px-3"
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value)}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </label>
  )
}
