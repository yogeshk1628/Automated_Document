import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  alias: {
    'date-fns/_lib/format/longFormatters': 'date-fns/esm/_lib/format/longFormatters',
  },
})
