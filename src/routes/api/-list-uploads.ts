// @ts-ignore - TanStack Start's package.json is missing the type declaration for /api but it works at runtime
import { createAPIFileRoute } from '@tanstack/react-start/api'
import { promises as fs } from 'fs'
import path from 'path'

const AUDIO_EXTENSIONS = new Set(['.mp3', '.ogg', '.wav', '.flac', '.aac', '.m4a', '.opus', '.weba'])

export const APIRoute = createAPIFileRoute('/api/list-uploads')({
  GET: async () => {
    try {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads')

      let files: string[] = []
      try {
        files = await fs.readdir(uploadsDir)
      } catch {
        // Directory doesn't exist yet
        return new Response(JSON.stringify([]), {
          headers: { 'content-type': 'application/json' },
        })
      }

      const audioFiles = files
        .filter((f) => AUDIO_EXTENSIONS.has(path.extname(f).toLowerCase()))
        .map((filename) => ({
          filename,
          url: `/uploads/${filename}`,
          // Strip timestamp prefix and extension for display name
          label: filename
            .replace(/^\d+-/, '')
            .replace(/\.[^.]+$/, '')
            .replace(/_/g, ' '),
        }))
        .sort((a, b) => a.label.localeCompare(b.label))

      return new Response(JSON.stringify(audioFiles), {
        headers: { 'content-type': 'application/json' },
      })
    } catch (e) {
      console.error(e)
      return new Response('Failed to list uploads', { status: 500 })
    }
  },
})
