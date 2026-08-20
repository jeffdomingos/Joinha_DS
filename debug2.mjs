import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  const btnData = await page.evaluate(() => {
    const btn = document.querySelector('button');
    if (!btn) return null;
    
    // Get all matched CSS rules
    const rules = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule instanceof CSSStyleRule && btn.matches(rule.selectorText)) {
            rules.push({ selector: rule.selectorText, cssText: rule.cssText });
          }
        }
      } catch(e) {}
    }
    
    return rules;
  });

  console.log('Button Rules:');
  btnData.forEach(r => console.log(r.cssText));
  await browser.close();
})();
