import express from 'express';
import OpenAI from 'openai';
import sharp from 'sharp';
import quantize from 'quantize';
import dmcColors from '../data/dmc.json'

const router = express.Router();
const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY']
});

const findNearestDMC = (r: number, g: number, b: number) => {
  let nearest = dmcColors[0]!
  let minDistance = Infinity

  for (const color of dmcColors) {
    const distance = Math.sqrt(
      (r - color.r) ** 2 + (g - color.g) ** 2 + (b - color.b) ** 2
    )
    if (distance < minDistance) {
      minDistance = distance
      nearest = color
    }
  }
  return nearest;
 }


router.post('/', async (req, res) => {
  console.log('request received', req.body)
  const { finalPrompt, height, width } = req.body;

  let imageResponse;
  const imageSize = width > height ? '1536x1024' : height > width ? '1024x1536' :        
  '1024x1024';     

  try {
  imageResponse = await client.images.generate({
  model: 'gpt-image-1',
  quality: 'medium',
  prompt: `A graphic illustration of ${finalPrompt}. Bold, solid color fills with subject centred. Use distinct, contrasting colors. For images with people, animals or food, use a cartoon style. Pay special attention to key features for animals and people, including eyes and nose. No decorative borders, no color swatches, no palette strips, no labels, no annotations`,
  n: 1,
  size: imageSize
 });
  } catch (error: any) {
    if (error.status === 400 && error.code === 'content_policy_violation') {
      res.status(400).json({ error: 'content_policy_violation', message: 'Prompt was rejected by content policy.'});
      return;
    }
    res.status(502).json({ error: 'image_generation_failed', message: error.message ?? 'Unknown error'});
    return;
  }

  // gpt-image-1 returns a base64-encoded string representing the image

 const b64 = imageResponse.data?.[0]?.b64_json;
 if (!b64) throw new Error('gpt-image-1 did not return image data');
 console.log('usage', JSON.stringify(imageResponse.usage))

 // the encoded string is converted into a Buffer of raw binary image data
 
 const buffer = Buffer.from(b64, 'base64'); 

 // sharp resizes the images, removes Alpha channel (transparency) and extracts raw binary RGB pixls into a Buffer object
 
 const { data } = await sharp(buffer)
  .resize(width, height, { fit: 'contain',  background: { r: 255, g: 255, b: 255 }, kernel: sharp.kernel.nearest })
  .sharpen({ sigma: 3 })
  .removeAlpha()
  .toColorspace('srgb')
  .raw()
  .toBuffer({ resolveWithObject: true });

  // pixel array is created and the data from the buffer is added in arrays of 3, corresponding to the rgb tuple of each pixel

 const pixels: [number, number, number][] = [];

 for (let i = 0; i < data.length; i += 3) {
  pixels.push([data[i] as number, data[i+1] as number, data[i+2] as number ])
 }

 // loop through the pixel array and snap near-white pixels to pure white before quantization
 for (let i = 0; i < pixels.length; i++) {
  const p = pixels[i]!
  if (p[0] > 225 && p[1] > 225 && p[2] > 225) {
   pixels[i] = [255, 255, 255]
  }
 }

 // quantize reduces pixel array colors (using median cut algo), depending on height/width to create final palette 

 const colorCount = (width < 40 || height < 40) ? 8 : 16;
 const colorMap = quantize(pixels, colorCount);
 if (!colorMap) throw new Error('Quantization failed');
 const palette = colorMap.palette();

 const toHex = (n: number) => Math.min(255, Math.max(0, n)).toString(16).padStart(2, '0')
 
 const symbols = ['★\uFE0E','●\uFE0E','■\uFE0E','◆\uFE0E','✿\uFE0E','❤\uFE0E','✦\uFE0E','▶\uFE0E','✚\uFE0E','☽\uFE0E','☀\uFE0E','♦\uFE0E','✖\uFE0E','⬟\uFE0E','❋\uFE0E','⬡\uFE0E'];

 // map through palette to find the nearest DMC colors for each palette color and assign symbols

 let symbolIndex = 0;
 const patternPalette = palette.map((rgb) => {
  const dmc = findNearestDMC(rgb[0], rgb[1], rgb[2])
  const isWhite = rgb[0] > 225 && rgb[1] > 225 && rgb[2] > 225;
  const symbol = isWhite ? 'X' : (symbols[symbolIndex++] ?? String(symbolIndex));
  return {
   color: isWhite ? '#ffffff' : `#${toHex(rgb[0])}${toHex(rgb[1])}${toHex(rgb[2])}`,
   symbol,
   name: dmc.description,
   dmcNumber: dmc.floss,
  }
 })

 // the flat pixel array is used to create a 2d grid array, with each pixel snapped to the nearest palette color
 // findIndex then searches through the palette array to find the index of the color the pixel is mapped to, and this is saved to the gridRow array, which once the loop is complete, is pushed to the grid array.

 const grid: number[][] = [];

 for (let row = 0; row < height; row++){
  const gridRow: number[] = [];
  for (let col = 0; col < width; col++){
   const pixel = pixels[row * width + col] as [number, number, number];
   const mapped = colorMap.map(pixel);
   const index = palette.findIndex(p => p[0] === mapped[0] && p[1] === mapped[1] && p[2] === mapped[2]);
   gridRow.push(index);
  }
  grid.push(gridRow);
 }

 // remove unused palette entries by finding which are used in the grid, filtering the color indices accordingly and then creating the final palette by returning only the colors from patternPalette that exist in keptIndices
 // when the pixels in the grid are snapped to their nearest neighbour, they don't always mirror the spectrum of colors in the palette, and some palette colors may be skipped if another color is a closer neighbour 
 const usedIndices = new Set(grid.flat())
 const keptIndices = palette.map((_, i) => i).filter(i => usedIndices.has(i))
 const finalPalette = keptIndices.map((oldIndex) => ({
  ...patternPalette[oldIndex],
 }))
 
 // updating each grid cell to point to the new color index (using an object where the old index is key and the new index is value - we then access that new value in finalGrid)
 // otherwise if a removed color was in the middle of the palette array, the palette indexes would shift but the grid cells would still point at the old index and the colors would be wrong 

 const indexRemap: {[key: number]: number} = {}
 keptIndices.forEach((oldIndex, newIndex) => { indexRemap[oldIndex] = newIndex }) // the value is the same as oldIndex, while newIndex is the actual index 

 // rebuilds the grid, replacing each old palette index with new position  
 const finalGrid = grid.map(row => row.map(i => indexRemap[i] ?? 0))

 res.json({
   title: finalPrompt,
   width,
   height,
   palette: finalPalette,
   grid: finalGrid
 });

 console.log('palette length', palette.length)
 console.log('used indices', [...new Set(grid.flat())].sort((a,b) => a - b))

});

export default router;