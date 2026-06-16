// scripts/generate-favicons.mjs
// Generates all favicon and app icon assets from the official ILLIYUN logo.
import sharp from 'sharp'
import { mkdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const SOURCE = resolve(ROOT, 'public/brand/illiyun-logo.png')
const OUT = resolve(ROOT, 'public')

// Ensure output directories exist
if (!existsSync(resolve(OUT, 'icons'))) mkdirSync(resolve(OUT, 'icons'), { recursive: true })

async function generate() {
  console.log('🎨 Generating favicon assets from official ILLIYUN logo...\n')

  // 1) favicon-16x16.png
  await sharp(SOURCE)
    .resize(16, 16, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(resolve(OUT, 'favicon-16x16.png'))
  console.log('  ✓ favicon-16x16.png')

  // 2) favicon-32x32.png
  await sharp(SOURCE)
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(resolve(OUT, 'favicon-32x32.png'))
  console.log('  ✓ favicon-32x32.png')

  // 3) favicon.ico (48x48 PNG — browsers accept PNG favicons)
  await sharp(SOURCE)
    .resize(48, 48, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(resolve(OUT, 'favicon.ico'))
  console.log('  ✓ favicon.ico (48x48)')

  // 4) apple-touch-icon.png (180x180)
  await sharp(SOURCE)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(resolve(OUT, 'apple-touch-icon.png'))
  console.log('  ✓ apple-touch-icon.png (180x180)')

  // 5) PWA icons
  for (const size of [192, 512]) {
    await sharp(SOURCE)
      .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(resolve(OUT, 'icons', `icon-${size}x${size}.png`))
    console.log(`  ✓ icons/icon-${size}x${size}.png`)
  }

  // 6) OG Image (1200x630) — logo centered on white
  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
    .composite([{
      input: await sharp(SOURCE)
        .resize(400, 400, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
        .png()
        .toBuffer(),
      gravity: 'centre'
    }])
    .png()
    .toFile(resolve(OUT, 'og-image.png'))
  console.log('  ✓ og-image.png (1200x630)')

  console.log('\n✅ All favicon and icon assets generated successfully!')
}

generate().catch(err => {
  console.error('Error generating favicons:', err)
  process.exit(1)
})
