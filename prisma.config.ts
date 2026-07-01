import 'dotenv/config'
import { defineConfig } from 'prisma/config'

import { normalizePgConnectionString } from './src/lib/pg-connection-string'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: "tsx scripts/seed-system-voices.ts",
  },
  datasource: {
    url: process.env["DATABASE_URL"]
      ? normalizePgConnectionString(process.env["DATABASE_URL"])
      : undefined,
  },
})
        