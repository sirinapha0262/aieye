import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// ถ้าคุณใช้ TailwindCSS ให้แน่ใจว่าได้ตั้งค่าผ่าน postcss.config.js หรือไฟล์แยกแล้ว
// tailwindcss plugin ของ vite ยังไม่ใช่ official plugin (ต้องใช้ postcss ตามปกติ)

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  build: {
    outDir: 'dist', // หรือ 'build' ก็ได้ (แล้วแต่ config deploy)
  },
  server: {
    // สำหรับ dev server ถ้าต้องการ
    historyApiFallback: true, // ไม่ได้มีใน vite แต่ netlify ต้องใช้ _redirects
  }
})
