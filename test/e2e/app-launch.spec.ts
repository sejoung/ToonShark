import { test, expect } from './fixtures'

test('launches the app to the home screen', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'ToonShark' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Open PDF' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Settings' })).toBeVisible()
})

test('opens the settings screen from home', async ({ page }) => {
  await page.getByRole('button', { name: 'Settings' }).click()

  await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Save Settings' })).toBeVisible()
})
