import { test, expect } from '@playwright/test';
import { submitPattern } from './helper-functions';

test.describe('generation flow', () => {

  test('submit prompt and get pattern back', async ({ page }) => {

    await submitPattern(page, 'cat');

    await expect(page.getByTestId('pattern-grid')).toBeVisible({ timeout: 60000});

  })

  test('submit a prompt and see loader', async ({ page }) => {

    await submitPattern(page, 'cat');

    await expect(page.getByTestId('loading-spinner')).toBeVisible;

  })
})

test.describe('download', () => {

  test('clicking download triggers a pdf download', async ({ page }) => {
    
    await submitPattern(page, 'cat');

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByTestId('download-button').click()
    ])

    expect(download.suggestedFilename()).toContain('.pdf');

  })
})

test.describe('error handling', () => {

  test('content policy notification shows the notification ', async ({ page }) => {

     await submitPattern(page, 'mickey mouse');

     await expect (page.getByTestId('notification-banner')).toContainText('Your request was rejected by the safety system', {timeout: 60000 })

  })
})



