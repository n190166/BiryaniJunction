const fs = require('fs');
const { createCanvas } = require('canvas');

function generateLogo(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#f97316';
    ctx.fillRect(0, 0, size, size);

    // Text
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${size/4}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('BJ', size/2, size/2);

    return canvas.toBuffer('image/png');
}

// Generate logos
const sizes = [192, 512];
sizes.forEach(size => {
    const buffer = generateLogo(size);
    fs.writeFileSync(`./public/logo${size}.png`, buffer);
});
