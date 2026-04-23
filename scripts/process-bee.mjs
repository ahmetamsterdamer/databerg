import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const src = resolve(here, 'assets/bee-original.png');
const outDir = resolve(here, '..', 'public');

async function removeWhiteBg(buf) {
  const img = sharp(buf).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.from(data);
  const threshold = 240;
  for (let i = 0; i < out.length; i += channels) {
    const r = out[i], g = out[i + 1], b = out[i + 2];
    if (r >= threshold && g >= threshold && b >= threshold) {
      out[i + 3] = 0;
    } else if (r > 220 && g > 220 && b > 220) {
      const avg = (r + g + b) / 3;
      const softness = (avg - 220) / 20;
      out[i + 3] = Math.round(255 * (1 - softness));
    }
  }
  return sharp(out, { raw: { width, height, channels } }).png();
}

const transparent = await removeWhiteBg(src);
const transparentBuf = await transparent.toBuffer();

await sharp(transparentBuf).resize({ width: 800, withoutEnlargement: true }).png({ compressionLevel: 9 }).toFile(`${outDir}/images/bee.png`);
await sharp(transparentBuf).resize({ width: 512, height: 512, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(`${outDir}/images/bee-square.png`);
await sharp(transparentBuf).resize({ width: 180, height: 180, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(`${outDir}/apple-touch-icon.png`);
await sharp(transparentBuf).resize({ width: 32, height: 32, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(`${outDir}/favicon-32.png`);
await sharp(transparentBuf).resize({ width: 192, height: 192, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(`${outDir}/android-chrome-192.png`);
await sharp(transparentBuf).resize({ width: 512, height: 512, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(`${outDir}/android-chrome-512.png`);

console.log('done');
