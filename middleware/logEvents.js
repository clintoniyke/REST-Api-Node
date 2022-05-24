const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
      // testing
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logItem
    );
  } catch (err) {
    console.error(err);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = { logger, logEvents };

// console.log(format(new Date(), "yyyyMMdd\tHH:mm:ss"));
// console.log("hellooo");
// console.log(uuid());

// const os = require("os");
// const path = require("path");
// const math = require("./math");
// const fsPromises = require("fs").promises;

// const fileOps = async () => {
//   try {
//     const data = await fsPromises.readFile(
//       path.join(__dirname, "files", "starter.txt"),
//       "utf-8"
//     );
//     console.log(data);
//     // await fsPromises.unlink(path.join(__dirname, "files", "starter.txt"));
//     await fsPromises.writeFile(
//       path.join(__dirname, "files", "promiseWrite.txt"),
//       "This is a write file"
//     );
//     await fsPromises.appendFile(
//       path.join(__dirname, "files", "promiseWrite.txt"),
//       "\n\nyes it is a write file"
//     );
//     await fsPromises.rename(
//       path.join(__dirname, "files", "promiseWrite.txt"),
//       path.join(__dirname, "files", "writeRename.txt")
//     );

//     const newData = await fsPromises.readFile(
//       path.join(__dirname, "files", "writeRename.txt"),
//       "utf-8"
//     );
//     console.log(newData);
//   } catch (err) {
//     console.error(err);
//   }
// };

// fileOps();

// fs.readFile(
//   path.join(__dirname, "files", "starter.txt"),
//   "utf-8",
//   (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   }
// );

// fs.writeFile(
//   path.join(__dirname, "files", "write.txt"),
//   "nice to meet you",
//   (err) => {
//     if (err) throw err;
//     console.log("write complete");

//     fs.appendFile(
//       path.join(__dirname, "files", "write.txt"),
//       "\n\nappending a file",
//       (err) => {
//         if (err) throw err;
//         console.log("append complete");

//         fs.rename(
//           path.join(__dirname, "files", "write.txt"),
//           path.join(__dirname, "files", "writeRename.txt"),
//           (err) => {
//             if (err) throw err;
//             console.log("rename complete");
//           }
//         );
//       }
//     );
//   }
// );

// console.log(math.add(3, 6));
