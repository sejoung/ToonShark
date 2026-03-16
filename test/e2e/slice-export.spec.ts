import { fixturePdfPath, mockNextOpenDialogPath, test, expect } from './fixtures'

test('opens a generated PDF, runs slice, and exports results', async ({ electronApp, page, testBaseDir }) => {
  const pdfPath = fixturePdfPath('auto-slice-3panels.pdf')

  await page.evaluate(async (baseDir) => {
    const current = await window.api.loadSettings()
    await window.api.saveSettings({
      ...current,
      baseDir
    })
  }, testBaseDir)

  await mockNextOpenDialogPath(electronApp, pdfPath)
  await page.getByRole('button', { name: 'Open PDF' }).click()

  await expect(page).toHaveURL(/\/workspace$/)
  await expect(page.getByRole('button', { name: 'Run' })).toBeVisible()

  await page.getByRole('button', { name: 'Run' }).click()

  await expect(page.getByRole('button', { name: 'Detail' })).toBeVisible({ timeout: 20_000 })
  await expect(page.getByRole('button', { name: 'Episode Export' })).toBeVisible()

  await page.getByRole('button', { name: 'Episode Export' }).click()

  await expect(page).toHaveURL(/\/job\/.+\/export$/)
  await expect(page.getByRole('heading', { name: 'Episode Export' })).toBeVisible()

  const platformCheckbox = page.locator('tbody input[type="checkbox"]:not([disabled])').first()
  await platformCheckbox.check()
  await page.getByRole('button', { name: 'Run Export' }).click()

  await expect(page.getByRole('button', { name: 'Open Export Folder' })).toBeVisible()
})
