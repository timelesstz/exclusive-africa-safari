import { test, expect } from '@playwright/test'

test.describe('SEO Tests', () => {
  test('homepage has proper meta tags', async ({ page }) => {
    await page.goto('/')

    // Check title and description
    await expect(page).toHaveTitle(/Safari Adventures/)
    const description = await page.locator('meta[name="description"]').getAttribute('content')
    expect(description).toBeTruthy()
    expect(description?.length).toBeGreaterThan(50)

    // Check Open Graph tags
    await expect(page.locator('meta[property="og:title"]')).toBeAttached()
    await expect(page.locator('meta[property="og:description"]')).toBeAttached()
    await expect(page.locator('meta[property="og:image"]')).toBeAttached()
    await expect(page.locator('meta[property="og:url"]')).toBeAttached()

    // Check Twitter Card tags
    await expect(page.locator('meta[name="twitter:card"]')).toBeAttached()
    await expect(page.locator('meta[name="twitter:title"]')).toBeAttached()
  })

  test('package pages have proper schema markup', async ({ page }) => {
    await page.goto('/packages/serengeti-migration')

    // Check for TourPackage schema
    const schema = await page.locator('script[type="application/ld+json"]').textContent()
    const schemaData = JSON.parse(schema || '{}')
    
    expect(schemaData['@type']).toBe('TourPackage')
    expect(schemaData.name).toBeTruthy()
    expect(schemaData.description).toBeTruthy()
    expect(schemaData.price).toBeTruthy()
    expect(schemaData.duration).toBeTruthy()
  })

  test('canonical URLs are properly set', async ({ page }) => {
    const paths = ['/', '/packages', '/packages/serengeti-migration']
    
    for (const path of paths) {
      await page.goto(path)
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
      expect(canonical).toContain(path)
    }
  })

  test('robots meta tags are properly set', async ({ page }) => {
    // Public pages should be indexable
    await page.goto('/packages')
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index/)

    // Admin pages should not be indexable
    await page.goto('/admin/login')
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
  })

  test('sitemap is accessible and valid', async ({ page }) => {
    const response = await page.goto('/sitemap.xml')
    expect(response?.status()).toBe(200)
    
    const content = await page.content()
    expect(content).toContain('<?xml')
    expect(content).toContain('<urlset')
    expect(content).toContain('<url>')
    expect(content).toContain('<loc>')
  })

  test('dynamic meta tags update correctly', async ({ page }) => {
    await page.goto('/packages')

    // Search for a specific package
    await page.fill('input[placeholder*="Search"]', 'Serengeti')
    
    // Meta title should update to reflect search
    await expect(page).toHaveTitle(/Serengeti/)
    
    // Clear search and filter by location
    await page.fill('input[placeholder*="Search"]', '')
    await page.selectOption('select[name="location"]', 'Tanzania')
    
    // Meta title should update to reflect filter
    await expect(page).toHaveTitle(/Tanzania/)
  })
}) 