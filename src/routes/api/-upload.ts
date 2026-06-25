import { createAPIFileRoute } from '@tanstack/react-start/api'
import { promises as fs } from 'fs'
import path from 'path'

export const APIRoute = createAPIFileRoute('/api/upload')({
  POST: async ({ request }) => {
    try {
      const formData = await request.formData()
      const file = formData.get('file') as File | null
      if (!file) return new Response('No file provided', { status: 400 })

      const buffer = Buffer.from(await file.arrayBuffer())
      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const filepath = path.join(process.cwd(), 'public', 'uploads', filename)

      await fs.mkdir(path.dirname(filepath), { recursive: true })
      await fs.writeFile(filepath, buffer)

      return new Response(JSON.stringify({ url: `/uploads/${filename}` }), {
        headers: { 'content-type': 'application/json' }
      })
    } catch (e) {
      console.error(e)
      return new Response('Upload failed', { status: 500 })
    }
  }
})
