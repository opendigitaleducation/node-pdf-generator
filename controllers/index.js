const express = require("express");
const router = express.Router();
const generatePdf = require("../helpers/generatePdf");
const printPdf = require("../helpers/printPdf");
const config = require('../conf/config.json');

router.post("/generate/pdf", async (req, res, __) => {
  if (!req.files || !req.files.template || !req.files.template.tempFilePath) {
    res.status(400).end();
    return;
  }
  let result = await generatePdf(req.files.template.tempFilePath, req.body.token, config.auth, req.cookies.oneSessionId);
  let name = req.body.name;
  if (!name) {
    name = "export";
  }
  res.attachment(name + ".pdf");
  res.contentType("application/pdf");
  res.send(result);
});

router.post("/print/pdf", async (req, res, __) => {
  if (!req.body.url) {
    res.status(400).end();
    return;
  }
  let result = await printPdf(req.body.url, req.body.token, config.auth, req.cookies.oneSessionId);
  let name = req.body.name;
  if (!name) {
    name = "export";
  }
  res.attachment(name + ".pdf");
  res.contentType("application/pdf");
  res.send(result);
});

module.exports = router;
