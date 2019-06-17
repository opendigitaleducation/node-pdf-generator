const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fileupload = require("express-fileupload");

const indexRouter = require("./controllers/index");

const port = 3000;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(cookieParser());
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use("/", indexRouter);

app.listen(port, function () {
  console.log('node-pdf-generator listening on port 3000')
});

module.exports = app;
