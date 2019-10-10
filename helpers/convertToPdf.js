const exec = require('child_process').exec;
const fs = require('fs');
const os = require('os');
const path = require("path");
const util = require("util");
const tempPath = os.tmpdir();
const readFile = util.promisify(fs.readFile);

const waitChild = (childProc) => {
    return new Promise((resolve, reject) => {
        childProc.on("exit", resolve)
        childProc.on("error", reject);
    })
}
const convertToPdf = async (filePath, kind) => {
    switch (kind) {
        case 'document':
            childProc = exec("soffice --headless --convert-to pdf:writer_pdf_Export --outdir " + tempPath + " " + filePath);
            break;
        case 'spreadsheet':
            childProc = exec("soffice --headless --convert-to pdf:calc_pdf_Export --outdir " + tempPath + " " + filePath);
            break;
        case 'csv':
            //https://wiki.openoffice.org/wiki/Documentation/DevGuide/Spreadsheets/Filter_Options#Filter_Options_for_the_CSV_Filter
            //44 is comma separator
            //second argument for double quote
            //76 for utf8
            childProc = exec("soffice --headless --convert-to csv:\"Text - txt - csv (StarCalc)\":44,,76 --outdir " + tempPath + " " + filePath);
            break;
        case 'presentation':
            childProc = exec("soffice --headless --convert-to pdf:impress_pdf_Export --outdir " + tempPath + " " + filePath);
            break;
        default:
            throw "Unknown kind: " + kind;
    }
    childProc.stdout.pipe(process.stdout);
    childProc.stderr.pipe(process.stderr);
    await waitChild(childProc);
    const fullname = path.parse(filePath).name;
    const output = (kind == "csv") ? fullname + ".csv" : fullname + ".pdf";
    const outputPath = path.join(tempPath, output);
    const result = await readFile(outputPath);
    return result;
}

module.exports = convertToPdf;

