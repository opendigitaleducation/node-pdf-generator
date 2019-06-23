const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fileupload = require("express-fileupload");
const morgan = require('morgan');
const fs = require("fs");
const path = require("path");
const indexRouter = require("./controllers/index");

const port = 3000;

const app = express();
app.set('trust proxy', true);

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs', 'access.log'),
  { flags: 'a' }
);
morgan.format('customformat', ':remote-addr - :remote-user [:date[clf]] ":method :url" :status :res[content-length] - :response-time ms');
app.use(morgan('customformat', { stream: accessLogStream }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
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
