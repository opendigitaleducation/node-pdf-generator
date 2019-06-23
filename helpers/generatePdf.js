const puppeteer = require("puppeteer");
const fs = require("fs");

const generatePdf = async (template, token, basic, cookie) => {
    const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });
    const page = await browser.newPage();
    if (token && basic) {
        await page.setExtraHTTPHeaders({ Authorization: "Basic " + basic + ", Bearer " + token });
    } else if (cookie) {
        await page.setExtraHTTPHeaders({ cookie: "oneSessionId=" + cookie });
    }
    const content = fs.readFileSync(template, 'utf-8');
    await page.setContent(content);
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

module.exports = generatePdf;

