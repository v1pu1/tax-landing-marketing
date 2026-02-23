import { useEffect } from 'react'
import { initAttribution } from '../utils/attribution'

export function useUTM(): void {
  useEffect(() => {
    initAttribution()
  }, [])
}
