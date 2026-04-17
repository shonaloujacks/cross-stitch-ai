import { test, expect } from '@playwright/test';
import { submitPattern } from './helper-functions';
  
  test('rate limit error shows the notification banner', async ({ page }) => {

    for (let i = 0; i < 3; i++){
      await submitPattern(page, 'cat');
      await expect(page.getByTestId('pattern-grid')).toBeVisible({ timeout: 60000});
    }

    await submitPattern(page, 'cat');
    await expect (page.getByTestId('notification-banner')).toContainText('Too many requests, please try again later.',  {timeout: 60000 })

  })