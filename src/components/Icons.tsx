import { SVGProps } from 'react'

function outlineIconProps(extra?: SVGProps<SVGSVGElement>): SVGProps<SVGSVGElement> {
  return {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    ...extra,
  }
}

function filledIconProps(extra?: SVGProps<SVGSVGElement>): SVGProps<SVGSVGElement> {
  return {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    ...extra,
  }
}

export function PhoneIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg {...filledIconProps(props)}>
      <path
        fill="currentColor"
        d="M21.33 19.035a2.57 2.57 0 0 1-.884 1.432a5.251 5.251 0 0 1-3.738 1.564h-.325a10.973 10.973 0 0 1-4.205-1.087h-.01c-.305-.142-.62-.284-.925-.457a19.127 19.127 0 0 1-4.185-3.18a18.193 18.193 0 0 1-3.9-5.292A11.692 11.692 0 0 1 2.14 8.572a6.38 6.38 0 0 1 .407-3.708a6.827 6.827 0 0 1 1.148-1.432A2.194 2.194 0 0 1 5.29 2.69a2.51 2.51 0 0 1 1.687.935c.457.497 1.015 1.015 1.473 1.493l.63.62c.37.328.599.786.64 1.28c0 .453-.167.89-.468 1.229a9.141 9.141 0 0 1-.62.68l-.203.213c-.118.11-.208.246-.264.397c-.05.147-.07.302-.06.457c.161.431.414.823.74 1.148c.509.69 1.017 1.29 1.535 1.94a12.9 12.9 0 0 0 3.29 2.733c.127.093.273.155.428.182c.134.01.27-.01.396-.06c.355-.209.67-.477.934-.793a2.174 2.174 0 0 1 1.422-.782a2.032 2.032 0 0 1 1.423.61c.203.172.426.406.64.63l.304.314l.315.305l.539.548c.321.285.623.59.904.915c.282.39.409.872.355 1.35m-3.646-6.958a.772.772 0 0 1-.762-.762a4.37 4.37 0 0 0-4.378-4.378a.762.762 0 0 1 0-1.524a5.893 5.893 0 0 1 5.902 5.902a.762.762 0 0 1-.762.762"
      />
      <path
        fill="currentColor"
        d="M21.209 11.72a.772.772 0 0 1-.762-.761a7.455 7.455 0 0 0-7.456-7.467a.762.762 0 1 1 0-1.523a8.98 8.98 0 0 1 8.98 8.99a.762.762 0 0 1-.762.762"
      />
    </svg>
  )
}

export function WhatsAppIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg {...filledIconProps(props)}>
      <path
        fill="currentColor"
        d="m13.79 2.64l-.57-.08a9.13 9.13 0 0 0-8.92 4a9.1 9.1 0 0 0-.71 9.66a1.3 1.3 0 0 1 .1 1c-.41 1.41-.79 2.83-1.19 4.32l.5-.15c1.35-.36 2.7-.72 4.05-1.05a1.45 1.45 0 0 1 .85.08a9.45 9.45 0 1 0 5.89-17.78m2.52 13.12a2.76 2.76 0 0 1-2.72.56a9.19 9.19 0 0 1-5.13-3.71a8.51 8.51 0 0 1-1.11-2.08a2.49 2.49 0 0 1 .55-2.52a1.23 1.23 0 0 1 1.32-.42c.2.05.34.34.52.56c.146.413.317.817.51 1.21a.94.94 0 0 1-.2 1.31c-.45.4-.38.73-.06 1.18a6.71 6.71 0 0 0 2.82 2.32c.32.14.56.17.77-.16c.09-.13.21-.24.31-.36c.58-.73.4-.72 1.32-.32c.293.123.577.267.85.43c.27.16.68.33.74.57a1.45 1.45 0 0 1-.49 1.43"
      />
    </svg>
  )
}

export function EmailIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg {...filledIconProps(props)}>
      <path
        fill="currentColor"
        d="M17.25 2.75H6.75A4.75 4.75 0 0 0 2 7.5v9a4.75 4.75 0 0 0 4.75 4.75h10.5A4.76 4.76 0 0 0 22 16.5v-9a4.76 4.76 0 0 0-4.75-4.75m-3.65 8.32a3.26 3.26 0 0 1-3.23 0L3.52 7.14a3.25 3.25 0 0 1 3.23-2.89h10.5a3.26 3.26 0 0 1 3.23 2.89z"
      />
    </svg>
  )
}

export function ArrowIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg {...filledIconProps(props)}>
      <path
        fill="currentColor"
        d="M12 1.75A10.25 10.25 0 1 0 22.25 12A10.26 10.26 0 0 0 12 1.75m6.43 11a2.19 2.19 0 0 1-.45.67l-4.58 4.53a1 1 0 0 1-1.42-.01a1 1 0 0 1 0-1.41l3.61-3.57H6.44a1 1 0 0 1 0-2h9.09l-3.55-3.57a1 1 0 1 1 1.42-1.41l4.58 4.53c.19.194.343.42.45.67a2 2 0 0 1 0 1.58z"
      />
    </svg>
  )
}

export function CalendarWarningIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg {...outlineIconProps(props)}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
      <path d="M12 13v3M12 18h.01" />
    </svg>
  )
}

export function DocumentsIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg {...outlineIconProps(props)}>
      <rect x="4" y="4" width="12" height="16" rx="2" />
      <path d="M8 8h4M8 12h6M8 16h5" />
      <path d="M10 2h10v16" />
    </svg>
  )
}

export function ShieldUserIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg {...outlineIconProps(props)}>
      <path d="M12 2 4 5v6c0 5 3 9 8 11 5-2 8-6 8-11V5Z" />
      <circle cx="12" cy="10" r="2" />
      <path d="M8.5 16a4 4 0 0 1 7 0" />
    </svg>
  )
}

export function BulbIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg {...outlineIconProps(props)}>
      <path d="M12 3a6 6 0 0 0-3 11v2h6v-2a6 6 0 0 0-3-11Z" />
      <path d="M9 20h6M10 17h4" />
    </svg>
  )
}

export function CheckIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg {...outlineIconProps(props)}>
      <path d="m5 12 5 5 9-9" />
    </svg>
  )
}

export function UploadIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg {...outlineIconProps(props)}>
      <path d="M12 16V6" />
      <path d="m8 10 4-4 4 4" />
      <path d="M4 18h16" />
    </svg>
  )
}

export function SearchIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg {...outlineIconProps(props)}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3-3" />
    </svg>
  )
}

export function ShieldCheckIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg {...outlineIconProps(props)}>
      <path d="M12 2 4 5v6c0 5 3 9 8 11 5-2 8-6 8-11V5Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

export function HandshakeIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg {...outlineIconProps(props)}>
      <path d="M8 12 5 9l-3 3 6 6 3-3" />
      <path d="m16 12 3-3 3 3-6 6-3-3" />
      <path d="m9 14 2 2m2-2 2 2" />
    </svg>
  )
}

export function MenuIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg {...outlineIconProps(props)}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function CloseIcon(props?: SVGProps<SVGSVGElement>) {
  return (
    <svg {...outlineIconProps(props)}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  )
}
