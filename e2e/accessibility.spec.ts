import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility Tests', () => {
  test('homepage meets accessibility standards', async ({ page }) => {
    await page.goto('/')
    const results = await new AxeBuilder({ page }).analyze()
    expect(results.violations).toHaveLength(0)
  })

  test('keyboard navigation works correctly', async ({ page }) => {
    await page.goto('/')

    // Test main navigation
    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toHaveText(/home/i)
    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toHaveText(/packages/i)

    // Navigate to packages page using keyboard
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL('/packages')

    // Test package card focus
    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toHaveClass(/package-card/)

    // Open package details using keyboard
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/packages\//)

    // Test inquiry form keyboard interaction
    await page.keyboard.press('Tab')
    await page.keyboard.press('Enter') // Open inquiry form
    await expect(page.locator('dialog[role="dialog"]')).toBeVisible()

    // Navigate through form fields
    const formFields = ['name', 'email', 'phone', 'travelDates', 'groupSize', 'message']
    for (const field of formFields) {
      await page.keyboard.press('Tab')
      await expect(page.locator(`[name="${field}"]`)).toBeFocused()
    }
  })

  test('screen reader content is properly structured', async ({ page }) => {
    await page.goto('/packages')

    // Verify proper heading hierarchy
    const headings = await page.evaluate(() => {
      const levels = []
      document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => 
        levels.push(parseInt(h.tagName[1]))
      )
      return levels
    })
    
    // Ensure heading levels don't skip (e.g., h1 to h3)
    for (let i = 1; i < headings.length; i++) {
      expect(headings[i] - headings[i-1]).toBeLessThanOrEqual(1)
    }

    // Check for proper ARIA labels
    await expect(page.locator('[aria-label="Search packages"]')).toBeVisible()
    await expect(page.locator('[aria-label="Filter by location"]')).toBeVisible()
    await expect(page.locator('[role="navigation"]')).toBeVisible()
  })

  test('color contrast meets WCAG standards', async ({ page }) => {
    await page.goto('/')
    const results = await new AxeBuilder({ page })
      .withRules(['color-contrast'])
      .analyze()
    expect(results.violations).toHaveLength(0)
  })

  test('images have proper alt text', async ({ page }) => {
    await page.goto('/packages')
    
    // Check all images have alt text
    const images = await page.locator('img').all()
    for (const image of images) {
      const alt = await image.getAttribute('alt')
      expect(alt).toBeTruthy()
      expect(alt).not.toBe('')
    }
  })
}) 