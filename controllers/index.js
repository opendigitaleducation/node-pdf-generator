const express = require("express");
const router = express.Router();
const generatePdf = require("../helpers/generatePdf");
const printPdf = require("../helpers/printPdf");


router.post("/generate/pdf", async (req, res, __) => {
  let result = await generatePdf(req.files.template.tempFilePath, req.cookies.oneSessionId);
  let name = req.body.name;
  res.attachment(name + ".pdf");
  res.contentType("application/pdf");
  res.send(result);
});

router.post("/print/pdf", async (req, res, __) => {
  console.log(req.body);
  let result = await printPdf(req.body.url, req.cookies.oneSessionId);
  let name = req.body.name;
  res.attachment(name + ".pdf");
  res.contentType("application/pdf");
  res.send(result);
});


module.exports = router;
