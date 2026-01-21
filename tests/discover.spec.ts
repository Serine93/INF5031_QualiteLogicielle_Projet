import { test } from '@playwright/test';

test('Discover uncompagnon.fr API endpoints', async ({ page }) => {
  const apiCalls: Array<{ method: string; url: string; status?: number }> = [];

  // Capture all network requests
  page.on('request', request => {
    const url = request.url();
    // Log API-like requests (containing api, graphql, or making fetch/xhr calls)
    if (
      url.includes('/api/') || 
      url.includes('/graphql') || 
      url.includes('/wp-json/') ||
      url.includes('/ajax/') ||
      request.resourceType() === 'xhr' ||
      request.resourceType() === 'fetch'
    ) {
      console.log('→ REQUEST:', request.method(), url);
      apiCalls.push({ method: request.method(), url });
    }
  });

  page.on('response', async response => {
    const url = response.url();
    if (
      url.includes('/api/') || 
      url.includes('/graphql') || 
      url.includes('/wp-json/') ||
      url.includes('/ajax/')
    ) {
      console.log('← RESPONSE:', response.status(), url);
      
      // Try to log response body for API calls
      try {
        const contentType = response.headers()['content-type'] || '';
        if (contentType.includes('application/json')) {
          const body = await response.text();
          console.log('  BODY:', body.substring(0, 200) + '...');
        }
      } catch (e) {
        // Some responses can't be read
      }
    }
  });

  console.log('\n=== NAVIGATING TO SITE ===\n');
  await page.goto('https://www.uncompagnon.fr/', { waitUntil: 'networkidle' });

  // Handle cookie banner
  try {
    const cookieButton = page.locator('.sd-cmp-mRjLD.sd-cmp-GgdFU.sd-cmp-Jou6v').first();
    if (await cookieButton.isVisible({ timeout: 3000 })) {
      await cookieButton.click();
      console.log('✓ Cookie banner accepted');
    }
  } catch (e) {
    console.log('✗ No cookie banner');
  }

  await page.waitForTimeout(2000);

  console.log('\n=== LOOKING FOR SEARCH FUNCTIONALITY ===\n');

  // Try to find and use search
  const searchSelectors = [
    'input[type="search"]',
    'input[placeholder*="recherch" i]',
    'input[name*="search" i]',
    'input[id*="search" i]',
    '.search-input',
    '#search',
    '[data-testid*="search"]'
  ];

  let searchFound = false;
  for (const selector of searchSelectors) {
    try {
      const searchInput = page.locator(selector).first();
      if (await searchInput.isVisible({ timeout: 1000 })) {
        console.log(`✓ Found search input: ${selector}`);
        await searchInput.fill('chien');
        await page.waitForTimeout(500);
        
        // Try to submit
        await searchInput.press('Enter');
        searchFound = true;
        console.log('✓ Search submitted');
        break;
      }
    } catch (e) {
      // Continue to next selector
    }
  }

  if (!searchFound) {
    console.log('✗ No search input found, trying to find search results page');
    
    // Try to find a link to search/browse animals
    const links = await page.locator('a').all();
    for (const link of links.slice(0, 20)) { // Check first 20 links
      const text = await link.textContent();
      const href = await link.getAttribute('href');
      if (text && (
        text.toLowerCase().includes('recherch') ||
        text.toLowerCase().includes('animal') ||
        text.toLowerCase().includes('trouv') ||
        text.toLowerCase().includes('perdu')
      )) {
        console.log(`Found potential link: "${text}" → ${href}`);
      }
    }
  }

  await page.waitForTimeout(3000);

  console.log('\n=== API CALLS SUMMARY ===');
  console.log(`Total API-like requests: ${apiCalls.length}`);
  apiCalls.forEach(call => {
    console.log(`  ${call.method} ${call.url}`);
  });

  console.log('\n=== CURRENT PAGE INFO ===');
  console.log('URL:', page.url());
  console.log('Title:', await page.title());

  // Keep browser open to inspect
  await page.waitForTimeout(5000);
});