import { test, expect } from '@playwright/test'

test.describe('Package Listing and Inquiry Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('allows users to view packages and submit inquiries', async ({ page }) => {
    // Navigate to packages page
    await page.click('text=View Packages')
    await expect(page).toHaveURL('/packages')

    // Verify package listing elements
    await expect(page.locator('h1')).toContainText('Safari Packages')
    await expect(page.locator('.package-card')).toHaveCount(3)

    // Test search functionality
    const searchInput = page.locator('input[placeholder*="Search"]')
    await searchInput.fill('Serengeti')
    await expect(page.locator('.package-card')).toHaveCount(1)
    await expect(page.locator('.package-card')).toContainText('Serengeti')

    // Clear search and test filtering
    await searchInput.clear()
    await page.selectOption('select[name="location"]', 'Kenya')
    await expect(page.locator('.package-card')).toContainText('Masai Mara')

    // Click on a package to view details
    await page.click('text=Masai Mara Adventure')
    await expect(page).toHaveURL(/\/packages\/masai-mara-adventure/)

    // Verify package details
    await expect(page.locator('h1')).toContainText('Masai Mara Adventure')
    await expect(page.locator('text=Duration')).toBeVisible()
    await expect(page.locator('text=Starting Price')).toBeVisible()

    // Open inquiry form
    await page.click('text=Inquire Now')
    await expect(page.locator('dialog[role="dialog"]')).toBeVisible()

    // Fill out inquiry form
    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="phone"]', '+1234567890')
    await page.fill('input[name="travelDates"]', '2024-08-15')
    await page.fill('input[name="groupSize"]', '4')
    await page.fill('textarea[name="message"]', 'This is a test inquiry')

    // Submit form
    await page.click('button[type="submit"]')

    // Verify success message
    await expect(page.locator('text=Thank you for your inquiry')).toBeVisible()
  })

  test('validates inquiry form fields', async ({ page }) => {
    // Navigate to a package detail page
    await page.goto('/packages/serengeti-migration')
    await page.click('text=Inquire Now')

    // Submit empty form
    await page.click('button[type="submit"]')

    // Verify validation messages
    await expect(page.locator('text=Name is required')).toBeVisible()
    await expect(page.locator('text=Email is required')).toBeVisible()
    await expect(page.locator('text=Travel dates are required')).toBeVisible()

    // Fill one field and verify other validations persist
    await page.fill('input[name="name"]', 'Test User')
    await page.click('button[type="submit"]')
    await expect(page.locator('text=Email is required')).toBeVisible()
  })

  test('handles mobile responsive layout', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 })

    // Navigate to packages page
    await page.goto('/packages')

    // Verify mobile menu behavior
    await expect(page.locator('button.mobile-menu-button')).toBeVisible()
    await page.click('button.mobile-menu-button')
    await expect(page.locator('nav.mobile-menu')).toBeVisible()

    // Verify package cards stack vertically
    const cards = page.locator('.package-card')
    for (let i = 0; i < await cards.count(); i++) {
      const card = cards.nth(i)
      const box = await card.boundingBox()
      expect(box?.width).toBeLessThan(375)
    }

    // Test inquiry form on mobile
    await page.click('text=Masai Mara Adventure')
    await page.click('text=Inquire Now')
    await expect(page.locator('dialog[role="dialog"]')).toBeVisible()
    
    // Verify form is properly sized for mobile
    const form = page.locator('form')
    const formBox = await form.boundingBox()
    expect(formBox?.width).toBeLessThan(375)
  })
}) 