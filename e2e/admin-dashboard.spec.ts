import { test, expect } from '@playwright/test'

test.describe('Admin Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // TODO: Replace with actual admin login flow
    await page.goto('/admin/login')
    await page.fill('input[name="email"]', 'admin@example.com')
    await page.fill('input[name="password"]', 'admin123')
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL('/admin/dashboard')
  })

  test('manages inquiries effectively', async ({ page }) => {
    // Navigate to inquiries page
    await page.click('text=Inquiries')
    await expect(page).toHaveURL('/admin/inquiries')

    // Verify inquiry list
    await expect(page.locator('table')).toBeVisible()
    await expect(page.locator('tr')).toHaveCount.above(1)

    // Test filtering
    await page.selectOption('select[name="status"]', 'new')
    await expect(page.locator('td:has-text("New")')).toBeVisible()

    // Test search
    await page.fill('input[placeholder*="Search"]', 'john')
    await expect(page.locator('tr:has-text("john")')).toBeVisible()

    // Test replying to inquiry
    await page.click('button:has-text("Reply")')
    await page.fill('textarea[name="replyMessage"]', 'Thank you for your interest')
    await page.click('button:has-text("Send Reply")')
    await expect(page.locator('text=Reply sent successfully')).toBeVisible()

    // Test status update
    await page.click('button:has-text("Mark as Responded")')
    await expect(page.locator('td:has-text("Responded")')).toBeVisible()
  })

  test('displays analytics dashboard', async ({ page }) => {
    // Navigate to analytics page
    await page.click('text=Analytics')
    await expect(page).toHaveURL('/admin/analytics')

    // Verify key metrics
    await expect(page.locator('text=Total Page Views')).toBeVisible()
    await expect(page.locator('text=Package Views')).toBeVisible()
    await expect(page.locator('text=Total Inquiries')).toBeVisible()

    // Test time range selection
    await page.click('button:has-text("Last 7 Days")')
    await expect(page.locator('.recharts-wrapper')).toBeVisible()

    // Verify charts and data tables
    await expect(page.locator('text=Top Locations')).toBeVisible()
    await expect(page.locator('text=Inquiry Types')).toBeVisible()
  })

  test('manages packages', async ({ page }) => {
    // Navigate to packages page
    await page.click('text=Packages')
    await expect(page).toHaveURL('/admin/packages')

    // Create new package
    await page.click('text=New Package')
    await page.fill('input[name="title"]', 'Test Safari Package')
    await page.fill('input[name="duration"]', '7 days')
    await page.fill('input[name="location"]', 'Tanzania')
    await page.fill('input[name="startingPrice"]', '5000')
    
    // Use rich text editor
    const descriptionFrame = page.frameLocator('.tiptap').first()
    await descriptionFrame.locator('div[contenteditable="true"]')
      .fill('This is a test safari package description')

    await page.click('button:has-text("Save")')
    await expect(page.locator('text=Package created successfully')).toBeVisible()

    // Edit package
    await page.click('text=Test Safari Package')
    await page.fill('input[name="title"]', 'Updated Safari Package')
    await page.click('button:has-text("Save")')
    await expect(page.locator('text=Package updated successfully')).toBeVisible()

    // Delete package
    await page.click('button:has-text("Delete")')
    await page.click('button:has-text("Confirm")')
    await expect(page.locator('text=Package deleted successfully')).toBeVisible()
  })

  test('handles image uploads', async ({ page }) => {
    // Navigate to media page
    await page.click('text=Media')
    await expect(page).toHaveURL('/admin/media')

    // Upload image
    const fileInput = page.locator('input[type="file"]')
    await fileInput.setInputFiles({
      name: 'test-image.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('fake-image-content'),
    })

    // Verify upload success
    await expect(page.locator('text=Upload successful')).toBeVisible()

    // Test image categorization
    await page.click('text=Accommodations')
    await expect(page.locator('.image-grid')).toBeVisible()

    // Delete image
    await page.click('.image-card >> nth=0')
    await page.click('button:has-text("Delete")')
    await page.click('button:has-text("Confirm")')
    await expect(page.locator('text=Image deleted successfully')).toBeVisible()
  })
}) 