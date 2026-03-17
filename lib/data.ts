import fs from 'fs/promises'
import path from 'path'

import type { SiteSettings } from '@/lib/types'

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'settings.json')

export async function getSettings(): Promise<SiteSettings> {
  const raw = await fs.readFile(DATA_FILE_PATH, 'utf-8')
  return JSON.parse(raw) as SiteSettings
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(settings, null, 2), 'utf-8')
}
