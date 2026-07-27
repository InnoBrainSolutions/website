import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  
  // Slowly scroll down the page to trigger all animations
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  const step = 400;
  for (let y = 0; y < totalHeight; y += step) {
    await page.evaluate((scrollPos) => window.scrollTo(0, scrollPos), y);
    await page.waitForTimeout(150);
  }
  
  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);
  
  // Full page screenshot
  await page.screenshot({
    path: './full-page-screenshot.png',
    fullPage: true,
  });
  
  console.log('✅ Full page screenshot saved to: ./full-page-screenshot.png');
  
  await browser.close();
})();
