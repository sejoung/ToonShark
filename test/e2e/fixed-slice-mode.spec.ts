import { fixturePdfPath, mockNextOpenDialogPath, test, expect } from './fixtures'

// Fixed 모드 슬라이스 실행 — 커스텀 높이 지정
test('runs a fixed mode slice job with custom height', async ({ electronApp, page, testBaseDir }) => {
  const pdfPath = fixturePdfPath('simple-2page.pdf')

  await page.evaluate(async (baseDir) => {
    const current = await window.api.loadSettings()
    await window.api.saveSettings({ ...current, baseDir })
  }, testBaseDir)

  await mockNextOpenDialogPath(electronApp, pdfPath)
  await page.getByRole('button', { name: 'Open PDF' }).click()
  await expect(page).toHaveURL(/\/workspace$/)

  // Fixed 모드로 전환
  await page.getByRole('button', { name: 'Fixed' }).click()

  // OptionField는 label과 input이 for/id로 연결되지 않으므로
  // 라벨 텍스트를 포함하는 부모 요소 내의 input을 찾는다
  const heightInput = page.locator('label:has-text("Slice Height")').locator('../..').locator('input[type="number"]')
  await heightInput.fill('500')

  // 작업 실행
  await page.getByRole('button', { name: 'Run' }).click()

  // 완료 대기
  await expect(page.getByRole('button', { name: 'Detail' }).first()).toBeVisible({ timeout: 20_000 })

  // 상세 페이지에서 Fixed 모드 확인
  await page.getByRole('button', { name: 'Detail' }).first().click()
  await expect(page).toHaveURL(/\/job\//)
  await expect(page.getByText('Fixed interval')).toBeVisible()
})

// Fixed 모드 슬라이스 — 시작 오프셋 지정
test('runs a fixed mode slice with start offset', async ({ electronApp, page, testBaseDir }) => {
  const pdfPath = fixturePdfPath('simple-2page.pdf')

  await page.evaluate(async (baseDir) => {
    const current = await window.api.loadSettings()
    await window.api.saveSettings({ ...current, baseDir })
  }, testBaseDir)

  await mockNextOpenDialogPath(electronApp, pdfPath)
  await page.getByRole('button', { name: 'Open PDF' }).click()
  await expect(page).toHaveURL(/\/workspace$/)

  // Fixed 모드로 전환
  await page.getByRole('button', { name: 'Fixed' }).click()

  // 슬라이스 높이와 시작 오프셋 설정
  const heightInput = page.locator('label:has-text("Slice Height")').locator('../..').locator('input[type="number"]')
  await heightInput.fill('500')

  const offsetInput = page.locator('label:has-text("Start Offset")').locator('../..').locator('input[type="number"]')
  await offsetInput.fill('100')

  // 작업 실행
  await page.getByRole('button', { name: 'Run' }).click()

  // 완료 대기
  await expect(page.getByRole('button', { name: 'Detail' }).first()).toBeVisible({ timeout: 20_000 })
})

// Auto 모드 슬라이스 — 다른 PDF 사용
test('runs auto slice with different PDF', async ({ electronApp, page, testBaseDir }) => {
  const pdfPath = fixturePdfPath('simple-2page.pdf')

  await page.evaluate(async (baseDir) => {
    const current = await window.api.loadSettings()
    await window.api.saveSettings({ ...current, baseDir })
  }, testBaseDir)

  await mockNextOpenDialogPath(electronApp, pdfPath)
  await page.getByRole('button', { name: 'Open PDF' }).click()
  await expect(page).toHaveURL(/\/workspace$/)

  // Auto 모드가 기본값이므로 바로 실행
  await page.getByRole('button', { name: 'Run' }).click()

  // 완료 대기
  await expect(page.getByRole('button', { name: 'Detail' }).first()).toBeVisible({ timeout: 20_000 })

  // 상세 페이지에서 Auto 모드 확인
  await page.getByRole('button', { name: 'Detail' }).first().click()
  await expect(page).toHaveURL(/\/job\//)
  await expect(page.getByText('Auto').first()).toBeVisible()
})
