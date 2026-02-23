import cors from 'cors'
import express from 'express'

const app = express()
const PORT = process.env.PORT || 3001
const events = []

app.use(cors())
app.use(express.json({ limit: '1mb' }))

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.post('/api/events', (req, res) => {
  const payload = req.body || {}

  if (!payload.event_id || !payload.event_name) {
    return res.status(400).json({ success: false, message: 'Invalid payload: event_id and event_name are required.' })
  }

  events.push(payload)

  const source = payload.last_touch_utm_source || payload.first_touch_utm_source || 'unknown'
  const placement = payload.properties?.placement || 'n/a'
  const timestamp = new Date().toISOString()

  console.log(`[${timestamp}] ${payload.event_name} | source: ${source} | placement: ${placement}`)

  return res.status(200).json({ success: true, event_id: payload.event_id })
})

app.get('/api/events', (_req, res) => {
  return res.status(200).json({ success: true, count: events.length, events })
})

app.listen(PORT, () => {
  console.log(`Mock events API running on http://localhost:${PORT}`)
})
