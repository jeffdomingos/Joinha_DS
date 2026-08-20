import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  const btnData = await page.evaluate(() => {
    const btn = document.querySelector('button');
    if (!btn) return null;
    const computed = window.getComputedStyle(btn);
    return {
      classes: btn.className,
      height: computed.height,
      padding: computed.padding,
      paddingInline: computed.paddingInline,
      varValueH: computed.getPropertyValue('--tc-control-h-md'),
      varValueP: computed.getPropertyValue('--tc-control-px-md'),
    };
  });

  console.log('Button Data:', btnData);
  await browser.close();
})();
