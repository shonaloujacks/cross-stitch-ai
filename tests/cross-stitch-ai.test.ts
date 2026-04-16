import { test, expect } from '@playwright/test';

test.describe('generation flow', () => {

  test('submit prompt and get pattern back', async ({ page }) => {

    await page.goto('https://cross-stitch-ai.pages.dev/');

    await page.getByLabel('prompt (max 300 characters)').fill('a cat');

    await page.getByRole('button', { name: 'generate' }).click();

    await expect(page.getByTestId('pattern-grid')).toBeVisible({ timeout: 60000});

  })
  
})



