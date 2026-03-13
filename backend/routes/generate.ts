import express from 'express';
import Anthropic from '@anthropic-ai/sdk';


const router = express.Router();
const client = new Anthropic({
  apiKey: process.env['ANTHROPIC_API_KEY']
});

router.post('/', async (req, res) => {

  const { prompt, height, width } = req.body

  const message = await client.messages.create({
    max_tokens: 8192,
    model: 'claude-sonnet-4-6',
    system: 'Always respond with JSON in this exact structure: {title, width, height, palette, grid}. Never include markdown. The grid should be a 2D array of palette indices where -1 means empty and each number refers to a palette index. Each palette object should have the fields: "color", "symbol" and "name". The "color" field should use hex format ie. #f5c618. The palette should have no more than 10 colors. The title should be a short description based on the user`s prompt.',
    messages: [{ role: 'user', content: `Create a cross stich pattern of ${prompt}. The grid should be ${width}x${height}.`}]
  });

  const contentBlock = message.content[0]
  if (!contentBlock || contentBlock.type !== 'text'){
    res.status(500).json({error: 'Unexpected response from Claude'});
    return; 
  }
  const parsedPattern = JSON.parse(contentBlock.text)
  res.json(parsedPattern)

});

export default router;