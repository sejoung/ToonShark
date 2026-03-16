import { test, expect } from './fixtures'

// 커스텀 디바이스 프리셋 추가 후 저장 확인
test('adds a custom device preset', async ({ page }) => {
  await page.getByRole('button', { name: 'Settings' }).click()
  await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible()

  // Device Presets 섹션 열기
  await page.getByText('Device Presets').click()

  // "Add Device" 클릭
  await page.getByRole('button', { name: 'Add Device' }).click()

  // 새 디바이스 행의 이름 입력 — DevicePresetsSection의 input[type="text"]
  // 마지막 디바이스 행의 text input에 이름 입력
  const deviceRows = page.locator('.space-y-3 > div')
  const lastRow = deviceRows.last()
  const nameInput = lastRow.locator('input[type="text"]')
  await nameInput.fill('Test Device')

  // 저장
  await page.getByRole('button', { name: /^Save Settings$|^Save Changes$/ }).click()
  await expect(page.getByText('Saved!')).toBeVisible({ timeout: 3_000 })

  // API를 통해 저장된 디바이스 확인
  const savedDevices = await page.evaluate(() => window.api.getDevicePresets())
  const testDevice = savedDevices.find((d: { name: string }) => d.name === 'Test Device')
  expect(testDevice).toBeTruthy()
})

// 디바이스 프리셋을 기본값으로 리셋
test('resets device presets to defaults', async ({ page }) => {
  // 기본 프리셋 개수 확인
  const defaultPresets = await page.evaluate(() => window.api.getDefaultDevicePresets())
  const defaultCount = defaultPresets.length

  await page.getByRole('button', { name: 'Settings' }).click()
  await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible()

  // Device Presets 섹션 열기
  await page.getByText('Device Presets').click()

  // "Reset Defaults" 클릭
  await page.getByRole('button', { name: 'Reset Defaults' }).click()

  // 저장
  await page.getByRole('button', { name: /^Save Settings$|^Save Changes$/ }).click()
  await expect(page.getByText('Saved!')).toBeVisible({ timeout: 3_000 })

  // 프리셋 개수가 기본값과 동일한지 확인
  const currentPresets = await page.evaluate(() => window.api.getDevicePresets())
  expect(currentPresets.length).toBe(defaultCount)
})

// 설정 변경 후 "Reset All Settings"으로 기본값 복원 확인
test('modifies settings and verifies reset all restores defaults', async ({ page }) => {
  await page.getByRole('button', { name: 'Settings' }).click()
  await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible()

  // Slice Defaults 섹션 열기 후 높이 변경
  await page.getByText('Slice Defaults').click()
  const heightInput = page.locator('input[type="number"]').first()
  await heightInput.fill('999')

  // 변경값 저장
  await page.getByRole('button', { name: /^Save Settings$|^Save Changes$/ }).click()
  await expect(page.getByText('Saved!')).toBeVisible({ timeout: 3_000 })

  // 전체 설정 초기화 (confirm 다이얼로그 수락)
  page.on('dialog', (dialog) => dialog.accept())
  await page.getByRole('button', { name: 'Reset All Settings' }).click()

  // 초기화된 설정 저장
  await page.getByRole('button', { name: /^Save Settings$|^Save Changes$/ }).click()
  await expect(page.getByText('Saved!')).toBeVisible({ timeout: 3_000 })

  // 기본값(1280)으로 복원되었는지 확인
  const settings = await page.evaluate(() => window.api.loadSettings())
  expect(settings.defaultSliceHeight).toBe(1280)
})
