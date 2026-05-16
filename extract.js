/* eslint-disable @typescript-eslint/no-require-imports */
const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');


const input = path.join(__dirname, 'public', 'lapa-frames', 'animacion-hero.mp4');
const outDir = path.join(__dirname, 'public', 'lapa-frames', 'sequence');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log(`Extracting frames from ${input} to ${outDir}`);

try {
  execSync(`"${ffmpeg}" -y -i "${input}" -vf "fps=30,scale=-1:720" -qscale:v 2 "${path.join(outDir, 'frame_%04d.jpg')}"`, { stdio: 'inherit' });
  console.log('Done.');
} catch (e) {
  console.error('Error extracting frames', e.message);
}
