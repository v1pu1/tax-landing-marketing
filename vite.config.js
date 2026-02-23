import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function devEventsApiPlugin() {
  const events = []

  return {
    name: 'finanshels-dev-events-api',
    configureServer(server) {
      server.middlewares.use('/api/events', (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

        if (req.method === 'OPTIONS') {
          res.statusCode = 204
          res.end()
          return
        }

        if (req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ success: true, count: events.length, events }))
          return
        }

        if (req.method !== 'POST') {
          return next()
        }

        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })

        req.on('end', () => {
          let payload = {}

          try {
            payload = body ? JSON.parse(body) : {}
          } catch {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: false, message: 'Invalid JSON payload.' }))
            return
          }

          if (!payload.event_id || !payload.event_name) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: false, message: 'Invalid payload: event_id and event_name are required.' }))
            return
          }

          events.push(payload)
          const source = payload.last_touch_utm_source || payload.first_touch_utm_source || 'unknown'
          const placement = payload.properties?.placement || 'n/a'
          const timestamp = new Date().toISOString()

          console.log(`[dev-api ${timestamp}] ${payload.event_name} | source: ${source} | placement: ${placement}`)

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ success: true, event_id: payload.event_id }))
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), devEventsApiPlugin()],
})
