const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        permissions: ['clipboard-read', 'clipboard-write'],
        recordVideo: {
            dir: './'
        }
    });

    const page = await context.newPage();
    await page.goto('http://127.0.0.1:3000');

    // Start a fast MBTI Yes/No test
    await page.evaluate("startTest('mbti-yesno')");

    // Loop through the 20 questions
    for (let i = 0; i < 20; i++) {
        await page.evaluate("selectAnswer(0)");
        await page.waitForTimeout(50); // slight pause to allow state to update
    }

    // Wait for the result screen to show
    await page.waitForSelector('#result-screen.active');

    // Mock clipboard and navigator.share safely
    await page.evaluate(() => {
        navigator.share = undefined;
        // The safest way to mock clipboard in older/stricter environments is overriding the property
        Object.defineProperty(navigator, 'clipboard', {
            value: { writeText: () => Promise.resolve() },
            configurable: true
        });
    });

    // Take screenshot BEFORE clicking share
    await page.screenshot({ path: 'before_share.png' });

    // Click the share text button
    await page.locator('button.action-btn.secondary:has-text("텍스트 공유")').click();

    // Small delay to let the inline text change
    await page.waitForTimeout(100);

    // Take screenshot AFTER clicking share
    await page.screenshot({ path: 'after_share.png' });

    // Wait for the restore timeout (2 seconds)
    await page.waitForTimeout(2100);

    // Take screenshot AFTER restore
    await page.screenshot({ path: 'after_restore.png' });

    await browser.close();
})();
