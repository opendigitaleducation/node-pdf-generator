const puppeteer = require("puppeteer");

const printPdf = async (url, c) => {
    const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({ cookie: "oneSessionId=" + c });
    // await page.goto(url, {
    //     waitUntil:['domcontentloaded', 'networkidle0']
    // });
    //await page.waitForNavigation({ waitUntil: 'networkidle0' });
    await page.goto(url);
    await page.waitFor(15000);
    const buffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
            left: '0px',
            top: '0px',
            right: '0px',
            bottom: '0px'
        }
    });
    await browser.close();
    return buffer;
}

module.exports = printPdf;

