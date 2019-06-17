const express = require("express");
const router = express.Router();
const generatePdf = require("../helpers/generatePdf");

router.post("/generate/pdf", async (req, res, __) => {
  let result = await generatePdf(req.files.template.tempFilePath, req.cookies.oneSessionId);
  let name = req.body.name;
  res.attachment(name + ".pdf");
  res.contentType("application/pdf");
  res.send(result);
});

module.exports = router;
